# Customization Guide

Make PortfolioBot your own by customizing the persona, responses, and knowledge base.

## Table of Contents

1. [Personal Information](#1-personal-information)
2. [Knowledge Base](#2-knowledge-base)
3. [Persona & Tone](#3-persona--tone)
4. [Blocked Topics](#4-blocked-topics)
5. [Contact Promotion](#5-contact-promotion)
6. [UI Customization](#6-ui-customization)

---

## 1. Personal Information

### Update Contact Info

Edit `chatbot/knowledge-base/personal/sample-bio.md`:

```markdown
**Email:** your-email@example.com
**Phone:** +1-234-567-8900
**LinkedIn:** linkedin.com/in/yourusername
**Portfolio:** https://yourportfolio.com
**GitHub:** github.com/yourusername
```

### Update Professional Info

```markdown
## Professional Summary
[Write a compelling 2-3 sentence summary of your professional background]

## Professional Experience

### Senior Position
**Company Name** | January 2023 – Present | Location

**Achievement 1:** Improved X by Y% using Z technology
**Achievement 2:** Led team of N people to deliver project
**Achievement 3:** Saved/Generated $X through initiative
```

**Tips for good achievements:**
- Use numbers and percentages
- Focus on impact (saved time, increased revenue, improved efficiency)
- Be specific about technologies used

---

## 2. Knowledge Base

### Structure Your Information

Create markdown files for different aspects:

```
knowledge-base/
├── personal/
│   ├── bio.md           # Main bio and summary
│   └── work-style.md    # How you work
├── experience/
│   └── roles.md        # Work history
├── skills/
│   ├── programming.md   # Technical skills
│   └── tools.md        # Tools you use
├── projects/
│   └── notable.md      # Key projects
└── education/
    └── degrees.md      # Education & certifications
```

### Knowledge Base Best Practices

1. **Be specific with numbers**
   - ❌ "Improved performance significantly"
   - ✅ "Improved query speed by 40%"

2. **Use consistent formatting**
   - Each achievement on its own line
   - Use bullet points for lists

3. **Include context**
   - Company size or industry
   - Team composition
   - Tools/technologies used

4. **Add variety**
   - Don't just list skills
   - Include stories and examples
   - Mention awards and recognition

---

## 3. Persona & Tone

### Change the Voice

Edit the `ANALYTICS_EXPERT_PROMPT` in `chatbot/app.py`:

```python
ANALYTICS_EXPERT_PROMPT = """You are PortfolioBot - an AI assistant for [YOUR NAME].

# Change these to match your desired persona:

# Formal tone example:
PERSONA: You speak in a professional, executive manner.
- Use formal language
- "He has demonstrated expertise"
- "His contributions have been significant"

# Casual tone example:  
PERSONA: You're a friendly colleague who knows this person well.
- Use casual language
- "He's really good at"
- "He crushed it on that project"

YOUR LANGUAGE (adjust these):
- "solid" → replace with your preferred term
- "meaningful impact" → adjust to your style
"""
```

### Adjust Response Style

```python
# Make responses shorter (1 sentence instead of 2)
RULES (STRICTLY FOLLOW):
1. Response MUST be 1 sentence only. NEVER exceed 1 sentence.

# Or longer (3 sentences)
RULES (STRICTLY FOLLOW):
1. Response MUST be 2-3 sentences. NEVER exceed 3 sentences.
```

### Example Responses

The prompt includes example responses. Customize them:

```python
EXAMPLE RESPONSES (adjust to your style):

# For a more technical persona:
Q: "What skills?"
A: "He knows Python, SQL, and ML. Has deployed models to production at scale. Solid foundation."

# For a more business-focused persona:
Q: "What skills?"
A: "He's got the full stack - from data engineering to business insights. Knows how to drive value."
```

---

## 4. Blocked Topics

### Add More Blocked Patterns

Edit `chatbot/security_config.py`:

```python
BLOCKED_PATTERNS = [
    # Existing patterns...
    "salary",
    "compensation",
    
    # Add your own:
    "politics",
    "religion",
    "personal problems",
    "medical",
    "family emergency",
    # etc.
]
```

### Customize Redirect Message

```python
REDIRECT_RESPONSE = """That's private information - [YOUR NAME] would need to share that directly.
Check out their contact page: [YOUR_CONTACT_URL]"""
```

---

## 5. Contact Promotion

### Adjust When to Suggest Contact

```python
# Change from 3 messages to 5
if message_count >= 5 and random.random() < 0.3:

# Or increase frequency
if message_count >= 3 and random.random() < 0.5:  # 50% chance
```

### Customize Contact Suggestions

```python
contact_suggestions = [
    "\n\nWant to chat directly? Email: your-email@example.com",
    "\n\nHe responds faster than me! Phone: +1-234-567-8900",
    "\n\nSerious about connecting? Reach out on LinkedIn!",
    # Add your own...
]
```

### Disable Contact Promotion

```python
# Remove or comment out the contact promotion block
if message_count >= 3:
    pass  # Contact promotion disabled
```

---

## 6. UI Customization

### Change App Title

In `chatbot/app.py`:

```python
st.set_page_config(
    page_title="Your Name's Twin",  # Change this
    page_icon="🤖"  # Or use your own emoji/icon
)
```

### Customize Greeting

```python
GREETING = """Hey! 👋 I'm [YOUR NAME]'s Bot.

I know everything about their work and experience.
What would you like to know?"""
```

### Change Theme (Streamlit)

Streamlit has built-in themes. Add to `.streamlit/config.toml`:

```toml
[theme]
primaryColor = "#E694FF"
backgroundColor = "#262730"
secondaryBackgroundColor = "#404040"
textColor = "#FAFAFA"
font = "sans serif"
```

---

## Advanced Customization

### Use a Different LLM Model

```python
# In app.py
MODEL_NAME = "meta-llama/Llama-3.2-1B-Instruct"  # Current

# Options:
MODEL_NAME = "microsoft/Phi-3-mini-4k-instruct"  # Smaller, faster
MODEL_NAME = "mistralai/Mistral-7B-Instruct-v0.2"  # Larger, more capable
MODEL_NAME = "google/gemma-2b-it"  # Google's model
```

**Note**: Different models may require prompt adjustments.

### Add Conversation Memory

```python
# Add to st.session_state.messages tracking
if "conversation_history" not in st.session_state:
    st.session_state.conversation_history = []

# Include history in prompt
if st.session_state.conversation_history:
    history_text = "\n".join([
        f"User: {m['content']}" 
        for m in st.session_state.conversation_history[-5:]
    ])
    prompt = f"Previous conversation:\n{history_text}\n\n{new_prompt}"
```

### Multi-Language Support

```python
# Add language detection and translation
from langdetect import detect

def get_response(message, history):
    lang = detect(message)
    
    if lang == "es":  # Spanish
        ANALYTICS_EXPERT_PROMPT = SPANISH_PROMPT
    elif lang == "fr":  # French
        ANALYTICS_EXPERT_PROMPT = FRENCH_PROMPT
    else:
        ANALYTICS_EXPERT_PROMPT = ENGLISH_PROMPT
```

---

## Testing Your Changes

1. Run locally:
   ```bash
   streamlit run app.py
   ```

2. Test various scenarios:
   - Greeting message
   - Common questions about experience
   - Blocked topics
   - Contact promotion trigger

3. Check responses for:
   - Accuracy of information
   - Appropriate tone
   - Response length
   - Grammar and spelling

---

## Troubleshooting

**Problem**: Responses are too generic

**Solution**: Add more specific details to your knowledge base. The LLM uses context from your knowledge base.

**Problem**: Responses are too long

**Solution**: Adjust `max_tokens=120` in the API call to a lower number like `80`.

**Problem**: Bot speaks in first person

**Solution**: Check the system prompt rules. Make sure "Use 'he', 'his', '[YOUR NAME]' - NOT 'I', 'my'" is included.

---

## Need Help?

- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- Check [SETUP.md](./SETUP.md) for local development
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment
