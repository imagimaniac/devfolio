import { personalInfo } from './social-media';

export interface Project {
  id: number;
  title: string;
  description: string;
  img: string;
  github?: string;
  link?: string;
  techs: string[];
  status?: "in-progress" | "private";
  emoji?: string;
  highlight?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "\uD83D\uDCCA Predictive Collection Optimization",
    description: "Enterprise budget forecasting engine for a debt collection portfolio worth billions in face value. Built a SQL-based predictive model that forecasts annual collections across every granular dimension \u2014 MOB, servicing channel, operational vertical, compliance stage, age bucket, and language segment. Handles top-down purchase forecasts, account aging, paying-rate curves, and capacity planning across inbound, outbound, chat, and digital channels. Achieves +/-1% accuracy on monthly collection targets. Gold Award 2024.",
    img: "https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif",
    techs: ["Python", "SQL", "Predictive Modeling", "Power BI"],
    status: "private",
    highlight: "+/-1% accuracy on billion-dollar portfolio"
  },
  {
    id: 2,
    title: "\uD83D\uDD04 Customer Churn & Lead Scoring Engine",
    description: "End-to-end churn prediction using logistic regression and deep learning, combined with NLP-based customer feedback analysis. Improved retention by flagging at-risk customers and optimized marketing spend through lead scoring that prioritized high-conversion prospects.",
    img: "https://i.pinimg.com/originals/84/f6/d1/84f6d14f1f88d34d3956150d19060d3a.gif",
    techs: ["Python", "Deep Learning", "NLP", "Scikit-learn"],
    status: "private",
    highlight: "Improved retention & conversion rates"
  },
  {
    id: 3,
    title: "\uD83D\uDCBC India Job Market & Salary Analysis",
    description: "Comprehensive EDA on India\u2019s job market \u2014 salary distributions, demand trends, skills-salary correlations, and city-wise compensation benchmarks with interactive Plotly visualizations.",
    img: "https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif",
    github: `https://github.com/${personalInfo.github}/india-job-market-salary-analysis`,
    link: `https://github.com/${personalInfo.github}/india-job-market-salary-analysis`,
    techs: ["Python", "Pandas", "Plotly", "Jupyter"],
    highlight: "4,900+ data points, 20+ visualizations"
  },
  {
    id: 4,
    title: "\uD83D\uDC26 BirdCLEF 2026: Acoustic Species ID",
    description: "Kaggle competition entry for identifying bird species from audio recordings using signal processing and ML classification techniques.",
    img: "https://i.pinimg.com/originals/84/f6/d1/84f6d14f1f88d34d3956150d19060d3a.gif",
    link: `https://www.kaggle.com/${personalInfo.kaggle}`,
    techs: ["Python", "Audio ML", "Signal Processing", "Kaggle"],
    status: "in-progress",
    highlight: "Active Kaggle Competition"
  },
  {
    id: 5,
    title: "\uD83D\uDCC8 Stock & Mutual Fund Prediction",
    description: "ML pipeline comparing ARIMA, XGBoost, and Linear Regression on 20 years of daily stock data. Discovered and fixed data leakage (R\u00B2 dropped from 0.99 to realistic negatives), confirming the Efficient Market Hypothesis in practice.",
    img: "https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif",
    techs: ["Python", "ARIMA", "XGBoost", "Feature Engineering"],
    highlight: "20 years of daily data, 3 model comparison"
  },
  {
    id: 6,
    title: "\uD83E\uDD16 AI-Powered Personal Automation Ecosystem",
    description: "A personal automation ecosystem saving 1,000+ hours/year by orchestrating AI agents across daily workflows. Includes a WhatsApp-connected AI assistant with persistent memory and email triage, automated job portal updates running 13x daily, AI-assisted development pipelines across 4 local LLMs and 3 cloud models, and an AI-bridged knowledge management system. All built with open-source tools and zero recurring cost.",
    img: "https://i.pinimg.com/originals/84/f6/d1/84f6d14f1f88d34d3956150d19060d3a.gif",
    github: `https://github.com/${personalInfo.github}`,
    techs: ["Claude Code", "OpenClaw", "Playwright", "Ollama", "Gemini", "Python"],
    highlight: "1,000+ hours/year saved"
  }
];
