"use client";

import React, { useState } from "react";
import { experience } from "@/data";
import Reveal from "./ui/Reveal";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Experience = () => {
  const [expandedKeywords, setExpandedKeywords] = useState<Record<number, string[]>>({});

  const toggleKeyword = (itemId: number, keywordTitle: string) => {
    setExpandedKeywords(prev => {
      const current = prev[itemId] || [];
      if (current.includes(keywordTitle)) {
        return { ...prev, [itemId]: current.filter(k => k !== keywordTitle) };
      }
      return { ...prev, [itemId]: [...current, keywordTitle] };
    });
  };

  return (
    <section id="experience" className="w-full py-20">
      <div className="container mx-auto px-4">
        <Reveal>
          <h3 className="mb-8 text-center text-3xl sm:text-4xl md:text-5xl font-semibold">
            Where I{" "}
            <span className="bg-gradient-to-r from-circuitGreen to-electricBlue bg-clip-text text-transparent">
              moved
            </span>
            {"'"}the needle.
          </h3>
        </Reveal>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-electricBlue via-circuitGreen to-electricBlue h-full transform md:-translate-x-px" />

          {experience.map((item, index) => (
            <div key={item.id} className="mb-16 relative">
              {/* Timeline dot */}
              <motion.div
                className={`absolute left-0 md:left-1/2 w-5 h-5 rounded-full border-2 ${index === 0 ? 'border-electricBlue' : 'border-circuitGreen'} bg-black transform -translate-x-1/2 z-10 ${index === 0 ? 'shadow-glow' : ''}`}
                initial={{ scale: 0.8, opacity: 0.5 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`absolute inset-0 m-auto w-2 h-2 rounded-full ${index === 0 ? 'bg-electricBlue' : 'bg-circuitGreen'}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                />
                {index === 0 && (
                  <motion.div
                    className="absolute -inset-1 rounded-full border border-electricBlue opacity-50"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </motion.div>

              {/* Content */}
              <div className="ml-8 md:ml-0 md:grid md:grid-cols-2 md:gap-8 relative">
                {/* Left side: Company, Title, Date */}
                <div className={`md:text-right mb-4 md:mb-0 md:pr-12 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <div className="inline-block md:block">
                    <span className="text-electricBlue font-mono text-sm">
                      {item.startDate} - {item.endDate}
                    </span>
                    <h4 className="text-xl font-semibold text-white mt-1">
                      {item.title}
                    </h4>
                    {item.companyLogo && (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-12 h-12 rounded-md overflow-hidden border border-white/20 hover:border-electricBlue/50 transition-all duration-300 mt-2"
                      >
                        <div className="relative w-full h-full bg-white/10">
                          <Image
                            src={item.companyLogo}
                            alt={item.company}
                            className="object-contain p-1"
                            fill
                            sizes="48px"
                            unoptimized
                          />
                        </div>
                      </a>
                    )}
                    <h5 className="text-lg font-medium text-electricBlue mt-2">
                      {item.company}
                    </h5>
                    <p className="text-sm text-gray-400">{item.location}</p>
                  </div>
                </div>

                {/* Right side: Keyword chips + tech tags */}
                <motion.div
                  className={`relative overflow-hidden rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm group ${index % 2 !== 0 ? 'md:order-1' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="absolute inset-0 -z-10">
                    <Image
                      src="https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif"
                      alt="Background"
                      className="object-cover opacity-15"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  </div>

                  <div className="relative p-4 space-y-3">
                    {/* Keyword chips - each expandable */}
                    <div className="flex flex-wrap gap-2">
                      {item.description.map((desc, idx) => {
                        const isExpanded = expandedKeywords[item.id]?.includes(desc.title);
                        return (
                          <div key={idx} className="w-full">
                            <button
                              onClick={() => toggleKeyword(item.id, desc.title)}
                              className={cn(
                                "w-full text-left px-3 py-2 rounded-lg border transition-all duration-200 flex items-center justify-between gap-2",
                                isExpanded
                                  ? "bg-electricBlue/20 border-electricBlue text-electricBlue"
                                  : "bg-black/50 border-white/10 text-gray-300 hover:border-white/30 hover:text-white"
                              )}
                            >
                              <span className="text-sm font-medium">{desc.title}</span>
                              <span className="text-xs opacity-60">
                                {isExpanded ? "▾" : "▸"}
                              </span>
                            </button>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="mt-1 pl-3 py-2"
                                >
                                  <p className="text-xs text-gray-400 leading-relaxed">
                                    {desc.detail}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>

                    {/* Tech tags */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="pt-3 border-t border-white/10">
                        <div className="flex flex-wrap gap-1.5">
                          {item.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-black/50 text-electricBlue border border-electricBlue/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
