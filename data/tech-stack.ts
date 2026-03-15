// Skills with weight tiers for the word cloud
// tier 1 = largest (2.5x), tier 2 = large (2x), tier 3 = medium (1.5x), tier 4 = standard (1x)
export interface Skill {
  name: string;
  tier: 1 | 2 | 3 | 4;
}

export const skills: Skill[] = [
  // Tier 1 - Largest (core identity)
  { name: "Python", tier: 1 },
  { name: "SQL", tier: 1 },
  { name: "Machine Learning", tier: 1 },
  { name: "Predictive Modelling", tier: 1 },

  // Tier 2 - Large (strong competencies)
  { name: "Power BI", tier: 2 },
  { name: "Data Science", tier: 2 },
  { name: "NLP", tier: 2 },
  { name: "Deep Learning", tier: 2 },

  // Tier 3 - Medium (solid skills)
  { name: "Feature Engineering", tier: 3 },
  { name: "Scikit-learn", tier: 3 },
  { name: "Classification & Regression", tier: 3 },
  { name: "Experiment Design", tier: 3 },
  { name: "Sentiment Analysis", tier: 3 },

  // Tier 4 - Standard (supporting expertise)
  { name: "Probability & Statistics", tier: 4 },
  { name: "Dashboard Visualization", tier: 4 },
  { name: "Business Intelligence", tier: 4 },
  { name: "Prompt Engineering", tier: 4 },
  { name: "AI-Augmented Workflows", tier: 4 },
  { name: "LLM Orchestration", tier: 4 },
];

// Flat list for backward compatibility
export const coreExpertise = skills.map(s => s.name);
