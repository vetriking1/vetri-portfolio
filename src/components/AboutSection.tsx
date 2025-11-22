import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import profileImage from "@/assets/profile.png";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [displayedText, setDisplayedText] = useState("");
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  
  const paragraphs = [
    "Hello! I'm Vetri Selvan M, a Computer Science student with a deep passion for Artificial Intelligence, Software Development, and Research. I love exploring technology and turning complex ideas into beautifully crafted, functional systems.",
    "Over the years, I've worked across multiple domains, including AI, Machine Learning, Deep Learning, AI Agents, and Full-Stack Development. I believe the future belongs to people who learn to grow alongside AI—leveraging it as a companion to expand their skills, creativity, and knowledge.",
    "My dream is to combine teaching, research, exploration, and innovation to create work that truly matters. I'm inspired by industry leaders like Geoffrey Hinton, the \"Godfather of AI,\" and Andrej Karpathy, who both blend vision with practical impact.",
    "Outside of tech, I enjoy anime, gaming, human psychology, and exploring how things work. At my core, curiosity drives everything I do."
  ];

  // Typewriter effect
  useEffect(() => {
    if (!isInView) return;
    
    const fullText = paragraphs.join("\n\n");
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 10);
    
    return () => clearInterval(interval);
  }, [isInView]);

  // Counter animation for projects
  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = 35;
    const duration = 2000;
    const increment = end / (duration / 50);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setProjectCount(end);
        clearInterval(timer);
      } else {
        setProjectCount(Math.floor(start));
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text-full">About Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl blur-3xl opacity-30"></div>
              
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Accent */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-secondary to-accent rounded-full blur-2xl opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              ></motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              <span className="gradient-text-full">Growing with AI to build technology that truly matters</span>
            </h3>
            
            <div className="text-lg text-muted-foreground leading-relaxed min-h-[400px] whitespace-pre-line">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block ml-1"
              >
                |
              </motion.span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <motion.div 
                className="text-center p-4 rounded-lg bg-card border border-primary/20 cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px hsl(150 91% 60% / 0.4)",
                  borderColor: "hsl(150 91% 60% / 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="text-3xl font-bold gradient-text"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
                >
                  {projectCount}+
                </motion.div>
                <div className="text-sm text-muted-foreground mt-2">Projects Completed</div>
              </motion.div>
              <motion.div 
                className="text-center p-4 rounded-lg bg-card border border-secondary/20 cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px hsl(120 91% 65% / 0.4)",
                  borderColor: "hsl(120 91% 65% / 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="text-3xl font-bold gradient-text"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
                >
                  CS
                </motion.div>
                <div className="text-sm text-muted-foreground mt-2">Student</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
