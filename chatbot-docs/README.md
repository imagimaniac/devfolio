# PortfolioBot 🤖

An AI-powered portfolio chatbot that acts as your digital twin - answering questions about you, your skills, experience, and achievements in a natural, conversational way.

## 🌟 Features

- **Natural Conversations**: Chat naturally about the person's experience and skills
- **Privacy Protected**: Automatically blocks questions about salary, personal finances, and sensitive topics
- **Analytics Expert Persona**: Speaks like a data professional with metrics and impact focus
- **Contact Promotion**: Subtly suggests connecting directly after engaging conversations
- **Zero-Cost Hosting**: Deploys free on Hugging Face Spaces
- **RAG-Powered**: Uses TF-IDF retrieval for contextually accurate responses

## 🎯 What It Does

When visitors want to learn about you but don't want to read through a full resume, PortfolioBot:

1. Answers questions about your experience, skills, and projects
2. Provides metrics and achievements in a conversational format
3. Redirects sensitive questions (salary, personal info) to your contact page
4. Builds rapport and suggests connecting directly

## 🚀 Quick Links

- **Live Demo**: [Hugging Face Space](https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME)
- **Documentation**: [Setup Guide](./SETUP.md) | [Deployment](./DEPLOYMENT.md) | [Customization](./CUSTOMIZATION.md)
- **Architecture**: [System Design](./ARCHITECTURE.md)

## 📁 Project Structure

```
chatbot/
├── app.py                 # Main Streamlit application
├── requirements.txt       # Python dependencies
├── security_config.py    # Privacy & content filtering
└── knowledge-base/        # Your information (see SETUP.md)

chatbot-docs/              # Documentation
├── README.md             # This file
├── ARCHITECTURE.md       # System architecture & design
├── SETUP.md             # Local development setup
├── DEPLOYMENT.md        # Hugging Face Spaces deployment
└── CUSTOMIZATION.md     # Personalizing for yourself
```

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| UI | Streamlit |
| AI Model | Meta Llama 3.2 1B (via Hugging Face Inference API) |
| Vector Search | TF-IDF (scikit-learn) |
| Hosting | Hugging Face Spaces (Free) |

## 🔒 Privacy & Security

The chatbot includes built-in privacy protection:

- **Blocked Topics**: Salary, compensation, personal finances, family info, home address
- **Redirect Behavior**: Automatically redirects to contact info for sensitive questions
- **No Data Storage**: Conversations are not stored
- **Privacy-First**: Your personal contact info is not hardcoded in the public version

## 📝 Example Conversations

**Q: "Tell me about his experience"**
> "6+ years in analytics, currently Manager at Encore. Started civil, pivoted to data. That's solid trajectory."

**Q: "What skills does he have?"**
> "Python and SQL are his core stack. ML for predictions, Power BI for dashboards. Good technical foundation."

**Q: "What's his salary?"**
> "That's not something I have info on - Pratik would need to share that directly. Want to know about his professional work instead?"

## 🤝 Contributing

This is a personal project designed to be customized for your own portfolio. See [CUSTOMIZATION.md](./CUSTOMIZATION.md) for instructions on making it your own.

## 📄 License

MIT License - feel free to use and modify for your own portfolio!

---

*Built with ❤️ as part of the [devfolio](https://github.com/imagimaniac/devfolio) project*
