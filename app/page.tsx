"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NavBar from "@/components/ui/NavBar";
import BackgroundPatterns from "@/components/ui/BackgroundPatterns";
import { motion } from "framer-motion";
import { useZenMode } from "@/lib/ZenModeContext";

const Home = () => {
  const { zenMode } = useZenMode();

  return (
    <main className={`min-h-screen relative bg-black overflow-x-hidden ${zenMode ? 'zen-mode' : ''}`}>
      <BackgroundPatterns />

      <div className="relative z-10">
        <NavBar />
        <div className={`w-full max-w-7xl mx-auto ${zenMode ? 'hide-content' : ''}`}>
          <div className="px-5 sm:px-10 md:px-20 lg:px-40">
            <Hero />
            <About />
            <Education />
            <Experience />
            <Projects />
            <Contact />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Home;
