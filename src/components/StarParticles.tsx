import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeDirection: number;
  twinkleSpeed: number;
  color: string;
}

const StarParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Color palette matching your dark theme
    const colors = [
      "rgba(52, 211, 153, ", // Emerald (primary)
      "rgba(74, 222, 128, ", // Neon Green (secondary)
      "rgba(163, 230, 53, ", // Lime (accent)
      "rgba(45, 212, 191, ", // Teal (tertiary)
      "rgba(255, 255, 255, ", // White for variety
    ];

    // Create particles
    const createParticle = (): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5, // 0.5 to 2.5px
        speedX: (Math.random() - 0.5) * 0.3, // Slow drift
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.3, // 0.3 to 0.8
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
        twinkleSpeed: Math.random() * 0.02 + 0.005, // 0.005 to 0.025
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    // Initialize particles (fewer for better performance)
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    particlesRef.current = Array.from({ length: particleCount }, createParticle);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Twinkle effect
        particle.opacity += particle.fadeDirection * particle.twinkleSpeed;
        if (particle.opacity <= 0.1 || particle.opacity >= 0.9) {
          particle.fadeDirection *= -1;
        }

        // Draw particle with glow
        ctx.save();
        
        // Outer glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        gradient.addColorStop(0, `${particle.color}${particle.opacity})`);
        gradient.addColorStop(1, `${particle.color}0)`);
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core star
        ctx.beginPath();
        ctx.fillStyle = `${particle.color}${Math.min(particle.opacity + 0.2, 1)})`;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Sparkle effect (cross shape)
        if (particle.opacity > 0.6) {
          ctx.strokeStyle = `${particle.color}${particle.opacity * 0.8})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x - particle.size * 2, particle.y);
          ctx.lineTo(particle.x + particle.size * 2, particle.y);
          ctx.moveTo(particle.x, particle.y - particle.size * 2);
          ctx.lineTo(particle.x, particle.y + particle.size * 2);
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        mixBlendMode: "screen",
      }}
    />
  );
};

export default StarParticles;
