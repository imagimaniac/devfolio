export const personalInfo = {
  email: 'pghagawane175@gmail.com',
  github: 'imagimaniac',
  linkedin: 'imagimaniac',
  phone: '+918237742096',
  kaggle: 'imagimaniac',
};

export const socialMedia = [
  {
    id: 1,
    img: "assets/git.svg",
    link: `https://github.com/${personalInfo.github}`,
  },
  {
    id: 2,
    img: "assets/linkedin.svg",
    link: `https://www.linkedin.com/in/${personalInfo.linkedin}/`,
  },
];

export const socialLinks = [
  {
    name: "GitHub",
    icon: "Github",
    href: `https://github.com/${personalInfo.github}`,
    color: "hover:text-gray-400"
  },
  {
    name: "LinkedIn",
    icon: "Linkedin",
    href: `https://linkedin.com/in/${personalInfo.linkedin}`,
    color: "hover:text-blue-500"
  },
  {
    name: "Kaggle",
    icon: "BarChart3",
    href: `https://www.kaggle.com/${personalInfo.kaggle}`,
    color: "hover:text-cyan-400"
  },
  {
    name: "Email",
    icon: "Mail",
    href: `mailto:${personalInfo.email}`,
    color: "hover:text-red-400"
  }
];
