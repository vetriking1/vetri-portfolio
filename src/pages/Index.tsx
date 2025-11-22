import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
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
          <ThemeToggle />
          <CustomCursor />
          <FloatingElements />
          
          <main className="relative">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <footer className="relative border-t border-border py-8">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-muted-foreground">
                © 2024 AI Portfolio. Crafted with{" "}
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
