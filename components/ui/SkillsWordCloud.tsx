"use client";

import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { skills } from "@/data/tech-stack";

// Predefined layout positions to create an organic word-cloud feel
// Each skill gets a slight rotation and specific color from the palette
const tierConfig = {
  1: { sizeClass: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl", fontWeight: "font-extrabold" },
  2: { sizeClass: "text-xl sm:text-2xl md:text-3xl", fontWeight: "font-bold" },
  3: { sizeClass: "text-base sm:text-lg md:text-xl", fontWeight: "font-semibold" },
  4: { sizeClass: "text-sm sm:text-base md:text-lg", fontWeight: "font-medium" },
};

const colorPalette = [
  "text-electricBlue",
  "text-circuitGreen",
  "text-electricBlue-light",
  "text-brushedAluminum-light",
  "text-white",
  "text-cyan-300",
  "text-emerald-400",
  "text-teal-300",
];

// Subtle rotations for organic feel
const rotations = [-6, -3, -2, 0, 0, 0, 2, 3, 5];

const SkillsWordCloud = memo(() => {
  // Shuffle skills deterministically for visual variety but keep tier ordering prominent
  const arranged = useMemo(() => {
    // Place tier 1 items centrally, then tier 2, then 3 & 4 around edges
    const t1 = skills.filter(s => s.tier === 1);
    const t2 = skills.filter(s => s.tier === 2);
    const t3 = skills.filter(s => s.tier === 3);
    const t4 = skills.filter(s => s.tier === 4);
    // Interleave: t3-item, t1-item, t4-item, t2-item pattern for visual spread
    const result = [];
    const maxLen = Math.max(t1.length, t2.length, t3.length, t4.length);
    for (let i = 0; i < maxLen; i++) {
      if (t3[i]) result.push(t3[i]);
      if (t1[i]) result.push(t1[i]);
      if (t4[i]) result.push(t4[i]);
      if (t2[i]) result.push(t2[i]);
    }
    return result;
  }, []);

  return (
    <div className="relative w-full">
      <h4 className="text-3xl md:text-4xl font-bold mb-8">
        <span className="text-[#00ff66]">Skills</span>
      </h4>
      
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 md:gap-x-6 md:gap-y-4 py-4">
        {arranged.map((skill, index) => {
          const config = tierConfig[skill.tier];
          const color = colorPalette[index % colorPalette.length];
          const rotation = rotations[index % rotations.length];
          
          return (
            <motion.span
              key={skill.name}
              className={`
                ${config.sizeClass} ${config.fontWeight} ${color}
                cursor-default select-none transition-all duration-300
                hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(0,255,255,0.6)]
                inline-block whitespace-nowrap
              `}
              style={{ transform: `rotate(${rotation}deg)` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.15,
                rotate: 0,
                transition: { duration: 0.2 }
              }}
            >
              {skill.name}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
});

SkillsWordCloud.displayName = 'SkillsWordCloud';

export default SkillsWordCloud;
