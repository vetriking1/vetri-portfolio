import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  fps: number;
  isLagging: boolean;
}

/**
 * Hook to monitor performance and detect lag
 * Returns true if FPS drops below threshold
 */
export function usePerformanceMonitor(threshold: number = 30): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    isLagging: false,
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      // Calculate FPS every second
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        const isLagging = fps < threshold;
        
        setMetrics({ fps, isLagging });
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationFrameId = requestAnimationFrame(measureFPS);
    };

    // Start monitoring after a delay to let page settle
    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(measureFPS);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [threshold]);

  return metrics;
}
