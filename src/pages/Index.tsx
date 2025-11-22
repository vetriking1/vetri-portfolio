import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import FloatingElements from "@/components/FloatingElements";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Preload fonts
    document.fonts.ready.then(() => {
      console.log("Fonts loaded");
    });
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen
            onLoadingComplete={() => setLoading(false)}
          />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <Navigation />
          <ThemeToggle />
          <CustomCursor />
          <FloatingElements />
          
          <main className="relative">
            <section id="home">
              <HeroSection />
            </section>
            <section id="about">
              <AboutSection />
            </section>
            <section id="skills">
              <SkillsSection />
            </section>
            <section id="experience">
              <ExperienceSection />
            </section>
            <section id="projects">
              <ProjectsSection />
            </section>
            <section id="contact">
              <ContactSection />
            </section>
          </main>

          {/* Footer */}
          <footer className="relative border-t border-border py-8">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-muted-foreground">
                © 2025 Vetri Selvan M. Crafted with{" "}
                <span className="gradient-text">passion</span> and{" "}
                <span className="gradient-text">code</span>
              </p>
            </div>
          </footer>
        </>
      )}
    </> 
  );
};

export default Index;
