import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTouchDevice } from "@/hooks/use-touch-device";

const CustomCursor = () => {
  // Task 2.1: Add conditional rendering for touch devices
  const isTouchDevice = useTouchDevice();
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Use ref to track RAF and avoid unnecessary re-renders
  const rafRef = useRef<number>();

  useEffect(() => {
    // Skip event listeners on touch devices
    if (isTouchDevice) {
      return;
    }

    // Task 2.2: Use requestAnimationFrame for smooth 60fps updates
    const updateMousePosition = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button");
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouchDevice]);

  // Task 2.1: Return null if touch device (after all hooks)
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Outer circle - follows with smooth animation */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-primary pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 28,
          mass: 0.5,
        }}
      />
      {/* Inner dot - follows instantly */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
          mass: 0.1,
        }}
      />
    </>
  );
};

export default CustomCursor;
