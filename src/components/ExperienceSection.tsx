import { memo } from "react";
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

// Memoized experience card component
const ExperienceCard = memo(({ exp, index }: { exp: typeof experiences[0]; index: number }) => {
  const isLeft = index % 2 === 0;
  
  return (
    <div className="relative">
      {/* Branch Line - Desktop Only */}
      <div className={`hidden md:block absolute top-8 h-0.5 bg-gradient-to-r ${
        isLeft
          ? "left-0 right-1/2 from-transparent via-primary/50 to-primary"
          : "left-1/2 right-0 from-primary to-transparent via-primary/50"
      }`} />

      <div className={`flex ${isLeft ? "md:justify-start" : "md:justify-end"}`}>
        {/* Timeline Dot */}
        <div className="absolute left-8 md:left-1/2 top-6 transform md:-translate-x-1/2 z-20">
          <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${exp.color} ring-4 ring-background shadow-lg`} />
        </div>

        {/* Content Card */}
        <div className={`w-full md:w-[calc(50%-3rem)] ml-16 sm:ml-20 md:ml-0`}>
          <div className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors duration-200 shadow-lg">
            {/* Icon */}
            <div className="mb-3 sm:mb-4">
              <div className={`inline-flex p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br ${exp.color} shadow-lg`}>
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-background" />
              </div>
            </div>

            {/* Role & Company */}
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3 leading-tight">
              {exp.role}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
              <span className="font-semibold text-primary">{exp.company}</span>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">{exp.period}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              {exp.description}
            </p>

            {/* Achievements */}
            <ul className="space-y-2 sm:space-y-3">
              {exp.achievements.map((achievement, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 sm:gap-3"
                >
                  <span className="text-primary mt-0.5 sm:mt-1 text-base sm:text-lg">▹</span>
                  <span className="text-xs sm:text-sm text-muted-foreground leading-snug">
                    {achievement}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

ExperienceCard.displayName = "ExperienceCard";

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 px-3 sm:px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 px-2 sm:px-0">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text-full">My Experience</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            A journey through innovation, growth, and impactful projects
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ExperienceSection);
