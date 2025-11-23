import { ChevronDown } from "lucide-react";
import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { useViewportSize } from "@/hooks/use-viewport-size";
import { usePerformanceMonitor } from "@/hooks/use-performance-monitor";

// Lazy load Spline component with delay for better initial load
// On mobile, delay longer to prioritize content loading
const Spline = lazy(() => 
  new Promise<{ default: React.ComponentType<any> }>((resolve) => {
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
    const delay = isMobileDevice ? 2000 : 1000; // 2s delay on mobile, 1s on desktop
    
    setTimeout(() => {
      import('@splinetool/react-spline').then((module) => {
        resolve({ default: module.default });
      });
    }, delay);
  })
);

const HeroSection = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [disableSpline, setDisableSpline] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const { width } = useViewportSize();
  const { isLagging } = usePerformanceMonitor(25); // Disable if FPS < 25
  
  const words = [
    "Developer",
    "Explorer",
    "Creator",
    "Learner",
    "Problem Solver"
  ];

  // Determine if mobile viewport (check both viewport and initial window width)
  const isMobile = width < 768 || (typeof window !== 'undefined' && window.innerWidth < 768);

  // Disable Spline if performance is lagging on mobile
  useEffect(() => {
    if (isMobile && isLagging && splineLoaded) {
      console.log('Performance lag detected on mobile, disabling Spline');
      setDisableSpline(true);
    }
  }, [isMobile, isLagging, splineLoaded]);

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

  // Load Spline viewer for light mode with cleanup
  useEffect(() => {
    if (theme === "light" && viewerRef.current) {
      // Clean up previous viewer if exists
      const existingViewer = viewerRef.current.querySelector("spline-viewer");
      if (existingViewer) {
        existingViewer.remove();
      }

      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@splinetool/viewer@1.12.0/build/spline-viewer.js";
      
      script.onload = () => {
        if (viewerRef.current) {
          const viewer = document.createElement("spline-viewer");
          viewer.setAttribute("url", "https://prod.spline.design/cw7gf1jzocndEWD4/scene.splinecode");
          viewer.addEventListener('load', () => setSplineLoaded(true));
          viewerRef.current.appendChild(viewer);
        }
      };

      document.head.appendChild(script);

      return () => {
        script.remove();
        if (viewerRef.current) {
          const viewer = viewerRef.current.querySelector("spline-viewer");
          if (viewer) {
            viewer.remove();
          }
        }
      };
    } else if (theme === "dark") {
      // Trigger loaded state for dark mode after a short delay
      const timer = setTimeout(() => setSplineLoaded(true), 1000);
      return () => clearTimeout(timer);
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
      {theme === "dark" && !disableSpline && (
        <Suspense fallback={
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-pulse" />
        }>
          <div className={`absolute inset-0 z-0 ${isMobile ? 'scale-[2] opacity-40' : 'scale-150 md:scale-125'}`}>
            <Spline
              scene="https://prod.spline.design/y5Eh9MVOHocUBg3N/scene.splinecode"
              className="w-full h-full"
              onLoad={() => setSplineLoaded(true)}
            />
          </div>
        </Suspense>
      )}

      {/* Spline 3D Background - Light Mode */}
      {theme === "light" && !disableSpline && (
        <div 
          ref={viewerRef}
          className={`absolute inset-0 z-0 ${isMobile ? 'scale-[1.5] opacity-30' : 'scale-110 opacity-60'}`}
        />
      )}

      {/* Fallback gradient background when Spline is disabled */}
      {disableSpline && (
        <>
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 animate-pulse" />
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          </div>
        </>
      )}

      {/* Gradient Overlay for better text readability */}
      <div className={`absolute inset-0 z-10 ${
        theme === "light" 
          ? "bg-gradient-to-b from-background/60 via-background/40 to-background" 
          : "bg-gradient-to-b from-background/70 via-background/50 to-background"
      }`}></div>

      {/* Content */}
      <div className="relative z-20 text-center px-3 sm:px-4 max-w-5xl mx-auto animate-fade-in">
        <div>
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mb-2">
              Hi, I'm
            </h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold gradient-text-full mb-4 leading-tight">
              Vetri Selvan M
            </h1>
          </div>

          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 min-h-[60px] sm:min-h-[80px] md:min-h-[100px]">
            <span className="text-foreground">
              I'm a{" "}
              <span className="gradient-text-full">
                {displayText}
                <span className="inline-block ml-1 animate-pulse">|</span>
              </span>
            </span>
          </div>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto px-2">
            Exploring the future with cutting-edge AI technology and Curiosity
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <a
              href="/VSResume.pdf"
              download="Vetri_Selvan_M_Resume.pdf"
              className={`group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-full font-semibold text-sm sm:text-base md:text-lg overflow-hidden transition-all w-full sm:w-auto text-center ${
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
              className={`px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all w-full sm:w-auto text-center ${
                theme === "light"
                  ? "hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30"
                  : "hover:bg-primary/10"
              }`}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce-slow"
      >
        <ChevronDown className="w-8 h-8 text-primary" />
      </button>
    </section>
  );
};

export default HeroSection;
