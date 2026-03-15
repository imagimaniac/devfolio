export interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  achievements: string[];
  institutionLogo?: string;
  institutionUrl?: string;
  gpa?: string;
  honors?: string[];
  relevantCourses?: string[];
  projects?: string[];
  completionPercentage?: number;
  institutionColor?: string;
}

export const education: Education[] = [
  {
    id: 1,
    degree: "Master of Technology - Civil Engineering",
    institution: "Indian Institute of Technology Kharagpur",
    location: "Kharagpur, West Bengal",
    startDate: "June 2016",
    endDate: "May 2018",
    description: [
      "Specialized in Transportation Engineering with focus on analytical and statistical modelling",
      "Applied regression analysis and data-driven methods to infrastructure deterioration prediction",
      "Developed quantitative research skills that form the foundation of current analytics career"
    ],
    achievements: [
      "IIT Kharagpur - Premier engineering institute in India",
      "Research in data-driven infrastructure modelling"
    ],
    institutionLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/IIT_Kharagpur_Logo.svg/1200px-IIT_Kharagpur_Logo.svg.png",
    institutionUrl: "https://www.iitkgp.ac.in/",
    relevantCourses: [
      "Probability & Statistics",
      "Regression Analysis",
      "Transportation Engineering",
      "Numerical Methods",
      "Research Methodology",
      "Operations Research"
    ],
    completionPercentage: 100,
    institutionColor: "#FF6600"
  },
  {
    id: 2,
    degree: "Bachelor of Technology - Civil Engineering",
    institution: "College of Engineering Pune (COEP)",
    location: "Pune, Maharashtra",
    startDate: "June 2011",
    endDate: "May 2015",
    description: [
      "Undergraduate degree in Civil Engineering from one of the oldest engineering colleges in Asia (established 1854)",
      "Built strong foundation in mathematics, physics, and engineering problem-solving"
    ],
    achievements: [
      "COEP - One of the oldest engineering colleges in Asia",
      "Strong foundation in applied mathematics and analytical thinking"
    ],
    institutionLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/COEP_Technological_University_logo.png/220px-COEP_Technological_University_logo.png",
    institutionUrl: "https://www.coep.org.in/",
    relevantCourses: [
      "Engineering Mathematics",
      "Applied Mechanics",
      "Structural Analysis",
      "Fluid Mechanics",
      "Computer Aided Design"
    ],
    completionPercentage: 100,
    institutionColor: "#003366"
  }
];
