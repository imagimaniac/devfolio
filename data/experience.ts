export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
  companyLogo?: string;
  companyUrl?: string;
  companyColor?: string;
  isCurrentPosition?: boolean;
  achievements?: string[];
  teamSize?: string;
}

export const experience: Experience[] = [
  {
    id: 1,
    title: "Manager - Strategy Analytics",
    company: "Encore Capital Group",
    location: "India",
    startDate: "July 2025",
    endDate: "Present",
    description: [
      "Lead enterprise-level budget forecasting and collections strategy across portfolios worth billions in face value, driving data-backed capacity planning for all operational verticals",
      "Own demand modelling and dial optimization across inbound, outbound, chat, and digital servicing channels, aligning collection targets with compliance and capacity constraints",
      "Build and maintain financial forecasting models that predict monthly collection targets at granular MOB, stage, vertical, and segment levels with +/-1% accuracy",
      "Design experiment frameworks for A/B testing collection strategies, measuring uplift in liquidation rates and cost-to-collect across agent cohorts",
      "Partner with operations, finance, and technology teams to translate analytical insights into actionable workforce and portfolio management decisions"
    ],
    technologies: ["Python", "SQL", "Predictive Modeling", "Power BI", "Financial Forecasting", "Experiment Design"],
    companyLogo: "https://media.licdn.com/dms/image/v2/C560BAQFOvPCqz6MUCA/company-logo_200_200/company-logo_200_200/0/1656522319244?e=2147483647&v=beta&t=placeholder",
    companyUrl: "https://www.encorecapital.com/",
    companyColor: "#0056B3",
    isCurrentPosition: true,
    achievements: [
      "+/-1% accuracy on annual collection forecasts worth billions",
      "Optimized capacity planning across all servicing channels",
      "Led cross-functional analytics strategy for enterprise budgeting"
    ]
  },
  {
    id: 2,
    title: "Deputy Manager - Strategy Analytics",
    company: "Encore Capital Group",
    location: "Gurgaon, India",
    startDate: "March 2023",
    endDate: "July 2025",
    description: [
      "Built predictive models for agent-case pairing that reduced cost-to-collect by identifying optimal assignment patterns based on tenure, language, and historical performance",
      "Designed behavioral scoring models to segment accounts by propensity to pay, enabling targeted engagement strategies that improved liquidation rates",
      "Created automated Power BI dashboards tracking real-time collection performance across 20+ KPIs, replacing manual Excel reporting and saving 15+ hours/week",
      "Developed account aging and paying-rate curve models used in enterprise budget forecasting across every MOB, vertical, and servicing channel",
      "Earned Encore Honors Gold Award 2024 and President's Club nomination for predictive collection optimization work"
    ],
    technologies: ["Python", "SQL", "Machine Learning", "Power BI", "Predictive Modeling", "Behavioral Analytics"],
    companyLogo: "https://media.licdn.com/dms/image/v2/C560BAQFOvPCqz6MUCA/company-logo_200_200/company-logo_200_200/0/1656522319244?e=2147483647&v=beta&t=placeholder",
    companyUrl: "https://www.encorecapital.com/",
    companyColor: "#0056B3",
    achievements: [
      "Gold Award 2024 for predictive collection optimization",
      "President's Club nomination",
      "Saved 15+ hours/week through dashboard automation"
    ]
  },
  {
    id: 3,
    title: "Business Analyst",
    company: "GoMechanic",
    location: "Gurgaon, India",
    startDate: "June 2022",
    endDate: "March 2023",
    description: [
      "Built churn prediction models using logistic regression and deep learning that flagged at-risk customers early enough for targeted retention interventions",
      "Developed a lead scoring system that prioritized high-conversion prospects, focusing marketing spend where it mattered and improving conversion rates",
      "Implemented NLP-based sentiment analysis on customer feedback to surface recurring pain points, giving the product team concrete, data-backed issues to fix",
      "Designed and maintained ETL pipelines feeding real-time customer behavior data into analytical models and dashboards"
    ],
    technologies: ["Python", "Deep Learning", "NLP", "Logistic Regression", "Scikit-learn", "SQL"],
    companyUrl: "https://www.gomechanic.in/",
    achievements: [
      "Improved customer retention through early churn detection",
      "Optimized marketing spend via lead scoring prioritization"
    ]
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "InfoDeal Technologies",
    location: "Pune, India",
    startDate: "October 2019",
    endDate: "June 2022",
    description: [
      "Built decision support systems and interactive dashboards that gave stakeholders real-time visibility into key business metrics and conversion funnels",
      "Designed and executed A/B tests for conversion optimization, measuring statistical significance and translating results into actionable product recommendations",
      "Developed live monitoring dashboards tracking user engagement, conversion rates, and revenue metrics across multiple product lines",
      "Created automated reporting pipelines that replaced manual data pulls, improving data freshness and reducing analyst overhead"
    ],
    technologies: ["Python", "SQL", "Power BI", "A/B Testing", "Dashboard Design", "Statistical Analysis"],
    companyUrl: "https://www.infodeal.in/",
    achievements: [
      "Built real-time decision support systems used by leadership",
      "Automated reporting pipelines saving hours of manual work"
    ]
  },
  {
    id: 5,
    title: "Senior Design Engineer",
    company: "Larsen & Toubro",
    location: "Mumbai, India",
    startDate: "July 2018",
    endDate: "October 2019",
    description: [
      "Applied data-driven approaches to pavement deterioration modelling, using regression analysis to predict infrastructure degradation and optimize maintenance scheduling",
      "Leveraged analytical methods for transportation engineering projects, combining statistical modelling with domain expertise in civil engineering",
      "Developed quantitative frameworks for design optimization that reduced material costs while maintaining structural integrity"
    ],
    technologies: ["Regression Analysis", "Statistical Modelling", "MATLAB", "AutoCAD", "Data Analysis"],
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/L%26T_logo.svg/1200px-L%26T_logo.svg.png",
    companyUrl: "https://www.larsentoubro.com/"
  }
];
