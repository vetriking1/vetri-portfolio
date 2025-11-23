import {
  Code2,
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
  return (
    <section
      id="skills"
      className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 px-3 sm:px-4"
    >
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-0">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text-full">Skills & Expertise</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            A comprehensive toolkit for building modern, AI-powered applications
          </p>
        </div>

        <div className="space-y-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div key={categoryIndex}>
                {/* Category Header */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${category.color} p-2 sm:p-2.5 flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-full h-full text-background" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg bg-card border border-border hover:border-primary/50 transition-colors duration-200 shadow-sm"
                    >
                      <p className="text-xs sm:text-sm font-medium text-foreground text-center leading-tight">
                        {skill}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
