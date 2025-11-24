import { useRef, useState, useMemo, useCallback, memo, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import { useLazyImage } from "@/hooks/use-lazy-image";

type Category = "All" | "AI & CV" | "Full-Stack" | "AI & NLP" | "ML & Data Science" | "Games" | "Systems" | "Specialized";

interface Project {
  title: string;
  description: string;
  tags: string[];
  categories: Category[];
  image?: string;
  gradient: string;
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    title: "Face Find — Facial Recognition Search",
    description: "AI-powered facial recognition application that enables users to search and identify faces from image databases using computer vision algorithms.",
    tags: ["Python", "OpenCV", "dlib", "Deep Learning", "Flask", "Cloudinary"],
    categories: ["AI & CV"],
    image: "/projects-imgs/FaceFind.png",
    gradient: "from-primary to-secondary",
    githubUrl: "https://github.com/vetriking1/FaceFind",
  },
  {
    title: "Dog Classifier",
    description: "Web-based dog breed classification application using deep learning. Users upload dog images and receive breed predictions with confidence scores.",
    tags: ["Python", "TensorFlow", "Keras", "Flask", "CNN"],
    categories: ["AI & CV", "ML & Data Science"],
    image: "/projects-imgs/Dog_classifier.png",
    gradient: "from-secondary to-accent",
    githubUrl: "https://github.com/vetriking1/Dog-Classifier",
  },
  {
    title: "Digit Classifier",
    description: "Handwritten digit recognition system trained on MNIST dataset achieving high accuracy with web interface for real-time prediction.",
    tags: ["Python", "PyTorch", "CNN", "Flask"],
    categories: ["AI & CV", "ML & Data Science"],
    image: "/projects-imgs/digit_classification.png",
    gradient: "from-accent to-tertiary",
    githubUrl: "https://github.com/vetriking1/Handwritten-Digit-Prediction",
  },
  {
    title: "Hand-Controlled Games",
    description: "Interactive gaming system using hand gesture recognition to control Dino Game, Car Race, and Jump Game with real-time hand tracking.",
    tags: ["Python", "OpenCV", "YOLO", "Mediapipe", "PyAutoGUI"],
    categories: ["AI & CV", "Games"],
    image: "/projects-imgs/game_controlled_hand.png",
    gradient: "from-tertiary to-primary",
    githubUrl: "https://github.com/vetriking1/Game-Controlled-Hand",
  },
  {
    title: "Traffic Management System",
    description: "Computer vision-based traffic monitoring system featuring vehicle detection, tracking, and counting using deep learning with multi-threading.",
    tags: ["Python", "OpenCV", "YOLO", "Multi-threading"],
    categories: ["AI & CV", "Specialized"],
    image: "/projects-imgs/traffic_managment_system.png",
    gradient: "from-primary to-accent",
    githubUrl: "https://github.com/vetriking1/Trafic_managment_system",
  },
  {
    title: "Hand Shortcuts Control",
    description: "Gesture-controlled system enabling users to open websites, adjust system volume, and control screen brightness using hand gestures.",
    tags: ["Python", "OpenCV", "Mediapipe", "PyAutoGUI"],
    categories: ["AI & CV", "Specialized"],
    image: "/projects-imgs/shortcut_hand.png",
    gradient: "from-secondary to-tertiary",
    githubUrl: "https://github.com/vetriking1/Hand-Shortcut",
  },
  {
    title: "Library Web System",
    description: "Comprehensive library management web application with user authentication, book cataloging, borrowing/returning functionality, and admin dashboard.",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "JWT"],
    categories: ["Full-Stack"],
    image: "/projects-imgs/library.png",
    gradient: "from-primary to-secondary",
    githubUrl: "https://github.com/vetriking1/Library-Managment",
  },
  {
    title: "Hospital Management System",
    description: "Full-featured hospital management system handling patient records, appointment scheduling, doctor management, and billing with role-based access.",
    tags: ["MERN Stack", "Redux", "JWT", "Bootstrap"],
    categories: ["Full-Stack"],
    image: "/projects-imgs/hospital_managment.png",
    gradient: "from-accent to-primary",
    githubUrl: "https://github.com/vetriking1/hosplital",
  },
  {
    title: "Sustainable Packaging Solutions",
    description: "Enterprise-level web application for managing sustainable packaging supply chains, inventory tracking, order management, and analytics.",
    tags: ["MERN Stack", "Redux", "Chart.js", "Material-UI"],
    categories: ["Full-Stack"],
    image: "/projects-imgs/sustaiable_packaging.png",
    gradient: "from-secondary to-accent",
    githubUrl: "https://github.com/vetriking1/codeathon3.0",
  },
  {
    title: "easy task - Task Management",
    description: "Production-grade task management application deployed in a company with 15 employees. Features real-time collaboration and team analytics.",
    tags: ["React", "Supabase", "PostgreSQL", "TypeScript", "Tailwind"],
    categories: ["Full-Stack"],
    image: "/projects-imgs/easytask.png",
    gradient: "from-tertiary to-secondary",
  },
  {
    title: "Mark Report Generator",
    description: "Automated student mark report generation system for educational institutions with grade calculation and report card generation.",
    tags: ["React", "Supabase", "PostgreSQL", "TypeScript", "PDF"],
    categories: ["Full-Stack"],
    image: "/projects-imgs/student_report_generator.png",
    gradient: "from-primary to-tertiary",
    githubUrl: "https://github.com/vetriking1/MarkReport",
  },
  {
    title: "Thirukkural Generator",
    description: "Tamil text generation model trained on Thirukkural corpus to generate meaningful Tamil couplets using deep learning.",
    tags: ["Python", "TensorFlow", "LSTM", "NLP"],
    categories: ["AI & NLP"],
    image: "/projects-imgs/thirukural_writer.png",
    gradient: "from-accent to-secondary",
    githubUrl: "https://huggingface.co/spaces/VetriSelvan18/Thirukural",
  },
  {
    title: "SQL Agent",
    description: "AI-powered SQL query assistant using NLP to generate SQL queries from plain English with local AI models and Langchain.",
    tags: ["Python", "Langchain", "Ollama", "PostgreSQL", "NLP"],
    categories: ["AI & NLP"],
    image: "/projects-imgs/sql_agent (2).png",
    gradient: "from-secondary to-primary",
    githubUrl: "https://github.com/vetriking1/SQLAgent",
  },
  {
    title: "React + Langchain MCP Chatbot",
    description: "Modern conversational AI chatbot with model context protocol integration, featuring real-time responses and context awareness.",
    tags: ["React", "TypeScript", "Langchain", "MCP", "WebSocket"],
    categories: ["AI & NLP", "Full-Stack"],
    image: "/projects-imgs/mcp_chat_agent.png",
    gradient: "from-tertiary to-accent",
    githubUrl: "https://github.com/vetriking1/MCPChatBot",
  },
  {
    title: "AI MCQ Quiz App",
    description: "AI-generated multiple-choice quiz application built using Vibe coding approach with automatic question generation and scoring.",
    tags: ["React", "Next.js", "TypeScript", "Generative AI", "Tailwind"],
    categories: ["AI & NLP", "Full-Stack"],
    image: "/projects-imgs/quizapp.png",
    gradient: "from-primary to-secondary",
    githubUrl: "https://github.com/vetriking1/Ai-Quiz-App",
    liveUrl: "https://mcqiuz.netlify.app/",
  },
  {
    title: "Kaggle Titanic Prediction",
    description: "Machine learning classification model predicting passenger survival on the Titanic with data preprocessing and feature engineering.",
    tags: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
    categories: ["ML & Data Science"],
    gradient: "from-secondary to-tertiary",
    githubUrl: "https://github.com/vetriking1/TitanicKaggleCompetition",
  },
  {
    title: "Kaggle House Price Prediction",
    description: "Regression model predicting house prices with extensive data cleaning, feature engineering, and ensemble model techniques.",
    tags: ["Python", "Pandas", "XGBoost", "Scikit-learn"],
    categories: ["ML & Data Science"],
    gradient: "from-accent to-primary",
    githubUrl: "https://github.com/vetriking1/HousePricePrediction",
  },
  {
    title: "Supermarket Data EDA",
    description: "Comprehensive exploratory data analysis of supermarket sales data with interactive dashboards and business intelligence visualizations.",
    tags: ["Python", "Pandas", "Matplotlib", "Seaborn", "Power BI"],
    categories: ["ML & Data Science"],
    image: "/projects-imgs/supermarket_eda.png",
    gradient: "from-tertiary to-secondary",
    githubUrl: "https://github.com/vetriking1/SuperMarket-EDA",
  },
  {
    title: "Pong Game with AI",
    description: "Classic Pong game enhanced with AI opponent using reinforcement learning algorithms with multiple difficulty levels.",
    tags: ["Python", "Pygame", "PyTorch", "Q-Learning", "DQN"],
    categories: ["Games", "AI & CV"],
    image: "/projects-imgs/pong_game.png",
    gradient: "from-primary to-accent",
    githubUrl: "https://github.com/vetriking1/PongGame",
  },
  {
    title: "Reaction Time Game",
    description: "Interactive web-based game testing user reaction times with visual stimuli, leaderboards, and statistics tracking.",
    tags: ["HTML", "CSS", "JavaScript", "React"],
    categories: ["Games"],
    image: "/projects-imgs/reaction_time.png",
    gradient: "from-secondary to-primary",
    githubUrl: "https://github.com/vetriking1/reactionTIme",
    liveUrl: "https://vetriking1.github.io/reactionTIme/",
  },
  {
    title: "ToDo List (Rust CLI)",
    description: "Command-line todo list application built with Rust featuring task management, prioritization, and persistent storage.",
    tags: ["Rust", "Serde", "Clap", "CLI"],
    categories: ["Systems"],
    image: "/projects-imgs/cli_rust_todo.png",
    gradient: "from-accent to-tertiary",
    githubUrl: "https://github.com/vetriking1/TODOrust",
  },
  {
    title: "Prime Number Generator [CUDA]",
    description: "High-performance prime number generation using GPU acceleration. Benchmarked across multiple languages for 1 billion numbers.",
    tags: ["CUDA", "Python", "C", "C++", "Rust", "Go"],
    categories: ["Systems"],
    gradient: "from-tertiary to-primary",
    githubUrl: "https://github.com/vetriking1/Prime-Gen",
  },
  {
    title: "Programming Language Speed Test",
    description: "Performance benchmarking tool comparing execution speeds of counting operations (1 to 1 billion) across 18 programming languages.",
    tags: ["Python", "Java", "C", "C++", "Rust", "Go", "JavaScript"],
    categories: ["Systems"],
    image: "/projects-imgs/speed_test_languages.png",
    gradient: "from-primary to-secondary",
    githubUrl: "https://github.com/vetriking1/Speed_comparison",
  },
  {
    title: "Julia/Mandelbrot Set Visualization",
    description: "Interactive visualization tool for generating and exploring Julia and Mandelbrot fractal sets with zoom and color customization.",
    tags: ["Python", "Numba", "Streamlit", "Julia", "NumPy"],
    categories: ["Specialized"],
    image: "/projects-imgs/julia_set.jpeg",
    gradient: "from-secondary to-accent",
    githubUrl: "]https://github.com/vetriking1/juliaset-web-app",
  },
  {
    title: "Phishing Tool",
    description: "Educational cybersecurity tool demonstrating phishing attack vectors and social engineering techniques for security awareness training.",
    tags: ["Python", "Flask", "HTML", "CSS", "JavaScript"],
    categories: ["Specialized"],
    image: "/projects-imgs/fishing_tool.png",
    gradient: "from-accent to-primary",
    githubUrl: "https://github.com/vetriking1/phishing-tool",
  },
  {
    title: "Android Number Format Converter",
    description: "Mobile application for converting text and numbers between various formats including Binary, Octal, Hexadecimal, and custom base systems.",
    tags: ["Java", "Android SDK", "XML", "Android Studio"],
    categories: ["Specialized"],
    image: "/projects-imgs/androidapp.jpg",
    gradient: "from-tertiary to-secondary",
  },
];

const categories: Category[] = ["All", "AI & CV", "Full-Stack", "AI & NLP", "ML & Data Science", "Games", "Systems", "Specialized"];

// Memoized project card component with lazy image loading
const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
  const { imgRef, imageSrc, isLoaded } = useLazyImage(project.image || "");
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`group relative transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="relative h-full p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors duration-200 shadow-lg">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-200 pointer-events-none`} />

        {/* Project Image */}
        <div
          ref={imgRef}
          className={`relative w-full h-40 rounded-lg mb-4 overflow-hidden ${
            project.image ? "bg-muted" : `bg-gradient-to-br ${project.gradient}`
          }`}
        >
          {project.image ? (
            <>
              {!isLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
              {imageSrc && (
                <img 
                  src={imageSrc} 
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <div className="text-4xl font-bold text-foreground/20">
                {project.title.charAt(0)}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-foreground mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground border border-border"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground border border-border">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 relative z-10">
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <ExternalLink className="w-3 h-3" />
              <span>View</span>
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-border hover:border-primary hover:bg-primary/10 hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <Github className="w-3 h-3" />
              <span>Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

const ProjectsSection = () => {
  const ref = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const filteredProjects = useMemo(() => 
    selectedCategory === "All" 
      ? projects 
      : projects.filter(project => project.categories.includes(selectedCategory)),
    [selectedCategory]
  );

  const handleCategoryChange = useCallback((category: Category) => {
    setSelectedCategory(category);
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 px-3 sm:px-4"
    >
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-0">
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-700 ease-out ${
          isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text-full">Featured Projects</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            26 innovative projects across AI, Full-Stack, ML, and more
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-4 transition-all duration-700 ease-out delay-100 ${
          isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 sm:px-4 md:px-5 py-2.5 sm:py-2.5 rounded-full text-sm sm:text-sm font-medium transition-all duration-200 whitespace-nowrap touch-manipulation ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-lg scale-105"
                  : "bg-card border-2 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground active:scale-95"
              }`}
            >
              {category}
              <span className="ml-2 text-xs opacity-70">
                ({category === "All" ? projects.length : projects.filter(p => p.categories.includes(category)).length})
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No projects found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(ProjectsSection);
