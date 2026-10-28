<div align="center">

# AI STUDY BUDDY®

<p align="center">
  <img src="assets/hero-banner.svg" alt="AI Study Buddy Banner" width="100%">
</p>

**Next-Generation Autonomous AI Learning Platform and Active Recall Studio**

[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini_Pro-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

[Features](#core-capabilities) • [Architecture](#system-architecture) • [Active Recall Pipeline](#cognitive-study-loop) • [Preview](#cinematic-interface) • [Local Setup](#getting-started) • [Tech Stack](#technology-stack)

</div>

---

## Overview

AI Study Buddy is an autonomous learning studio engineered to convert raw academic notes, dense textbooks, and research papers into interactive retention instruments. 

Built with a modern neo-grotesque visual design, physics-based UI transitions, and an active recall loop, the platform combines client-side Socratic AI tutoring, 3D tactile flashcards, adaptive knowledge assessments, circular Pomodoro blocks, and persistent cognitive heatmaps.

---

## Cinematic Interface

<div align="center">

### Unified Cinematic Hero

<p align="center">
  <img src="assets/preview-hero.png" alt="AI Study Buddy Hero" width="92%">
</p>

### Central Study Dashboard

<p align="center">
  <img src="assets/preview-dashboard.png" alt="AI Study Buddy Dashboard" width="92%">
</p>

</div>

---

## System Architecture

The platform follows a decoupled, client-first reactive architecture designed for rapid local execution, zero-cloud dependency fallback, and optional direct integration with Google Gemini Pro.

<p align="center">
  <img src="assets/architecture-diagram.svg" alt="System Architecture Diagram" width="100%">
</p>

### Architecture Breakdown

1. **Presentation & Motion Layer**
   - Single-page application built on React 18, Vite 5, and Tailwind CSS.
   - Coordinated micro-interactions orchestrated through Framer Motion spring physics.
   - Fluid requestAnimationFrame loop controller for seamless background video crossfading.
   - Consistent typography stack utilizing Outfit (Display Headings), Plus Jakarta Sans (UI Body), and Space Grotesk (Technical Identifiers).

2. **Reactive State Hub**
   - Centralized React Context API (`StudyDataContext`, `ThemeContext`, `AuthContext`).
   - LocalStorage synchronization engine ensuring state persistence across browser restarts.
   - Procedural Web Audio API sound engine providing zero-latency acoustic feedback without external audio files.

3. **Cognitive Synthesis Engine**
   - Direct client-to-API integration with Google Gemini Pro for multi-turn Socratic dialogues.
   - Embedded rule-based heuristic knowledge synthesizer functioning 100% offline.
   - Text parsing pipeline that extracts structural hierarchies, formulas, and flashcard pairs.

4. **Active Recall Execution Suite**
   - 3D CSS perspective card flipping with Leitner-inspired spaced repetition intervals.
   - Dynamic assessment bank with question rationale breakdowns and statistical grading.
   - Circular SVG Pomodoro timer synchronized with active tasks.

---

## Cognitive Study Loop

The application structures the learning process into a verified active recall loop:

```mermaid
flowchart TD
    A[Raw Study Material: Textbooks, PDFs, Notes] --> B[Material Ingestion & Hierarchy Parser]
    B --> C[Neural Synthesis Engine]
    
    subgraph Cognitive Loop
        C --> D[Smart Synthesized Notes]
        C --> E[3D Spaced Repetition Flashcards]
        C --> F[Adaptive Assessment Quizzes]
        
        D <--> G[Socratic AI Tutor Dialogue]
        E --> H[Recall Evaluation: Again, Hard, Good, Easy]
        F --> I[Instant Rationale & Score Analysis]
    end

    H --> J[Spaced Repetition Scheduler]
    I --> K[Mastery Analytics & Retention Engine]
    J --> K
    
    K --> L[Daily Activity Heatmap & Milestone Badges]
    L --> M[Academic Domain Mastery]
```

### Socratic Interaction Sequence

```mermaid
sequenceDiagram
    autonumber
    actor User as Student
    participant UI as Socratic Tutor UI
    participant Synth as AI Engine
    participant Store as Local Storage

    User->>UI: Submit academic query or proof verification
    UI->>Synth: Dispatch query with ingested chapter context
    alt Gemini API Key Configured
        Synth->>Synth: Execute Gemini Pro multi-turn Socratic prompt
    else Offline Fallback Mode
        Synth->>Synth: Execute local heuristic knowledge parsing
    end
    Synth-->>UI: Return step-by-step breakdown & analogy
    UI->>Store: Persist message history
    UI-->>User: Render real-time response with Web Audio chime
```

---

## Core Capabilities

| Capability | Description | Technical Implementation |
| :--- | :--- | :--- |
| **Material Extraction** | Ingest raw documents and generate structured chapter notes with highlighted key concepts. | Client-side parser with local heuristic fallbacks |
| **Socratic AI Tutor** | Conversational tutor that provides proofs, code breakdowns, and analogies. | Google Gemini Pro REST API integration + multi-turn context |
| **3D Spaced Repetition** | Tactile 3D cards supporting standard review intervals (`Again`, `Hard`, `Good`, `Easy`). | CSS 3D perspective transforms (`preserve-3d`) + review algorithms |
| **Adaptive Quizzes** | Practice assessments with real-time scoring, timers, and in-depth answer rationales. | Automated question bank generation + accuracy tracking |
| **Focus Pomodoro** | Customizable focus blocks (`25m Focus`, `5m Short Break`, `15m Long Break`). | SVG circular stroke dasharray math + Web Audio ticking |
| **Cognitive Analytics** | Visual retention heatmaps, domain velocity indicators, and achievement milestones. | Procedural heatmap grid calculation + persistent badge states |
| **Procedural Audio** | Real-time acoustic feedback for flips, clicks, completions, and transitions. | Native Web Audio API synth oscillators (zero external audio files) |
| **Cinematic Hero** | Looping ambient video with custom 0.5s fade-in/fade-out transitions. | HTML5 video elements controlled via `requestAnimationFrame` |

---

## Technology Stack

### Frontend & Runtime
- **Runtime Environment:** Node.js (v18+)
- **Core Framework:** React 18 (TypeScript)
- **Bundler & Build Tool:** Vite 5
- **Styling Architecture:** Tailwind CSS v3 with custom glassmorphism plugins
- **Animation System:** Framer Motion (v11)
- **Iconography:** Lucide React
- **Confetti Engine:** Canvas Confetti

### Typography System
- **Display Headings:** Outfit (Weights 700, 800, 900)
- **Body & Navigation:** Plus Jakarta Sans (Weights 400, 500, 600, 700)
- **Code & Numeric Data:** Space Grotesk (Weights 500, 600, 700)

### Sound Architecture
- **Synthesizer Engine:** Web Audio API (`AudioContext`)
- **Sound Profile:** Procedural Sine, Triangle, and Square wave synthesis (Chimes, flips, clicks, level-up fanfares)

---

## Project Structure

```
ai-study-buddy/
├── assets/                          # Repository media and architectural diagrams
│   ├── architecture-diagram.svg     # Full system architecture vector diagram
│   ├── hero-banner.svg              # Animated SVG header banner
│   ├── preview-hero.png             # Screenshot of the unified hero view
│   └── preview-dashboard.png        # Screenshot of the dashboard overview
├── public/
│   └── logo.svg                     # Application brand icon
├── src/
│   ├── components/
│   │   ├── analytics/               # Retention charts, activity heatmap, milestones
│   │   ├── auth/                    # Authentication modal & illustration
│   │   ├── common/                  # GlassCard, GlowButton, CircularProgress, Modal
│   │   ├── dashboard/               # Primary overview, quick tools, recent chapters
│   │   ├── flashcards/              # 3D spaced repetition card engine
│   │   ├── intro/                   # Cinematic intro sequence (session-aware)
│   │   ├── landing/                 # Cinematic hero, chapters, features, how-it-works
│   │   ├── materials/               # Ingestion studio, chapter catalog, document reader
│   │   ├── navigation/              # Top glass navigation bar and view router
│   │   ├── notes/                   # Synthesized smart notes & markdown editor
│   │   ├── planner/                 # Study task manager & circular Pomodoro timer
│   │   ├── quiz/                    # Adaptive assessment quiz engine
│   │   ├── settings/                # API key configuration & audio settings
│   │   └── tutor/                   # Socratic AI tutor dialogue interface
│   ├── context/
│   │   ├── AuthContext.tsx          # User credentials & session tokens
│   │   ├── StudyDataContext.tsx     # Application state & LocalStorage sync
│   │   └── ThemeContext.tsx         # Sound settings & accessibility flags
│   ├── data/
│   │   └── defaultData.ts           # Initial chapters, decks, quizzes, and tasks
│   ├── styles/
│   │   ├── fonts.css                # Typography declarations
│   │   └── theme.css                # Animation keyframes & cinematic styles
│   ├── types/
│   │   └── index.ts                 # TypeScript type interfaces
│   ├── utils/
│   │   ├── confetti.ts              # Reward celebration effects
│   │   └── sound.ts                 # Procedural Web Audio API sound generator
│   ├── App.tsx                      # Root application component
│   ├── index.css                    # Global Tailwind styles & variables
│   └── main.tsx                     # Application entry point
├── index.html                       # HTML5 entry template & font preconnects
├── package.json                     # Project dependencies & scripts
├── tailwind.config.js               # Tailwind design system configuration
├── tsconfig.json                    # TypeScript compiler options
└── vite.config.ts                   # Vite bundler configuration
```

---

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher) or pnpm / yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/panchaksharayya12/AI-Study-Buddy.git
   cd AI-Study-Buddy
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

### Production Build

To verify type integrity and compile the production bundle:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Configuration

### Optional Google Gemini Integration
AI Study Buddy includes a built-in heuristic knowledge engine that works completely offline. To enable direct live synthesis through Google Gemini Pro:
1. Open the application in your browser.
2. Click the Settings icon in the navigation bar.
3. Paste your Gemini API key (obtained from Google AI Studio).
4. All AI Tutor inquiries will automatically route to Gemini Pro directly from your client without intermediary servers.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
