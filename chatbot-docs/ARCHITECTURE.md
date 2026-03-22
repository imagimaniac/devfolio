# Architecture Overview

This document explains how PortfolioBot works under the hood.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                        │
│                     (Streamlit Web App)                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Chat Handler                            │
│  - Message validation                                        │
│  - Greeting detection                                        │
│  - History tracking                                          │
│  - Response formatting                                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Security Filter                           │
│  - Blocked patterns check                                   │
│  - Sensitive topic redirect                                 │
│  - Contact promotion (after 3+ messages)                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Context Retrieval                           │
│  - TF-IDF Vectorizer (scikit-learn)                        │
│  - Knowledge base chunking                                   │
│  - Similarity search                                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    LLM Inference                            │
│  - Hugging Face Inference API                               │
│  - Meta Llama 3.2 1B Instruct                              │
│  - Analytics expert persona prompt                          │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. User Interface (Streamlit)

**File**: `chatbot/app.py`

Streamlit provides the web interface with:
- Chat message display
- Input handling
- Session state management
- Spinner for loading states

```python
st.set_page_config(page_title="PortfolioBot", page_icon="🤖")
# ... chat interface code
```

### 2. Chat Handler

The chat function (`get_response`) orchestrates the flow:

```python
def get_response(message, history):
    message_count = len(history) // 2
    # 1. Check for greeting
    # 2. Apply security filter
    # 3. Retrieve context from knowledge base
    # 4. Generate LLM response
    # 5. Add contact promotion (30% chance after 3+ messages)
    return result
```

### 3. Security Filter

**File**: `chatbot/security_config.py`

Blocks sensitive topics and redirects appropriately:

```python
BLOCKED_PATTERNS = [
    "salary", "compensation", "pay", "money",
    "family", "married", "kids",
    # ... more patterns
]

def is_blocked(question):
    # Returns True if question contains blocked patterns

def get_redirect_response():
    # Returns privacy redirect message
```

### 4. Context Retrieval (TF-IDF)

Instead of complex vector databases, we use simple TF-IDF:

```python
from sklearn.feature_extraction.text import TfidfVectorizer

# Knowledge base → chunks → TF-IDF vectors
# Query → TF-IDF vector → Cosine similarity → Top-k results
```

**Advantages:**
- No external services needed (unlike ChromaDB/Pinecone)
- Fast inference
- Easy to understand and modify
- Minimal dependencies

### 5. LLM Inference

**Model**: Meta Llama 3.2 1B Instruct

Hosted free on Hugging Face Inference API:

```python
from huggingface_hub import InferenceClient

client = InferenceClient(model=MODEL_NAME, token=hf_token)
response = client.chat_completion(
    messages=[{"role": "user", "content": prompt}],
    max_tokens=120,
    temperature=0.7
)
```

### 6. Analytics Expert Persona

The system prompt shapes the LLM's behavior:

```python
ANALYTICS_EXPERT_PROMPT = """You are PortfolioBot...
- Speak AS PortfolioBot about Pratik. Never speak AS Pratik.
- Use "he", "his", "Pratik" - NOT "I", "my"
- Use analytics terminology: "solid", "meaningful impact"
- Response MUST be 1-2 sentences only.
..."""
```

## Data Flow

1. **User sends message** → Streamlit input
2. **Security check** → Block or allow
3. **Context retrieval** → TF-IDF similarity search on knowledge base
4. **Prompt construction** → System prompt + context + user message
5. **LLM inference** → Hugging Face API call
6. **Response formatting** → Add contact promotion if applicable
7. **Display** → Streamlit chat message

## Knowledge Base Structure

```
knowledge-base/
└── personal/
    └── sample-bio.md    # Your information in markdown format
```

The knowledge base is a collection of markdown files containing:
- Professional summary
- Work experience with achievements
- Skills and technologies
- Education
- Projects
- Awards

## Deployment Architecture

```
GitHub Repo ──────────────────────────────────────┐
    │                                               │
    ▼                                               ▼
┌─────────────┐                              ┌─────────────┐
│   Main      │                              │   Private   │
│   Branch    │ ──► HF Spaces ──► Live App  │   Branch    │
│ (Public)    │                              │ (With real  │
│ Placeholders│                              │  contact)   │
└─────────────┘                              └─────────────┘
                                                    │
                                                    ▼
                                            HF Spaces Secret
                                            (HF_TOKEN)
```

## Performance Considerations

| Metric | Value |
|--------|-------|
| Cold start | ~30 seconds |
| Response time | 2-5 seconds |
| Memory usage | ~500MB |
| Model size | 1B parameters |
| Dependencies | 5 packages |

## Future Improvements

Possible enhancements:
- [ ] Support for multiple personas
- [ ] Conversation memory (short-term)
- [ ] Feedback mechanism
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Voice input/output
