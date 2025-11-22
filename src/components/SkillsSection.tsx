import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Database,
  Brain,
  BarChart3,
  Terminal,
  Wrench,
} from "lucide-react";

interface SkillCategory {
  icon: any;
  title: string;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    icon: Code2,
    title: "Full-Stack",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Vercel",
      "Supabase",
      "FastAPI",
      "SQL",
      "Flask",
    ],
    color: "from-primary to-secondary",
  },
  {
    icon: Brain,
    title: "AI",
    skills: [
      "Sklearn",
      "TensorFlow",
      "PyTorch",
      "Ollama",
      "XGBoost",
      "Langchain",
      "CrewAI",
      "Prompt Engineering",
      "Vector DB",
    ],
    color: "from-secondary to-accent",
  },
  {
    icon: BarChart3,
    title: "Data Science",
    skills: [
      "Power BI",
      "Jupyter Notebook",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
    ],
    color: "from-accent to-tertiary",
  },
  {
    icon: Wrench,
    title: "Development Tools",
    skills: ["VS Code", "Git", "GitHub", "Docker"],
    color: "from-tertiary to-primary",
  },
  {
    icon: Terminal,
    title: "Languages",
    skills: [
      "Python (Intermediate)",
      "JavaScript/TypeScript (Intermediate)",
      "Java (Beginner)",
      "C (Beginner)",
      "Rust (Basics)",
    ],
    color: "from-primary to-accent",
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text-full">Skills & Expertise</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, AI-powered applications
          </p>
        </motion.div>

        <div className="space-y-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
                className="group"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`relative w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} p-2.5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
                    ></div>
                    <Icon className="w-full h-full text-background relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground group-hover:gradient-text transition-all">
                    {category.title}
                  </h3>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: categoryIndex * 0.15 + skillIndex * 0.05,
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="group/skill"
                    >
                      <div className="relative h-full px-4 py-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-primary/10">
                        {/* Gradient Background on Hover */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover/skill:opacity-10 transition-opacity duration-300`}
                        ></div>

                        {/* Skill Name */}
                        <p className="relative text-sm font-medium text-foreground text-center group-hover/skill:gradient-text transition-all">
                          {skill}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
