import Button from "./Button";
import Reveal from "./ui/Reveal";
import { Spotlight } from "./ui/Spotlight";
import { useState, useEffect, useCallback, memo } from "react";
import { identities, professionalDescription } from "../data/personal";

const Hero = memo(() => {
  const [currentIdentityIndex, setCurrentIdentityIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const cycleIdentity = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIdentityIndex((prevIndex) => (prevIndex + 1) % identities.length);
      setTimeout(() => {
        setIsAnimating(false);
      }, 200);
    }, 500);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(cycleIdentity, 2000);
    return () => clearInterval(intervalId);
  }, [cycleIdentity]);

  return (
    <div className="pb-20 pt-36 relative">
      {/* Background Grid */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-small-steelGray-dark/[0.2] z-0"></div>

      {/* Spotlights */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="steelGray"
        />
        <Spotlight
          className="h-[100vh] w-[50vw] top-10 left-full"
          fill="electricBlue"
        />
        <Spotlight
          className="left-80 top-28 h-[100vh] w-[50vw]"
          fill="circuitGreen"
        />
      </div>

      {/* Content Area */}
      <div className="relative text-center my-8 md:my-10 mx-auto max-w-[1000px] justify-center flex flex-col z-10">
        <Reveal>
          <h1 className="text-center text-4xl md:text-5xl lg:text-7xl font-extrabold">
            Hey, {''}
            <span className="bg-gradient-to-r from-electricBlue-light via-electricBlue to-circuitGreen bg-clip-text text-transparent">
              Pratik Gajanan
            </span>
            {' '}here.
          </h1>
        </Reveal>
        {/* Rotating identity */}
        <div className="my-5 flex flex-col items-center">
          <h2 className="title text-2xl md:text-3xl lg:text-4xl font-semibold text-brushedAluminum-light text-center">
            I&apos;m a
          </h2>
          <h2 className="title text-2xl md:text-3xl lg:text-4xl font-semibold text-center h-16 flex items-center justify-center">
            <span 
              className={`inline-block transition-all duration-500 ${
                isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
              } text-white px-3`}
            >
              {identities[currentIdentityIndex]}
            </span>
          </h2>
        </div>
        {/* Description */}
        <div className="max-w-[850px] mx-auto text-base md:text-lg lg:text-xl text-white-100 mt-4 space-y-4">
          <p className="leading-relaxed">
            {professionalDescription.paragraph1}
          </p>
          <p className="leading-relaxed font-medium text-electricBlue">
            {professionalDescription.paragraph2}
          </p>
        </div>
      </div>
    </div>
  );
});

Hero.displayName = 'Hero';

export default Hero;
