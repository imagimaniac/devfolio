# Deployment Guide

Deploy PortfolioBot to Hugging Face Spaces for free hosting.

## Prerequisites

- Hugging Face account (free)
- Hugging Face write token (for creating Spaces)
- Your chatbot code ready (see [SETUP.md](./SETUP.md))

## Option 1: Deploy to Hugging Face Spaces

### Step 1: Create a New Space

1. Go to [Hugging Face Spaces](https://huggingface.co/new-space)
2. Select "Streamlit" as the SDK
3. Choose a name: `yourname-portfolio-bot` (e.g., `pratik-portfolio-bot`)
4. Select "Public" or "Private"
5. Click "Create Space"

### Step 2: Upload Your Code

**Option A: Using Git (Recommended)**

```bash
cd chatbot

# Initialize git if not already
git init
git add .
git commit -m "Initial PortfolioBot code"

# Add HF remote (use your write token)
git remote add origin https://hf_YOUR_WRITE_TOKEN@huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME

# Push
git push -u origin main
```

**Option B: Using HF Hub Python**

```bash
pip install huggingface_hub

python << 'EOF'
from huggingface_hub import HfApi

api = HfApi()
token = "hf_your_write_token"

api.upload_folder(
    folder_path="./chatbot",
    repo_id="YOUR_USERNAME/YOUR_SPACE_NAME",
    repo_type="space",
    token=token
)
EOF
```

### Step 3: Configure the Space

Hugging Face Spaces needs a `README.md` with configuration. Create it in your Space:

```yaml
---
title: Your Name's Twin
emoji: 🤖
colorFrom: purple
colorTo: blue
sdk: streamlit
sdk_version: 1.40.0
app_file: app.py
pinned: false
---
```

### Step 4: Add Your HF Token as a Secret

1. Go to your Space settings: `https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME/settings`
2. Scroll to "Repository secrets"
3. Add a new secret:
   - Name: `HF_TOKEN`
   - Value: `hf_your_read_token`

### Step 5: Wait for Deployment

- First deployment takes 2-5 minutes
- Subsequent deployments are faster
- Check the "Logs" tab for any errors

### Step 6: Test Your Deployment

Your chatbot will be live at:
```
https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space
```

## Option 2: Use the Existing HF Space (For This Project)

This project is already deployed at:
```
https://imagimaniac-ratik-portfolio-bot.hf.space
```

To update it:

1. Fork the space or create a new one
2. Upload your code (following Option 1)
3. Add your `HF_TOKEN` secret

## Integrating with Your Website

### Option A: Direct Link

Simply link to your HF Space:
```html
<a href="https://your-space.hf.space">Chat with PortfolioBot</a>
```

### Option B: Embed as Iframe

```html
<iframe 
    src="https://your-space.hf.space"
    width="100%"
    height="600"
    frameborder="0"
></iframe>
```

### Option C: Widget Component (React/Next.js)

```tsx
// components/ChatbotWidget.tsx
"use client";

import { useState } from "react";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open PortfolioBot 🤖
      </button>
      
      {isOpen && (
        <div className="modal">
          <iframe 
            src="https://your-space.hf.space"
            className="w-full h-[600px]"
          />
        </div>
      )}
    </>
  );
}
```

## Troubleshooting Deployment Issues

### Build Errors

**Problem**: "Missing configuration in README"

**Solution**: Ensure your README.md has proper YAML frontmatter:
```yaml
---
title: Your Title
emoji: 🤖
sdk: streamlit
app_file: app.py
---
```

### Runtime Errors

**Problem**: "ModuleNotFoundError"

**Solution**: Check that all imports in `app.py` are in `requirements.txt`

### Token Errors

**Problem**: "401 Unauthorized"

**Solution**: 
1. Make sure you've added `HF_TOKEN` as a Space secret
2. Check the token has "Read" permission
3. Try regenerating the token

### Slow Cold Starts

**Problem**: App takes >30 seconds to load

**Solution**: 
- This is normal for first-time loading
- Hugging Face caches the Docker image for subsequent loads
- Consider upgrading to Pro for dedicated resources

## Free Tier Limits

Hugging Face Spaces free tier includes:
- 2 concurrent apps
- CPU-only inference
- 500MB storage
- Unlimited deployments

**Note**: The free tier uses shared resources, so response times may vary.

## Custom Domain (Optional)

To use a custom domain:

1. Go to Space Settings → Domains
2. Add your custom domain
3. Configure DNS CNAME record
4. Wait for SSL certificate provisioning

## Monitoring

Track your Space usage:
- Go to Space Settings → Metrics
- View: Total requests, CPU time, memory usage

## Next Steps

- [Customize your chatbot](./CUSTOMIZATION.md)
- [Update your website integration](../README.md)
