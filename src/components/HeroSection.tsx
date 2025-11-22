import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Spline from '@splinetool/react-spline';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const viewerRef = useRef<HTMLDivElement>(null);
  
  const words = [
    "Developer",
    "Explorer",
    "Creator",
    "Learner",
    "Problem Solver"
  ];

  // Theme detection
  useEffect(() => {
    const checkTheme = () => {
      const isLight = document.documentElement.classList.contains("light");
      setTheme(isLight ? "light" : "dark");
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Load Spline viewer for light mode
  useEffect(() => {
    if (theme === "light" && viewerRef.current && !viewerRef.current.querySelector("spline-viewer")) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@splinetool/viewer@1.12.0/build/spline-viewer.js";
      document.head.appendChild(script);

      const viewer = document.createElement("spline-viewer");
      viewer.setAttribute("url", "https://prod.spline.design/cw7gf1jzocndEWD4/scene.splinecode");
      viewerRef.current.appendChild(viewer);

      return () => {
        script.remove();
      };
    }
  }, [theme]);

  // Typewriter effect with multiple words
  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    if (!isDeleting && currentIndex < currentWord.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + currentWord[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentIndex === currentWord.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        setCurrentIndex(prev => prev - 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentIndex === 0) {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }
  }, [currentIndex, isDeleting, currentWordIndex]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spline 3D Background - Dark Mode */}
      {theme === "dark" && (
        <div className="absolute inset-0 z-0 scale-150 md:scale-125">
          <Spline
            scene="https://prod.spline.design/y5Eh9MVOHocUBg3N/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      )}

      {/* Spline 3D Background - Light Mode */}
      {theme === "light" && (
        <div 
          ref={viewerRef}
          className="absolute inset-0 z-0 scale-110"
          style={{ opacity: 0.6 }}
        />
      )}

      {/* Gradient Overlay for better text readability */}
      <div className={`absolute inset-0 z-10 ${
        theme === "light" 
          ? "bg-gradient-to-b from-background/60 via-background/40 to-background" 
          : "bg-gradient-to-b from-background/70 via-background/50 to-background"
      }`}></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-2xl md:text-4xl font-semibold text-primary mb-2">
              Hi, I'm
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text-full mb-4">
              Vetri Selvan M
            </h1>
          </motion.div>

          <motion.div
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 min-h-[80px] md:min-h-[100px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="text-foreground">
              I'm a{" "}
              <span className="gradient-text-full">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block ml-1"
                >
                  |
                </motion.span>
              </span>
            </span>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Exploring the future with cutting-edge AI technology and Curiosity
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              href="/VSResume.pdf"
              download="Vetri_Selvan_M_Resume.pdf"
              className={`group relative px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-full font-semibold text-lg overflow-hidden transition-all ${
                theme === "light" 
                  ? "hover:shadow-xl hover:shadow-primary/30 text-white" 
                  : "hover:shadow-lg hover:shadow-primary/50"
              }`}
            >
              <span className="relative z-10">Download My CV</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
            
            <a
              href="#contact"
              className={`px-8 py-4 border-2 border-primary rounded-full font-semibold text-lg transition-all ${
                theme === "light"
                  ? "hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30"
                  : "hover:bg-primary/10"
              }`}
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-primary" />
      </motion.button>
    </section>
  );
};

export default HeroSection;
