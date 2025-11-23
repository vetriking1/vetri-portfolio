import { useRef, useEffect, useState } from "react";
import profileImage from "@/assets/profile.png";
import { useTypewriter } from "@/hooks/use-typewriter";
import { useCounter } from "@/hooks/use-counter";

const AboutSection = () => {
  const ref = useRef(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  
  const fullText = `Hello! I'm Vetri Selvan M, a Computer Science student with a deep passion for Artificial Intelligence, Software Development, and Research. I love exploring technology and turning complex ideas into beautifully crafted, functional systems.

Over the years, I've worked across multiple domains, including AI, Machine Learning, Deep Learning, AI Agents, and Full-Stack Development. I believe the future belongs to people who learn to grow alongside AI—leveraging it as a companion to expand their skills, creativity, and knowledge.

My dream is to combine teaching, research, exploration, and innovation to create work that truly matters. I'm inspired by industry leaders like Geoffrey Hinton, the "Godfather of AI," and Andrej Karpathy, who both blend vision with practical impact.

Outside of tech, I enjoy anime, gaming, human psychology, and exploring how things work. At my core, curiosity drives everything I do.`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  const { displayedText } = useTypewriter({
    text: inView ? fullText : '',
    speed: 20,
    delay: 300,
  });

  const projectCount = useCounter({
    end: 35,
    start: 0,
    duration: 2000,
    delay: inView ? 500 : 0,
  });

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 px-3 sm:px-4"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-0">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text-full">About Me</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl blur-3xl opacity-30"></div>
              
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6" ref={textRef}>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              <span className="gradient-text-full">Growing with AI to build technology that truly matters</span>
            </h3>
            
            <div className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line min-h-[400px]">
              {displayedText}
              {displayedText.length < fullText.length && (
                <span className="animate-pulse">|</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6">
              <div className="text-center p-3 sm:p-4 rounded-lg bg-card border border-primary/20 hover:border-primary/50 transition-colors">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">
                  {inView ? projectCount : 0}+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">Projects Completed</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg bg-card border border-secondary/20 hover:border-secondary/50 transition-colors">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">
                  CS
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">Student</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
