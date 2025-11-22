import { useState, useEffect } from "react";

/**
 * Hook that detects if the device has touch capability
 * @returns boolean indicating if device supports touch
 */
export function useTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    // Check if running in browser environment
    if (typeof window === "undefined") {
      return;
    }

    // Check for touch capability using multiple methods
    const hasTouchStart = "ontouchstart" in window;
    const hasTouchPoints = navigator.maxTouchPoints > 0;
    
    setIsTouchDevice(hasTouchStart || hasTouchPoints);
  }, []);

  return isTouchDevice;
}
