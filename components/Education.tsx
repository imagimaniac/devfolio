"use client";

import React, { useState } from "react";
import { education } from "@/data";
import Reveal from "./ui/Reveal";
import Image from "next/image";
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

const Education = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section id="education" className="w-full py-20">
      <div className="container mx-auto px-4">
        <Reveal>
          <h3 className="mb-8 text-center text-3xl sm:text-4xl md:text-5xl font-semibold">
            Where I{" "}
            <span className="bg-gradient-to-r from-circuitGreen to-electricBlue bg-clip-text text-transparent">
              sharpened
            </span>
            {"'"}the blade.
          </h3>
        </Reveal>

        {/* Education Cards - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Background */}
              <div className="absolute inset-0 -z-10">
                <Image
                  src="https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif"
                  alt="Background"
                  className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/60" />
              </div>

              {/* Card Content */}
              <div className="relative p-6">
                {/* Header: Logo + Institution + Date + Info Button */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    {edu.institutionLogo && (
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-white/20 flex-shrink-0">
                        <Image
                          src={edu.institutionLogo}
                          alt={edu.institution}
                          className="object-contain p-1 bg-white/10"
                          fill
                          sizes="56px"
                          unoptimized
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="text-lg font-bold text-white">
                        {edu.institution}
                      </h4>
                      <p className="text-sm text-electricBlue font-medium">
                        {edu.degree}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  </div>
                  <InfoButton
                    onClick={() => toggleExpand(edu.id)}
                    isOpen={expandedId === edu.id}
                  />
                </div>

                {/* Collapsed Content - Always Visible */}
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-circuitGreen" />
                  <span>{edu.location}</span>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedId === edu.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-white/10 space-y-4"
                    >
                      {/* Description */}
                      {edu.description && edu.description.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-300">{edu.description[0]}</p>
                        </div>
                      )}

                      {/* Relevant Courses */}
                      {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                        <div>
                          <h5 className="text-xs font-semibold text-electricBlue mb-2 uppercase tracking-wider">
                            Key Courses
                          </h5>
                          <div className="flex flex-wrap gap-1.5">
                            {edu.relevantCourses.map((course, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Achievements */}
                      {edu.achievements && edu.achievements.length > 0 && (
                        <div>
                          <h5 className="text-xs font-semibold text-circuitGreen mb-2 uppercase tracking-wider">
                            Achievements
                          </h5>
                          <ul className="space-y-1">
                            {edu.achievements.map((achievement, idx) => (
                              <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                                <span className="text-circuitGreen mt-1">▸</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
