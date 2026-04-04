// Skills with weight tiers for the word cloud
// tier 1 = largest (2.5x), tier 2 = large (2x), tier 3 = medium (1.5x), tier 4 = standard (1x)
export interface Skill {
  name: string;
  tier: 1 | 2 | 3 | 4;
  type?: "technical" | "soft";
}

export const skills: Skill[] = [
  // Tier 1 - Largest (core identity)
  { name: "Python", tier: 1, type: "technical" },
  { name: "SQL", tier: 1, type: "technical" },
  { name: "Machine Learning", tier: 1, type: "technical" },
  { name: "Predictive Modelling", tier: 1, type: "technical" },

  // Tier 2 - Large (strong competencies)
  { name: "Data Science", tier: 2, type: "technical" },
  { name: "NLP", tier: 2, type: "technical" },
  { name: "Deep Learning", tier: 2, type: "technical" },

  // Tier 3 - Medium (solid skills)
  { name: "Feature Engineering", tier: 3, type: "technical" },
  { name: "Scikit-learn", tier: 3, type: "technical" },
  { name: "Classification & Regression", tier: 3, type: "technical" },
  { name: "Experiment Design", tier: 3, type: "technical" },
  { name: "Sentiment Analysis", tier: 3, type: "technical" },

  // Tier 4 - Standard (supporting expertise)
  { name: "Probability & Statistics", tier: 4, type: "technical" },
  { name: "Business Intelligence", tier: 4, type: "technical" },
  { name: "Prompt Engineering", tier: 4, type: "technical" },
  { name: "AI-Augmented Workflows", tier: 4, type: "technical" },
  { name: "LLM Orchestration", tier: 4, type: "technical" },
];

// Soft skills for the outer ring - displayed in warm colors (amber/orange)
export const softSkills: Skill[] = [
  // Tier 1 - Largest soft skills
  { name: "Communication", tier: 1, type: "soft" },
  { name: "Leadership", tier: 1, type: "soft" },
  
  // Tier 2 - Large soft skills
  { name: "Team Management", tier: 2, type: "soft" },
  { name: "Problem Solving", tier: 2, type: "soft" },
  { name: "Stakeholder Management", tier: 2, type: "soft" },
  
  // Tier 3 - Medium soft skills
  { name: "Project Management", tier: 3, type: "soft" },
  { name: "Critical Thinking", tier: 3, type: "soft" },
  
  // Tier 4 - Standard soft skills
  { name: "Accountability", tier: 4, type: "soft" },
  { name: "Integrity", tier: 4, type: "soft" },
  { name: "Work Ethics", tier: 4, type: "soft" },
  { name: "Adaptability", tier: 4, type: "soft" },
  { name: "Data Storytelling", tier: 4, type: "soft" },
  { name: "Cross-functional Collaboration", tier: 4, type: "soft" },
];

// Combined list for backward compatibility
export const allSkills = [...skills, ...softSkills];

// Flat list for backward compatibility
export const coreExpertise = skills.map(s => s.name);
