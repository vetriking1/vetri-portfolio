import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useMemo } from "react";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    role: "BE Computer Science Engineering",
    company: "DMI College of Engineering",
    period: "2022 - Present",
    description: "Pursuing Bachelor of Engineering in Computer Science with focus on AI, Machine Learning, and Full-Stack Development. Active participant in technical events and competitions.",
    achievements: [
      "CGPA: 8.2",
      "Winner in Programming Contest (2023)",
      "Winner in Technical Quiz (2024)"
    ],
    color: "from-primary to-secondary"
  },
  {
    role: "State-Level Codeathon 2023",
    company: "Prathyusha Engineering College",
    period: "2023",
    description: "Developed Traffic Management System using computer vision and deep learning for vehicle detection, tracking, and counting with multi-threading support.",
    achievements: [
      "Secured 3rd Place",
      "Built CV-based traffic monitoring system",
      "Implemented YOLO for real-time detection"
    ],
    color: "from-accent to-tertiary"
  },
  {
    role: "Design Fest",
    company: "DMI College of Engineering",
    period: "2024",
    description: "Competed in design-focused competition showcasing creative and technical design skills.",
    achievements: [
      "Secured 3rd Place",
      "Demonstrated design expertise",
      "Presented innovative solutions"
    ],
    color: "from-primary to-accent"
  },
  {
    role: "Design Spark Challenge",
    company: "School of Design Thinking Intellect (IT Company)",
    period: "2024",
    description: "Participated in intensive 2-day hackathon focused on design thinking and innovative problem-solving approaches.",
    achievements: [
      "Completed 2-day hackathon",
      "Applied design thinking principles",
      "Collaborated with cross-functional teams"
    ],
    color: "from-tertiary to-primary"
  },
    {
    role: "Internship - Application Development & Automation",
    company: "Idea Shop, Salem",
    period: "August - September 2025",
    description: "Worked on application development and automation projects, gaining hands-on experience in software development lifecycle and automation tools.",
    achievements: [
      "Developed automation solutions",
      "Collaborated with development team",
      "Implemented application features"
    ],
    color: "from-secondary to-accent"
  }
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  // Memoize animation variants to prevent recreation
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }), []);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Static Background Elements - No animation on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text-full">My Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A journey through innovation, growth, and impactful projects
          </p>
        </motion.div>

        <div className="relative">
          {/* Static Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className="relative"
                >
                  {/* Static Branch Line - Desktop Only */}
                  <div className={`hidden md:block absolute top-8 h-0.5 bg-gradient-to-r ${
                    isLeft
                      ? "left-0 right-1/2 from-transparent via-primary/50 to-primary"
                      : "left-1/2 right-0 from-primary to-transparent via-primary/50"
                  }`} />

                  <div className={`flex ${isLeft ? "md:justify-start" : "md:justify-end"}`}>
                    {/* Static Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 top-6 transform md:-translate-x-1/2 z-20">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${exp.color} ring-4 ring-background shadow-lg`} />
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-[calc(50%-3rem)] ml-20 md:ml-0`}>
                      <div className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors duration-200 shadow-lg">
                        {/* Static Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-200`} />

                        {/* Icon */}
                        <div className="relative mb-4">
                          <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${exp.color} shadow-lg`}>
                            <Briefcase className="w-6 h-6 text-background" />
                          </div>
                        </div>

                        {/* Role & Company */}
                        <h3 className="relative text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:gradient-text transition-all">
                          {exp.role}
                        </h3>
                        <div className="relative flex items-center gap-2 text-muted-foreground mb-4">
                          <span className="font-semibold text-primary">{exp.company}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.period}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="relative text-muted-foreground mb-6 leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Achievements */}
                        <ul className="relative space-y-3">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3"
                            >
                              <span className="text-primary mt-1 text-lg">▹</span>
                              <span className="text-sm text-muted-foreground">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
