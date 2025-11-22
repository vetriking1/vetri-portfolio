import { useState, useEffect } from "react";

export interface ViewportSize {
  width: number;
  height: number;
}

/**
 * Hook that caches viewport dimensions and updates only on resize events
 * @returns Object with width and height properties
 */
export function useViewportSize(): ViewportSize {
  const [viewportSize, setViewportSize] = useState<ViewportSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let timeoutId: NodeJS.Timeout;

    // Debounced resize handler (150ms delay)
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setViewportSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewportSize;
}
