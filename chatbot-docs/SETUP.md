# Local Setup Guide

Get PortfolioBot running on your local machine.

## Prerequisites

- Python 3.10 or higher
- pip or conda
- A Hugging Face account (free)
- Hugging Face API token (free)

## Step 1: Clone the Repository

```bash
git clone https://github.com/imagimaniac/devfolio.git
cd devfolio/chatbot
```

## Step 2: Create Virtual Environment

**Using venv:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# On macOS/Linux with Python 3:
python3 -m venv venv
source venv/bin/activate
```

**Using conda:**
```bash
conda create -n portfolio-bot python=3.10
conda activate portfolio-bot
```

## Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- `streamlit` - Web UI framework
- `huggingface-hub` - For LLM inference
- `scikit-learn` - For TF-IDF vectorization
- `python-dotenv` - For environment variables
- `numpy` - For numerical operations

## Step 4: Get Hugging Face API Token

1. Go to [Hugging Face Settings](https://huggingface.co/settings/tokens)
2. Click "New Token"
3. Name it (e.g., "PortfolioBot")
4. Select type: "Read"
5. Copy the token

## Step 5: Configure Environment

Create a `.env` file in the `chatbot/` folder:

```bash
touch .env
```

Add your Hugging Face token:
```
HF_TOKEN=hf_your_token_here
```

**Important:** Never commit `.env` to version control!

The `.gitignore` already excludes `.env` files, but double-check:
```bash
cat .gitignore | grep env
# Should show: .env
```

## Step 6: Prepare Your Knowledge Base

Edit the knowledge base files with your information:

```bash
# Edit the sample bio
nano chatbot/knowledge-base/personal/sample-bio.md
```

Replace:
- `YOUR_EMAIL` → your actual email
- `YOUR_PHONE` → your phone number
- `YOUR_LINKEDIN_USERNAME` → your LinkedIn username
- `YOUR_PORTFOLIO_URL` → your portfolio URL
- `YOUR_GITHUB_USERNAME` → your GitHub username

Add your:
- Professional summary
- Work experience with achievements
- Skills and technologies
- Education
- Projects
- Awards

## Step 7: Run the Chatbot

```bash
cd chatbot
streamlit run app.py
```

The app will open in your browser at `http://localhost:8501`

## Troubleshooting

### "Module not found" errors

Make sure your virtual environment is activated:
```bash
# Check Python path
which python
# Should point to venv

# Reinstall if needed
pip install -r requirements.txt
```

### "Invalid token" errors

1. Check your `.env` file has the correct token
2. Make sure you selected "Read" permission when creating the token
3. Try regenerating the token

### Knowledge base not loading

Check that your markdown files:
- Are in the `knowledge-base/` folder
- Have `.md` extension
- Contain valid markdown content

### Slow responses

- First request initializes the TF-IDF model (normal)
- LLM inference depends on Hugging Face server load
- Consider upgrading to Pro tier for faster inference (optional)

## Development Workflow

1. Make changes to code or knowledge base
2. Save the files
3. Streamlit auto-reloads (or click "Rerun")
4. Test your changes

## Testing Security Filter

Try asking these questions to verify the security filter works:

- "What's your salary?"
- "How much do you earn?"
- "Where do you live?"
- "Are you married?"

These should all be blocked and redirected.

## Project Structure

```
chatbot/
├── app.py                  # Main Streamlit app (don't edit unless customizing)
├── requirements.txt       # Dependencies (don't edit)
├── security_config.py    # Privacy rules (you can modify blocked patterns)
├── knowledge-base/        # YOUR DATA - edit these files!
│   └── personal/
│       └── sample-bio.md  # Your information
└── .env                   # Your API token (create this)
```

## Next Steps

- [Customize the persona](./CUSTOMIZATION.md)
- [Deploy to Hugging Face Spaces](./DEPLOYMENT.md)
- [Update your portfolio website](./README.md)
