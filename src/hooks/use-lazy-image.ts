import { useEffect, useRef, useState } from 'react';

export const useLazyImage = (src: string) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!src || !imgRef.current) return;

    // Create observer only once
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && src) {
              setImageSrc(src);
              // Disconnect after loading starts
              if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
              }
            }
          });
        },
        {
          rootMargin: '100px', // Start loading 100px before entering viewport
          threshold: 0.01,
        }
      );
    }

    const currentRef = imgRef.current;
    if (currentRef && observerRef.current) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [src]);

  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(true); // Still mark as loaded to prevent infinite loading state
  }, [imageSrc]);

  return { imgRef, imageSrc, isLoaded };
};
