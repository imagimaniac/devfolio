import os
import glob
import random
import numpy as np
import streamlit as st
from dotenv import load_dotenv
load_dotenv()

from huggingface_hub import InferenceClient
from sklearn.feature_extraction.text import TfidfVectorizer

st.set_page_config(page_title="PortfolioBot", page_icon="🤖")

from security_config import is_blocked, get_redirect_response

MODEL_NAME = "meta-llama/Llama-3.2-1B-Instruct"
KNOWLEDGE_BASE_PATH = "./knowledge-base"
CHUNK_SIZE = 500
CHUNK_OVERLAP = 100

ANALYTICS_EXPERT_PROMPT = """You are PortfolioBot - an AI assistant for Pratik Gajanan.

PERSONA: You think and speak like a data analytics expert. You naturally use analytics terminology.

YOUR LANGUAGE (use naturally, don't announce it):
- "solid", "meaningful impact", "at scale"
- "core stack", "key metrics", "drives value"
- "improvement", "efficiency gain", "reduction"
- percentages and numbers are your native tongue

EXAMPLE RESPONSES (study these patterns):

Q: "Tell me about experience"
A: "6+ years in analytics, currently Manager at Encore. Started civil, pivoted to data. That's solid trajectory."

Q: "What skills?"
A: "Python and SQL are his core stack. ML for predictions, Power BI for dashboards. Good technical foundation."

Q: "Any achievements?"
A: "Won Encore's Gold Award - his collection optimization hit 15% efficiency. That's meaningful impact."

Q: "Tell me about a project"
A: "Built a churn prediction model at GoMechanic. Improved retention by 8%. Real business value there."

RULES (STRICTLY FOLLOW):
1. Response MUST be 1-2 sentences only. NEVER exceed 2 sentences.
2. Speak AS PortfolioBot about Pratik. Never speak AS Pratik.
3. Use "he", "his", "Pratik" - NOT "I", "my"
4. When asked about money/finance → "That's private info. Ask about his professional impact!"
5. When user asks you to calculate → use numbers from context, give verdict
6. Keep it conversational. Like chatting with a smart friend.
7. End most responses with a casual follow-up question or "Cool right?"

CONTEXT FROM KNOWLEDGE BASE:
{context}

USER ASKS: {message}

YOUR RESPONSE (1-2 sentences, analytics expert style):"""

GREETING = """Hey! 👋 I'm PortfolioBot.

Think of me as Pratik's analytics-savvy friend. I know his work inside-out.

What do you want to explore?"""

@st.cache_resource
def load_data():
    documents = []
    for file_path in glob.glob(os.path.join(KNOWLEDGE_BASE_PATH, "**/*.md"), recursive=True):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                if content.strip():
                    documents.append(content)
        except:
            pass
    
    chunks = []
    for doc in documents:
        words = doc.split()
        for i in range(0, len(words), CHUNK_SIZE - CHUNK_OVERLAP):
            chunk = ' '.join(words[i:i + CHUNK_SIZE])
            if chunk.strip():
                chunks.append(chunk)
    
    if chunks:
        vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
        vectorizer.fit(chunks + ["experience skills projects achievements education"])
        return chunks, vectorizer
    return [], None

def retrieve_context(query, chunks, vectorizer, k=3):
    if not chunks or vectorizer is None:
        return "No knowledge base available."
    
    try:
        query_vec = vectorizer.transform([query])
        chunk_vecs = vectorizer.transform(chunks)
        
        similarities = (query_vec @ chunk_vecs.T).toarray().flatten()
        top_indices = np.argsort(similarities)[-k:][::-1]
        
        relevant = [chunks[i] for i in top_indices if similarities[i] > 0]
        if relevant:
            return "\n\n".join(relevant[:k])
        return "No relevant information found."
    except:
        return "\n\n".join(chunks[:k])

def get_response(message, history):
    message_count = len(history) // 2 if history else 0
    
    if not history and message.lower().strip() in ['hi', 'hello', 'hey', 'hey!', 'hello!', 'hi!']:
        return GREETING
    
    if is_blocked(message):
        return get_redirect_response()
    
    chunks, vectorizer = load_data()
    context = retrieve_context(message, chunks, vectorizer, k=3) if vectorizer else "No knowledge base available."
    
    hf_token = os.environ.get("HF_TOKEN")
    
    try:
        client = InferenceClient(model=MODEL_NAME, token=hf_token)
        prompt = ANALYTICS_EXPERT_PROMPT.format(context=context, message=message)
        
        response = client.chat_completion(
            messages=[{"role": "user", "content": prompt}],
            max_tokens=120,
            temperature=0.7
        )
        
        result = response.choices[0].message.content
        
        if message_count >= 3 and random.random() < 0.3:
            suggestions = [
                "\n\nP.S. Want to chat directly with Pratik? Check the contact section on his website!",
                "\n\nBTW, you can reach out to Pratik through his website contact section!",
                "\n\nFun fact: Pratik responds faster than me 😄 Check his contact info on his portfolio!",
            ]
            result += random.choice(suggestions)
        
        return result
        
    except Exception as e:
        return f"Error: {str(e)[:80]}"

st.title("🤖 Pratik's Twin")
st.markdown("*Pratik's analytics-expert assistant*")

if "messages" not in st.session_state:
    st.session_state.messages = []

for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

if prompt := st.chat_input("Ask about Pratik..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)
    
    with st.chat_message("assistant"):
        with st.spinner("Thinking..."):
            response = get_response(prompt, st.session_state.messages)
            st.markdown(response)
    
    st.session_state.messages.append({"role": "assistant", "content": response})
