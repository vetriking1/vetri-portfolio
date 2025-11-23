import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState("Initializing...");

  useEffect(() => {
    let splineLoaded = false;
    let fontsLoaded = false;
    let runtimeLoaded = false;
    
    // Detect current theme
    const isLight = document.documentElement.classList.contains("light");
    const splineUrl = isLight 
      ? "https://prod.spline.design/cw7gf1jzocndEWD4/scene.splinecode"
      : "https://prod.spline.design/y5Eh9MVOHocUBg3N/scene.splinecode";

    // Preload Spline runtime for light mode
    if (isLight) {
      setLoadingStatus("Loading 3D Runtime...");
      const runtimeScript = document.createElement("script");
      runtimeScript.type = "module";
      runtimeScript.src = "https://unpkg.com/@splinetool/viewer@1.12.0/build/spline-viewer.js";
      runtimeScript.onload = () => {
        runtimeLoaded = true;
        setProgress((prev) => Math.max(prev, 40));
      };
      runtimeScript.onerror = () => {
        runtimeLoaded = true; // Continue anyway
      };
      document.head.appendChild(runtimeScript);
    } else {
      runtimeLoaded = true; // Dark mode uses React component
    }

    // Preload Spline model
    setLoadingStatus("Loading 3D Models...");
    const preloadSpline = async () => {
      try {
        const response = await fetch(splineUrl);
        if (response.ok) {
          await response.blob();
          splineLoaded = true;
          setLoadingStatus("3D Models Loaded");
          setProgress((prev) => Math.max(prev, 70));
        }
      } catch (error) {
        console.warn("Spline preload failed, will load on demand:", error);
        splineLoaded = true; // Continue anyway
      }
    };

    // Preload fonts
    setLoadingStatus("Loading Fonts...");
    document.fonts.ready.then(() => {
      fontsLoaded = true;
      setLoadingStatus("Ready to Launch");
      setProgress((prev) => Math.max(prev, 90));
    });

    preloadSpline();

    // Progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        
        // Speed up progress once all resources are loaded
        if (splineLoaded && fontsLoaded && runtimeLoaded && prev < 95) {
          return prev + 8;
        }
        
        // Normal progress
        return prev + 1.5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative mx-auto w-32 h-32"
        >
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary via-secondary to-accent blur-xl opacity-50"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text-full">
            Entering Black Hole
          </h1>
          <p className="text-muted-foreground text-lg">
            {loadingStatus}
          </p>
          
          <div className="w-64 mx-auto h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <p className="text-sm text-muted-foreground font-mono">{progress}%</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
