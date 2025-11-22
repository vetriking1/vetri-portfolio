import { motion } from "framer-motion";
import { Brain, Cpu, Database, Network, Zap, Code2 } from "lucide-react";

const FloatingElements = () => {
  const icons = [
    { Icon: Brain, delay: 0, duration: 8 },
    { Icon: Cpu, delay: 1, duration: 10 },
    { Icon: Database, delay: 2, duration: 12 },
    { Icon: Network, delay: 0.5, duration: 9 },
    { Icon: Zap, delay: 1.5, duration: 11 },
    { Icon: Code2, delay: 2.5, duration: 7 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {icons.map(({ Icon, delay, duration }, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [
              null,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            x: [
              null,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            opacity: [0, 0.1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: delay,
            ease: "linear",
          }}
        >
          <Icon
            className="w-12 h-12 md:w-16 md:h-16"
            style={{
              stroke: `hsl(${180 + index * 30} 91% 60%)`,
              strokeWidth: 1,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
