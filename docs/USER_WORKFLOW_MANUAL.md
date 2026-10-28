# User Workflow Manual: AI Study Buddy

**Product:** AI Study Buddy  
**Author:** Panchaksharayya  
**Platform Version:** 1.0.0  
**Live Application URL:** [https://ai-study-buddy-sooty-seven.vercel.app](https://ai-study-buddy-sooty-seven.vercel.app)  

---

## 1. Quick Start Guide

AI Study Buddy requires no account creation or credit card to begin. All study progress, flashcard reviews, and notes are saved directly in your browser.

1. Navigate to [https://ai-study-buddy-sooty-seven.vercel.app](https://ai-study-buddy-sooty-seven.vercel.app).
2. Click **Begin Journey** on the hero section or select any tool from the top navigation bar.
3. Access your study tools directly:
   - **Dashboard:** Central overview of daily streaks, active cards, and recent chapters.
   - **Studio:** Reading materials and document ingestion.
   - **AI Tutor:** Conversational inquiry and proof breakdown.
   - **Flashcards:** 3D spaced-repetition card decks.
   - **Journal (Quizzes):** Timed knowledge assessments with answer rationales.
   - **Planner:** Pomodoro focus timer and task list.
   - **Notes:** Synthesized summaries with keyword highlights.
   - **Analytics:** 16-week activity heatmap and domain retention metrics.

---

## 2. Ingesting Study Materials

The **Studio** (`materials`) section organizes your reading curriculum into distinct chapters.

### Default Curriculum
The application comes pre-loaded with curated chapters across three domains:
- **Chapter 01:** Neural Architectures & Transformers (Computer Science)
- **Chapter 02:** Internet Protocols & TCP/IP Stack (Computer Networks)
- **Chapter 03:** Molecular Genetics & CRISPR Editing (Life Sciences)

### Ingesting New Content
1. Navigate to **Studio** from the navigation bar.
2. Click **Ingest New Material**.
3. Paste lecture notes, syllabus text, or textbook sections into the ingestion window.
4. The system automatically categorizes the document and generates corresponding flashcard decks and practice questions.

---

## 3. Conversational Socratic AI Tutor

The **AI Tutor** (`tutor`) provides multi-turn guided dialogue to help clarify difficult concepts without giving away answers directly.

### Recommended Prompting Patterns
- **Proof Assistance:** *"Walk me through the mathematical derivation of self-attention step-by-step."*
- **Conceptual Analogies:** *"Explain the difference between TCP and UDP using a real-world shipping analogy."*
- **Code Walkthroughs:** *"How would I implement backpropagation for a two-layer perceptron from scratch in Python?"*
- **Edge Case Testing:** *"What happens to the CRISPR Cas9 complex if the PAM sequence is mutated?"*

### Optional Gemini Pro Activation
By default, the AI Tutor uses an embedded heuristic knowledge engine that functions 100% offline. To enable direct live synthesis via Google Gemini Pro:
1. Click the **Settings** icon in the top navigation bar.
2. Enter your Gemini API key (from Google AI Studio).
3. The tutor status indicator will switch to **Connected to Google Gemini Pro AI**.

---

## 4. 3D Spaced Repetition Flashcards

The **Flashcards** view uses hardware-accelerated 3D perspective transforms to emulate physical index cards.

### Keyboard Controls
For rapid hands-on study sessions, you can review cards entirely via keyboard:
- **Spacebar:** Flip the active card to reveal the answer.
- **Left Arrow:** Navigate to the previous card.
- **Right Arrow:** Navigate to the next card.
- **Keys 1, 2, 3, 4:** Rate your recall quality when the back of the card is visible:
  - `1` = **Again:** Immediate re-test needed.
  - `2` = **Hard:** Retrieved with difficulty; shorter repeat interval.
  - `3` = **Good:** Retrieved with moderate effort; standard interval.
  - `4` = **Easy:** Instant recall; extended interval.

Cards rated as *Easy* or *Good* multiple times transition into **Verified Concept** status in your retention analytics.

---

## 5. Adaptive Quiz Assessments

The **Journal** (`quiz`) view lets you verify active recall through timed multiple-choice assessments.

### Assessment Rules
- Each question presents four plausible choices derived from the chapter context.
- Once you select an answer, the interface highlights the correct option in green and incorrect selections in red.
- An **Explanation** box expands beneath the question providing the exact conceptual rationale.
- Upon completing all questions, you receive a detailed performance summary with accuracy percentages, total correct count, and active test time.

---

## 6. Circular Pomodoro Focus Timer

The **Planner** (`planner`) combines task management with a circular Pomodoro timer.

### Focus Intervals
- **Focus Block (25 min):** Deep, uninterrupted study period.
- **Short Break (5 min):** Quick physical rest.
- **Long Break (15 min):** Extended rest following four completed Pomodoro cycles.

### Audio & Sound Control
- The timer utilizes procedural Web Audio oscillators to chime at the start and completion of each interval.
- If studying in a quiet environment (e.g., library or shared office), click the **Sound Icon** in the top navigation bar to mute all procedural sound effects instantly.

---

## 7. Reading the Cognitive Retention Heatmap

The **Analytics** (`analytics`) view displays a 16-week study density heatmap:
- **Light Gray:** Zero minutes logged on that day.
- **Subtle Green / Indigo:** 1 to 25 minutes logged.
- **Deep Slate / Green:** 25 to 60 minutes logged.
- **Solid Black / Green Highlight:** 60+ minutes logged (Deep Study Day).

Maintaining an uninterrupted daily study streak reinforces long-term memory consolidation and unlocks milestone badges in your profile.

---

## 8. Data Management and Offline Usage

All data is stored inside your browser's origin-scoped `localStorage`. 
- **Offline Access:** You can disconnect your network connection entirely; flashcards, quizzes, notes, and the Pomodoro timer will remain fully operational.
- **Clearing Cache:** If you clear your browser's site cookies and local storage, study records will be reset to the default curriculum. Ensure you back up important notes by clicking the **Copy All** button on any note page.
