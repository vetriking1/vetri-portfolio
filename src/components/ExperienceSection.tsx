import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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

  return (
    <section
      id="experience"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            <span className="gradient-text-full">My Experience</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            A journey through innovation, growth, and impactful projects
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Animated Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2"
          />

          <div className="space-y-16 md:space-y-24">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100, y: 50 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.8 + index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="relative"
                >
                  {/* Branch Line - Desktop Only */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "50%" } : {}}
                    transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                    className={`hidden md:block absolute top-8 h-0.5 bg-gradient-to-r ${
                      isLeft
                        ? "left-0 right-1/2 from-transparent via-primary/50 to-primary"
                        : "left-1/2 right-0 from-primary to-transparent via-primary/50"
                    }`}
                  />

                  <div className={`flex ${isLeft ? "md:justify-start" : "md:justify-end"}`}>
                    {/* Timeline Dot with Pulse Animation */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                      className="absolute left-8 md:left-1/2 top-6 transform md:-translate-x-1/2 z-20"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                        className={`w-6 h-6 rounded-full bg-gradient-to-br ${exp.color} ring-4 ring-background shadow-lg`}
                      >
                        <motion.div
                          animate={{
                            scale: [0, 2, 0],
                            opacity: [0.5, 0, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                          className={`absolute inset-0 rounded-full bg-gradient-to-br ${exp.color}`}
                        />
                      </motion.div>
                    </motion.div>

                    {/* Content Card */}
                    <div className={`w-full md:w-[calc(50%-3rem)] ml-20 md:ml-0`}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/20"
                      >
                        {/* Animated Gradient Background */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 0.15 }}
                          transition={{ duration: 0.3 }}
                          className={`absolute inset-0 bg-gradient-to-br ${exp.color} rounded-2xl`}
                        />

                        {/* Glowing Border Effect */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />

                        {/* Icon with Animation */}
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="relative mb-4"
                        >
                          <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${exp.color} shadow-lg`}>
                            <Briefcase className="w-6 h-6 text-background" />
                          </div>
                        </motion.div>

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

                        {/* Achievements with Stagger Animation */}
                        <ul className="relative space-y-3">
                          {exp.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={isInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: 1.4 + index * 0.2 + i * 0.1 }}
                              className="flex items-start gap-3 group/item"
                            >
                              <motion.span
                                whileHover={{ scale: 1.5, rotate: 90 }}
                                className="text-primary mt-1 text-lg"
                              >
                                ▹
                              </motion.span>
                              <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
                                {achievement}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
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
