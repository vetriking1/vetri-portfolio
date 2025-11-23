import { useState, useEffect } from 'react';

interface UseCounterOptions {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
}

export const useCounter = ({ end, start = 0, duration = 2000, delay = 0 }: UseCounterOptions) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const range = end - start;

      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuad = (t: number) => t * (2 - t);
        const currentCount = Math.floor(start + range * easeOutQuad(progress));
        
        setCount(currentCount);

        if (progress === 1) {
          clearInterval(timer);
          setCount(end);
        }
      }, 16); // ~60fps

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [end, start, duration, delay]);

  return count;
};
