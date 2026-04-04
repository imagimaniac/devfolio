"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { skills, softSkills } from "@/data/tech-stack";

// Random sizes - reduced by 50%
const sizeClasses = [
  "text-lg sm:text-xl md:text-2xl lg:text-3xl",
  "text-base sm:text-lg md:text-xl lg:text-2xl",
  "text-sm sm:text-base md:text-lg lg:text-xl",
  "text-xs sm:text-sm md:text-base lg:text-lg",
  "text-xs sm:text-xs md:text-sm lg:text-base",
];

const fontWeights = [
  "font-extrabold",
  "font-bold", 
  "font-semibold",
  "font-medium",
];

// Technical skills colors - mixed palette
const techColorPalette = [
  "text-electricBlue",
  "text-circuitGreen",
  "text-cyan-300",
  "text-emerald-400",
  "text-teal-300",
  "text-white",
];

// Soft skills colors - warm palette  
const softColorPalette = [
  "text-amber-400",
  "text-orange-400",
  "text-amber-300",
  "text-orange-300",
  "text-yellow-400",
];

// Seeded random based on skill name
function getRandomIndex(name: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) % max;
}

// Truly interleave skills - alternate between technical and soft
function interleaveSkills() {
  const tech = skills.map(s => ({ ...s, category: "technical" as const }));
  const soft = softSkills.map(s => ({ ...s, category: "soft" as const }));
  
  // Shuffle each category first
  const shuffledTech = [...tech].sort(() => Math.random() - 0.5);
  const shuffledSoft = [...soft].sort(() => Math.random() - 0.5);
  
  // Interleave: take from tech and soft alternately
  const result = [];
  const maxLen = Math.max(shuffledTech.length, shuffledSoft.length);
  
  for (let i = 0; i < maxLen; i++) {
    if (i < shuffledTech.length) result.push(shuffledTech[i]);
    if (i < shuffledSoft.length) result.push(shuffledSoft[i]);
  }
  
  return result;
}

const SkillsWordCloud = memo(() => {
  // Get interleaved skills
  const interleavedSkills = interleaveSkills();

  return (
    <div className="relative w-full">
      <h4 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        <span className="text-[#00ff66]">Skills</span>
      </h4>
      
      {/* Single mixed word cloud - truly interleaved colors */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:gap-x-4 md:gap-y-3 py-6 px-4 w-full max-w-4xl mx-auto">
        {interleavedSkills.map((skill, index) => {
          const sizeIndex = getRandomIndex(skill.name, sizeClasses.length);
          const weightIndex = getRandomIndex(skill.name + "weight", fontWeights.length);
          const isSoft = skill.category === "soft";
          const colorIndex = getRandomIndex(skill.name + "color", isSoft ? softColorPalette.length : techColorPalette.length);
          const color = isSoft 
            ? softColorPalette[colorIndex]
            : techColorPalette[colorIndex];
          
          return (
            <motion.span
              key={`${skill.category}-${skill.name}`}
              className={`
                ${sizeClasses[sizeIndex]} ${fontWeights[weightIndex]} ${color}
                cursor-default select-none transition-all duration-300
                ${isSoft 
                  ? "hover:drop-shadow-[0_0_10px_rgba(255,193,7,0.6)]" 
                  : "hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.6)]"
                }
                inline-block whitespace-nowrap
              `}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.015 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              {skill.name}
            </motion.span>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-circuitGreen"></span>
          <span className="text-white/70">Technical</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-400"></span>
          <span className="text-white/70">Soft Skills</span>
        </div>
      </div>
    </div>
  );
});

SkillsWordCloud.displayName = 'SkillsWordCloud';

export default SkillsWordCloud;