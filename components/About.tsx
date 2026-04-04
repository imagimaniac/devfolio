import React, { memo, useState } from "react";
import Image from "next/image";
import Reveal from "./ui/Reveal";
import SkillsWordCloud from "./ui/SkillsWordCloud";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const InfoButton = ({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold transition-all duration-300",
      isOpen
        ? "bg-electricBlue border-electricBlue text-black"
        : "bg-black/50 border-white/20 text-white/60 hover:border-electricBlue hover:text-electricBlue"
    )}
    aria-label={isOpen ? "Show less" : "Show more"}
  >
    {isOpen ? "✕" : "i"}
  </button>
);

const About = memo(() => {
  const [showFullBio, setShowFullBio] = useState(false);

  const shortBio = "6+ years turning data into decisions across 5 industries.";
  
  const fullBio = [
    "Versatile analytics professional with 6+ years of experience spanning strategy analytics, data science, and business intelligence \u2014 with a deep understanding of predictive modelling, experiment design, and data-driven decision-making.",
    "Adept at rapidly assimilating complex datasets, drawing actionable conclusions, and confidently presenting insights to both technical and non-technical audiences across industries.",
    "As a curious and analytical thinker, I approach every problem by asking better questions first. My focus is on building models and systems that don\u2019t just explain the past but shape the future \u2014 from churn prediction to cost optimization to capacity planning."
  ];

  return (
    <section id="about" className="py-20 w-full space-y-10">
      <Reveal>
        <h3 className="mb-10">
          About{' '}
          <span className="bg-gradient-to-r from-circuitGreen to-electricBlue bg-clip-text text-transparent">
            me.
          </span>
        </h3>
      </Reveal>
      
      <div className="flex flex-col gap-6">
        {/* About Me Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur-sm p-8 flex flex-col min-h-[200px]">
          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col">
            <div className="flex flex-col items-center gap-4">
              <p className="text-white font-medium text-xl md:text-2xl leading-relaxed text-center">
                {shortBio}
              </p>
              <InfoButton onClick={() => setShowFullBio(!showFullBio)} isOpen={showFullBio} />
            </div>

            <AnimatePresence>
              {showFullBio && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-white/10 space-y-4"
                >
                  {fullBio.map((paragraph, idx) => (
                    <p key={idx} className="text-white font-medium text-sm leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Skills Word Cloud Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur-sm p-8">
          <div className="relative z-10">
            <SkillsWordCloud />
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
