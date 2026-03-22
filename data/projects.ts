import { personalInfo } from './social-media';

export interface Project {
  id: number;
  title: string;
  description: string;
  keywords: string[];
  img: string;
  github?: string;
  link?: string;
  techs: string[];
  status?: "in-progress" | "private";
  emoji?: string;
  highlight?: string;
  objective?: string;
  action?: string;
  result?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Predictive Collection Optimization",
    description: "Enterprise budget forecasting engine for a debt collection portfolio worth billions in face value.",
    keywords: ["Enterprise Forecasting", "Billion-Dollar Portfolio"],
    img: "https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif",
    techs: ["Python", "SQL", "Predictive Modeling", "Power BI"],
    status: "private",
    highlight: "+/-1% error rate",
    objective: "Build an enterprise-grade forecasting system that could predict annual collections across every granular dimension (MOB, servicing channel, operational vertical, compliance stage, age bucket, language segment) for a billion-dollar debt portfolio. The goal was to enable accurate budget planning and resource allocation across inbound, outbound, chat, and digital collection channels.",
    action: "Developed a comprehensive SQL-based predictive modeling pipeline that handles top-down purchase forecasts, account aging dynamics, paying-rate curves, and capacity planning. Engineered features from historical payment patterns, applied time-series analysis for seasonality, and created segment-specific models for different customer profiles. Built interactive Power BI dashboards for real-time monitoring and scenario analysis.",
    result: "Achieved ±1% error rate on monthly collection targets, enabling precise budget forecasting and resource planning. Reduced forecast preparation time from 2 weeks to 2 hours through automation. Received Gold Award 2024 for exceptional business impact. The model now drives decisions across all collection channels, optimizing capacity and improving operational efficiency."
  },
  {
    id: 2,
    title: "Customer Churn & Lead Scoring Engine",
    description: "End-to-end churn prediction using logistic regression and deep learning, combined with NLP-based customer feedback analysis.",
    keywords: ["Churn Prediction", "Lead Scoring", "NLP Feedback"],
    img: "https://i.pinimg.com/originals/84/f6/d1/84f6d14f1f88d34d3956150d19060d3a.gif",
    techs: ["Python", "Deep Learning", "NLP", "Scikit-learn"],
    status: "private",
    highlight: "Retention + Conversion",
    objective: "Develop a machine learning system that could (1) predict which customers are at risk of churning before they leave, and (2) score leads based on conversion probability to optimize marketing spend and sales effort allocation.",
    action: "Built a multi-model ensemble combining logistic regression for interpretable churn drivers and deep neural networks for capturing complex non-linear patterns. Implemented NLP pipelines to analyze customer feedback, support tickets, and interaction history using transformer-based sentiment analysis. Created a lead scoring engine that integrates demographic data, behavioral signals, and engagement metrics to prioritize high-conversion prospects.",
    result: "Improved customer retention by 23% through early intervention on at-risk accounts identified by the churn model. Increased marketing ROI by 40% by focusing resources on leads with high conversion probability. Reduced churn prediction false positives by 35% through continuous model refinement and feedback loops."
  },
  {
    id: 3,
    title: "India Job Market & Salary Analysis",
    description: "Comprehensive EDA on India's job market with interactive Plotly visualizations.",
    keywords: ["Exploratory Analysis", "Salary Trends", "Interactive Viz"],
    img: "https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif",
    github: `https://github.com/${personalInfo.github}/india-job-market-salary-analysis`,
    link: `https://github.com/${personalInfo.github}/india-job-market-salary-analysis`,
    techs: ["Python", "Pandas", "Plotly", "Jupyter"],
    highlight: "4,900+ data points",
    objective: "Conduct a comprehensive exploratory data analysis on India's job market to uncover salary distributions, demand trends, skills-salary correlations, and city-wise compensation benchmarks. Create interactive visualizations to make insights accessible and actionable for job seekers and recruiters.",
    action: "Scraped and cleaned 4,900+ job postings across multiple platforms. Performed extensive data cleaning, deduplication, and normalization of job titles, skills, and salary figures. Engineered features for skills clustering, experience level categorization, and city-tier classification. Built interactive Plotly dashboards with filters for experience, location, industry, and skills.",
    result: "Discovered that data science roles command 40% salary premium over IT average. Identified top 10 highest-paying cities and fastest-growing job categories. Found strong correlation between cloud skills and salary (60% premium). Project received 500+ GitHub stars and featured in data science communities."
  },
  {
    id: 4,
    title: "BirdCLEF 2026: Acoustic Species ID",
    description: "Kaggle competition entry for identifying bird species from audio recordings.",
    keywords: ["Audio Classification", "Kaggle Competition", "Signal Processing"],
    img: "https://i.pinimg.com/originals/84/f6/d1/84f6d14f1f88d34d3956150d19060d3a.gif",
    link: `https://www.kaggle.com/${personalInfo.kaggle}`,
    techs: ["Python", "Audio ML", "Signal Processing", "Kaggle"],
    status: "in-progress",
    highlight: "Active Competition",
    objective: "Develop an audio classification system to identify 234 bird species from soundscape recordings in the Pantanal wetlands. The competition requires processing audio files and generating probability predictions for each species presence.",
    action: "Building a deep learning pipeline using mel spectrograms as input features. Implementing EfficientNet architecture with Focal Loss to handle severe class imbalance (120+ species have <10 samples). Applying data augmentation techniques including SpecAugment, time stretching, and pitch shifting to improve model generalization.",
    result: "Currently in development. Pipeline processes 35,000+ training audio files and 10,000+ soundscape recordings. Achieved initial validation accuracy of 15% on balanced subset. Next phase involves ensemble methods and incorporating soundscape-specific training data."
  },
  {
    id: 5,
    title: "Stock & Mutual Fund Prediction",
    description: "ML pipeline comparing ARIMA, XGBoost, and Linear Regression on 20 years of daily stock data.",
    keywords: ["3-Model Comparison", "Data Leakage Fix", "20-Year Dataset"],
    img: "https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif",
    techs: ["Python", "ARIMA", "XGBoost", "Feature Engineering"],
    highlight: "Honest ML Results",
    objective: "Build and compare multiple machine learning models for stock price prediction using 20 years of daily stock and mutual fund data. The goal was to understand which approaches work best for financial time series and demonstrate proper ML methodology.",
    action: "Implemented and compared three approaches: (1) ARIMA for traditional time series forecasting, (2) XGBoost with engineered technical indicators (RSI, MACD, Bollinger Bands), and (3) Linear Regression as a baseline. Carefully engineered features to avoid data leakage, including proper train-test splits by time and avoiding future information in training.",
    result: "Discovered and fixed significant data leakage (R² dropped from 0.99 to realistic negative values after fix). Confirmed Efficient Market Hypothesis in practice - consistent outperformance is extremely difficult. XGBoost with technical indicators showed slight edge but not statistically significant. Important lesson in proper ML methodology and avoiding overfitting."
  },
  {
    id: 6,
    title: "AI-Powered Personal Automation Ecosystem",
    description: "A personal automation ecosystem saving 1,000+ hours/year by orchestrating AI agents.",
    keywords: ["1,000+ hrs/yr Saved", "AI Agent Orchestration", "Zero-Cost Stack"],
    img: "https://i.pinimg.com/originals/84/f6/d1/84f6d14f1f88d34d3956150d19060d3a.gif",
    github: `https://github.com/${personalInfo.github}`,
    techs: ["Claude Code", "OpenClaw", "Playwright", "Ollama", "Gemini", "Python"],
    highlight: "1,000+ hours/year",
    objective: "Build a personal automation ecosystem that orchestrates multiple AI agents across daily workflows to maximize productivity. The system needed to handle job portal updates, email management, knowledge retrieval, and development assistance while running entirely on local infrastructure with zero recurring cost.",
    action: "Orchestrated 4 local LLMs (Ollama) and 3 cloud models (Gemini, GPT-4, Claude) through a unified agent framework. Built WhatsApp-connected AI assistant with persistent memory for instant Q&A. Implemented automated job portal scraper running 13x daily with smart filtering. Created AI-bridged knowledge management system using vector databases. Integrated Playwright for browser automation and OpenClaw for enhanced AI interactions.",
    result: "Saved 1,000+ hours annually through automation. Job search efficiency improved 10x with automated portal monitoring. Development workflow accelerated through AI-assisted coding assistants. Email triage reduced daily management time by 45 minutes. All running on personal hardware with zero subscription costs."
  },
  {
    id: 7,
    title: "PortfolioBot - AI Portfolio Chatbot",
    description: "AI-powered chatbot that acts as your digital twin, answering questions about skills, experience, and achievements in natural conversations.",
    keywords: ["RAG", "LLM", "Streamlit", "Hugging Face"],
    img: "https://i.pinimg.com/originals/84/f6/d1/84f6d14f1f88d34d3956150d19060d3a.gif",
    github: `https://github.com/${personalInfo.github}/devfolio`,
    link: `https://imagimaniac-ratik-portfolio-bot.hf.space`,
    techs: ["Streamlit", "Python", "TF-IDF", "Hugging Face Inference API", "Meta Llama 3.2"],
    highlight: "Zero-cost LLM chatbot",
    objective: "Build an AI chatbot that serves as a digital twin - answering visitor questions about my professional background without them having to read through the entire resume. The bot needed to be free to host, privacy-conscious, and engaging.",
    action: "Developed a RAG-powered chatbot using Streamlit for the UI, Hugging Face Inference API for LLM inference (Meta Llama 3.2 1B), and TF-IDF for vector search. Implemented privacy filtering to block salary/financial questions, created an analytics expert persona for consistent tone, and integrated with the portfolio website via iframe.",
    result: "Live chatbot deployed on Hugging Face Spaces with zero hosting costs. Integrated into portfolio website, allowing visitors to ask natural questions about skills and experience. Privacy protection blocks sensitive queries and redirects to contact information."
  }
];
