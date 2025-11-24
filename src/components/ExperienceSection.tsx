import { memo, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      const card = cardRef.current;
      const dot = card?.querySelector(".timeline-dot");
      const branch = card?.querySelector(".branch-line");
      const content = card?.querySelector(".experience-content");

      // Animate timeline dot
      gsap.from(dot, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(2)",
      });

      // Animate branch line
      if (branch) {
        gsap.from(branch, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          scaleX: 0,
          transformOrigin: isLeft ? "right center" : "left center",
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
        });
      }

      // Animate content card
      gsap.from(content, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, [isLeft]);

  return (
    <div ref={cardRef} className="relative experience-item">
      {/* Branch Line - Desktop Only */}
      <div
        className={`branch-line hidden md:block absolute top-8 h-0.5 bg-gradient-to-r ${
          isLeft
            ? "left-0 right-1/2 from-transparent via-primary/50 to-primary"
            : "left-1/2 right-0 from-primary to-transparent via-primary/50"
        }`}
      />

      <div className={`flex ${isLeft ? "md:justify-start" : "md:justify-end"}`}>
        {/* Timeline Dot */}
        <div className="timeline-dot absolute left-8 md:left-1/2 top-6 transform md:-translate-x-1/2 z-20">
          <div
            className={`w-6 h-6 rounded-full bg-gradient-to-br ${exp.color} ring-4 ring-background shadow-lg`}
          />
        </div>

        {/* Content Card */}
        <div className={`w-full md:w-[calc(50%-3rem)] ml-16 sm:ml-20 md:ml-0`}>
          <div className="experience-content p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors duration-200 shadow-lg">
            {/* Icon */}
            <div className="mb-3 sm:mb-4">
              <div
                className={`inline-flex p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br ${exp.color} shadow-lg`}
              >
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
                <li key={i} className="flex items-start gap-2 sm:gap-3">
                  <span className="text-primary mt-0.5 sm:mt-1 text-base sm:text-lg">
                    ▹
                  </span>
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
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate timeline line
      gsap.from(timelineRef.current, {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.2,
        ease: "power2.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 px-3 sm:px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 px-2 sm:px-0">
        <div ref={headerRef} className="text-center mb-12 sm:mb-16 md:mb-20">
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
          <div
            ref={timelineRef}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2"
          />

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
