"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X } from "lucide-react";

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ className, children }) => (
  <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mx-auto", className)}>
    {children}
  </div>
);

interface BentoGridItemProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  keywords?: string[];
  link?: string;
  github?: string;
  img?: string;
  techs?: string[];
  status?: "in-progress" | "private";
  highlight?: string;
  objective?: string;
  action?: string;
  result?: string;
}

export const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className,
  title,
  description,
  keywords = [],
  link,
  github,
  img,
  techs,
  status,
  highlight,
  objective,
  action,
  result,
}) => {
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className={cn("relative overflow-hidden rounded-xl border border-white/10 group/bento hover:border-white/20 hover:shadow-xl transition duration-200 bg-black/30 backdrop-blur-sm", className)}>
        {mounted && img && !imgError && (
          <div className="absolute inset-0">
            <Image
              src={img}
              alt={`Background for ${title}`}
              className="object-cover object-center opacity-10 group-hover/bento:opacity-20 transition-opacity duration-300"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={false}
              unoptimized
              onError={() => setImgError(true)}
            />
          </div>
        )}
        
        <div className="relative px-4 py-3">
          {/* Header: title + badges */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold">
                {link ? (
                  <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-electricBlue transition-colors duration-200">
                    {title}
                  </a>
                ) : (
                  title
                )}
              </h2>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {status === "in-progress" && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-yellow-300 border border-yellow-500/30 bg-yellow-500/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                  WIP
                </span>
              )}
              {status === "private" && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-gray-400 border border-gray-600/30 bg-gray-600/10">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 16 16"><path d="M4 4v2h-.25A1.75 1.75 0 002 7.75v5.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-5.5A1.75 1.75 0 0012.25 6H12V4a4 4 0 10-8 0zm6.5 2V4a2.5 2.5 0 00-5 0v2h5zM12.25 7.5a.25.25 0 01.25.25v5.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-5.5a.25.25 0 01.25-.25h8.5z" /></svg>
                  Private
                </span>
              )}
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="View on GitHub">
                  <div className="relative w-4 h-4">
                    <Image src="/assets/git.svg" alt="GitHub" fill sizes="16px" priority={false} />
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Highlight stat */}
          {highlight && (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-circuitGreen border border-circuitGreen/30 bg-circuitGreen/10 mt-2">
              {highlight}
            </div>
          )}

          {/* Keywords - visible on card */}
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:border-electricBlue/50 hover:text-electricBlue transition-colors cursor-default"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}

          {/* Tech tags */}
          {techs && techs.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap mt-3">
              {techs.map((tech) => (
                <span key={tech} className="text-[10px] text-gray-300 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Eye button to open modal */}
          <div className="flex items-start justify-end mt-4">
            <button
              onClick={() => setShowModal(true)}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-electricBlue hover:text-electricBlue transition-all duration-300"
              aria-label="View project details"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-electricBlue/30 bg-black/95 backdrop-blur-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-red-500 hover:text-red-500 transition-all duration-300 z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Title */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {title}
                  </h2>
                  {status && (
                    <span className={cn(
                      "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium",
                      status === "in-progress" 
                        ? "text-yellow-300 border border-yellow-500/30 bg-yellow-500/10"
                        : "text-gray-400 border border-gray-600/30 bg-gray-600/10"
                    )}>
                      {status === "in-progress" && <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />}
                      {status === "private" && <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16"><path d="M4 4v2h-.25A1.75 1.75 0 002 7.75v5.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-5.5A1.75 1.75 0 0012.25 6H12V4a4 4 0 10-8 0zm6.5 2V4a2.5 2.5 0 00-5 0v2h5z" /></svg>}
                      {status === "in-progress" ? "Work in Progress" : "Private Project"}
                    </span>
                  )}
                </div>

                {/* Description */}
                {description && (
                  <p className="text-gray-300 leading-relaxed">
                    {description}
                  </p>
                )}

                {/* OAR Sections */}
                <div className="space-y-6 pt-4 border-t border-white/10">
                  {/* Objective */}
                  {objective && (
                    <div>
                      <h3 className="text-lg font-semibold text-electricBlue mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-electricBlue" />
                        Objective
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                        {objective}
                      </p>
                    </div>
                  )}

                  {/* Action */}
                  {action && (
                    <div>
                      <h3 className="text-lg font-semibold text-circuitGreen mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-circuitGreen" />
                        Action
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                        {action}
                      </p>
                    </div>
                  )}

                  {/* Result */}
                  {result && (
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-400" />
                        Result
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                        {result}
                      </p>
                    </div>
                  )}
                </div>

                {/* Keywords and Techs */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300"
                    >
                      {keyword}
                    </span>
                  ))}
                  {techs?.map((tech) => (
                    <span key={tech} className="text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
