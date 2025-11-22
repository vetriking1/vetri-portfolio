# AI Portfolio Website

A modern, interactive portfolio website showcasing AI, full-stack development, and data science projects. Built with React, TypeScript, and cutting-edge web technologies featuring smooth animations, 3D elements, and a responsive design.

## Features

- **Interactive 3D Elements** - Spline 3D graphics and animations
- **Smooth Animations** - Framer Motion and GSAP powered transitions
- **Dark/Light Theme** - Theme switching with next-themes
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI Components** - Built with Radix UI and shadcn/ui
- **Performance Optimized** - Fast loading with Vite and React SWC

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **GSAP** - Professional-grade animations

### UI Components
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Beautiful, customizable components
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### 3D Graphics
- **Spline** - Interactive 3D design tool integration

### State Management & Routing
- **React Router DOM** - Client-side routing
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling with validation

## Project Structure

```
├── public/
│   ├── projects-imgs/     # Project screenshots
│   ├── profile.png        # Profile image
│   └── favicon.ico
├── src/
│   ├── components/        # React components
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── ContactSection.tsx
│   ├── pages/            # Page components
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── About.md              # About content
├── Skills.md             # Skills documentation
├── Expirience.md         # Experience details
└── Completed Projects Portfolio.md  # Project descriptions

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies
```bash
npm install
# or
bun install
```

3. Start development server
```bash
npm run dev
# or
bun dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤖 LLM Optimization

This portfolio is optimized for AI/LLM accessibility! When ChatGPT, Claude, or other LLMs visit your site, they can read your full portfolio.

### Quick Links:
- **Quick Start:** See `QUICK-START.md` for deployment
- **Full Guide:** See `LLM-OPTIMIZATION.md` for technical details
- **Summary:** See `SOLUTION-SUMMARY.md` for overview

### Key Features:
- ✅ `/llm.txt` - Human-readable portfolio for LLMs
- ✅ `/api.json` - Machine-readable structured data
- ✅ `<noscript>` fallback with full content
- ✅ JSON-LD structured data (Schema.org)
- ✅ Optimized for AI crawlers (GPTBot, Claude-Web, etc.)

### Test After Deploy:
```bash
node test-llm-access.js
```

Then ask an LLM: "What can you tell me about vetriselvan.space?"

## Portfolio Sections

### Hero Section
Eye-catching landing with animated text and 3D elements

### About Section
Personal introduction and background

### Skills Section
Technical skills organized by category:
- Full-stack Development (React, Next.js, Node.js, MongoDB)
- AI & Machine Learning (TensorFlow, PyTorch, Langchain)
- Data Science (Pandas, NumPy, Power BI)
- Development Tools (Git, Docker, VS Code)
- Programming Languages (Python, TypeScript, Java, Rust)

### Experience Section
- Education: BE Computer Science Engineering (CGPA: 8.2)
- Competitions: State-Level Codeathon (3rd place)
- Internship: Application Development & Automation at Idea Shop

### Projects Section
26+ completed projects including:
- AI & Computer Vision (Face Recognition, Dog Classifier, Traffic Management)
- Full-Stack Applications (Library System, Hospital Management, Task Manager)
- Machine Learning (Kaggle Competitions, Data Analysis)
- Games & Interactive Apps (Pong with AI, Reaction Time Game)
- Systems Programming (Rust CLI, CUDA Prime Generator)

### Contact Section
Get in touch form and social links

## Deployment

### Build for Production
```bash
npm run build
```

The build output will be in the `dist/` directory, ready to deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Customization

### Theme Colors
Edit `tailwind.config.ts` to customize the color scheme

### Content
Update markdown files:
- `About.md` - Personal information
- `Skills.md` - Technical skills
- `Expirience.md` - Work experience
- `Completed Projects Portfolio.md` - Project details

### Components
Modify components in `src/components/` to customize sections

## License

This project is open source and available for personal use.

## Contact

Feel free to reach out for collaborations or opportunities!
