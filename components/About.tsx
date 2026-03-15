import React, { memo } from "react";
import Image from "next/image";
import Reveal from "./ui/Reveal";
import SkillsWordCloud from "./ui/SkillsWordCloud";

const About = memo(() => (
  <section id="about" className="py-20 w-full space-y-10">
    <Reveal>
      <h3 className="mb-10">
        About{' '}
        <span className="bg-gradient-to-r from-circuitGreen to-electricBlue bg-clip-text text-transparent">
          me.
        </span>
      </h3>
    </Reveal>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* About Me Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur-sm p-8 flex flex-col">
        {/* Background GIF */}
        <div className="absolute inset-0 -z-10">
          <div className="relative w-full h-full">
            <Image 
              src="https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif" 
              alt="Background animation"
              className="object-cover opacity-30"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
              loading="lazy"
              unoptimized={true}
            />
          </div>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Content */}
        <div className="space-y-6">
          <p className="text-white font-medium">
            Versatile analytics professional with 6+ years of experience spanning strategy analytics, data science, and business intelligence &mdash; with a deep understanding of predictive modelling, experiment design, and data-driven decision-making.
          </p>
          <p className="text-white font-medium">
            Adept at rapidly assimilating complex datasets, drawing actionable conclusions, and confidently presenting insights to both technical and non-technical audiences across industries.
          </p>
          <p className="text-white font-medium">
            As a curious and analytical thinker, I approach every problem by asking better questions first. My focus is on building models and systems that don&apos;t just explain the past but shape the future &mdash; from churn prediction to cost optimization to capacity planning.
          </p>
        </div>
      </div>
      
      {/* Skills Word Cloud Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur-sm p-8">
        {/* Background GIF */}
        <div className="absolute inset-0 -z-10">
          <div className="relative w-full h-full">
            <Image 
              src="https://i.pinimg.com/originals/84/f6/d1/84f6d14f1f88d34d3956150d19060d3a.gif" 
              alt="Background animation"
              className="object-cover opacity-30"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
              unoptimized={true}
            />
          </div>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Word Cloud */}
        <div className="relative z-10">
          <SkillsWordCloud />
        </div>
      </div>
    </div>
  </section>
));

About.displayName = 'About';

export default About;
