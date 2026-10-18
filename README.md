# VRIDDHI — Holistic Character & Growth Platform

> **"Education is the manifestation of perfection already in man."** — Swami Vivekananda

VRIDDHI solves the critical gap between academic assessment and the holistic development of a human being in Indian classrooms. While traditional schooling measures marks and exams, VRIDDHI establishes a repeatable, evidence-based growth loop for observable learning habits and inner strength—without turning character into a toxic ranking or psychological diagnosis.

---

## 🌟 Core Identity & Principles

### Non-Negotiable Product Identity
- **Product Name**: VRIDDHI
- **AI Growth Companion**: MitraAI
- **Primary Focus Area**: **Concentration** (the key to all learning and self-mastery)

### The 6 Tracked Principles
1. **Concentration** (*Primary Anchor*): Focus sprints, attention recovery, single-tasking discipline.
2. **Courage & Fearlessness**: Raising doubts, speaking up, attempting difficult challenges.
3. **Self-Confidence & Faith**: Belief in self-improvement, constructive self-dialogue, self-reliance.
4. **Purity of Mind & Heart**: Sincere intentions, rejoicing in others' wins, dissolving jealousy.
5. **Selfless Service**: Spontaneous peer help, classroom duties, contribution without expecting praise.
6. **Perseverance & Hard Work**: Continuing after mistakes, deliberate practice, refusing to quit early.

Each principle tracks:
- Baseline Score (from start-of-year assessment)
- Current Score & Level
- Previous-Week & Previous-Month comparisons
- Observable Evidence Count & Activity History
- Reflection Snippets
- Recommended Next Actions

---

## 🚀 Key Modules & Architecture

### 1. Dual Entry Experience (`/login`)
- **Student Login**: Interactive dashboard, weekly quests, playable Concentration Lab, growth mirror, and supportive MitraAI nudges.
- **Teacher Login**: Classroom analytics, student radar profiles, gap identification, assignment tools, and private holistic reports.

### 2. Start-of-Year Baseline (`/onboarding`)
- Scenario-based questions, attention sprints, practical situations across all 6 principles.
- Establishes the initial baseline for longitudinal growth (NOT a diagnosis).

### 3. Student Growth Hub (`/dashboard`)
- **Clean, Spacious UI**: Modern Indian educational design with soft warm surfaces and decluttered layout.
- **Concentration Spotlight**: Direct access to primary attention training.
- **6 Principles Visualizer**: Hexagonal/radial and bar views with week/month trend indicators.
- **Personal Growth Mirror**: "Where I Am" vs "Where I Can Grow Next".
- **Activity Hub**: 3 core activity types:
  - **Tasks**: Focus sprints, hard riddles, acts of service.
  - **Quizzes**: Real-life behavioral scenarios with evidence logging.
  - **Interests**: Coding, sports, music, art, science experiments.
- **Follow-up Reflections**: Short structured inquiries after every challenge.

### 4. Playable Concentration Lab (`/focus-lab`)
- 4 interactive cognitive mini-games:
  1. *Concentration Grid* (4x4 numerical attention tracking)
  2. *Memory Lantern* (Sustained visual recall)
  3. *Cognitive Rule-Switching* (Executive control & cognitive agility)
  4. *Self-Reliance Riddle* (Perseverance with delayed hint timer)

### 5. Teacher Dashboard & Teacher-Only Holistic Report (`/teacher`)
- **Strict Product Boundary**: Students see their habit scores, quests, and reflection history; only teachers can generate and inspect the **Holistic Character Development Report**.
- Combines baseline vs current levels, delta trends, evidence coverage, reflection depth, academic performance juxtaposition, and educator notes.
- One-click PDF/Print report generation.

### 6. Live MitraAI Companion (`/mentor`)
- **Live OpenRouter LLM Integration**: Powered by `meta-llama/llama-3.3-70b-instruct` / `openai/gpt-4o-mini` with deep Vivekananda educational system prompts.
- **Vivekananda-Oriented Wisdom**: Suggests actionable daily micro-experiments across the 6 principles (Concentration, Fearlessness, Shraddha, Chitta-Shuddhi, Seva, Titiksha).
- **Teacher-Side**: Automated gap detection with teacher-approvable quests.

### 7. Sahaay Peer Helping & Doubt Space (`/sahaay`)
- **Anonymous Doubt Asking**: Overcome the fear of asking in front of peers (Abhaya).
- **Peer-to-Peer Help & Solutions**: Students can answer each other's questions, vote on helpful solutions, and view scrollable community explanations.
- **Seva XP Rewards**: Students earn **+25 XP** in Selfless Service (Karma Yoga) whenever they help a classmate.

---

## 💻 Tech Stack & Offline-First Design

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS, Lucide React, Framer Motion, Canvas Confetti.
- **State Management**: Zero-dependency resilient store (`lib/store.tsx`) with localStorage persistence.
- **Offline Mode**: Built-in classroom offline simulation queue for low-resource Indian schools.
- **Database Schema**: Full PostgreSQL + Prisma schema (`prisma/schema.prisma`) for future backend integration.

---

## 🏃 Running Locally

```bash
# Navigate to directory
cd vriddhi

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

- **Student Portal**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- **Teacher Portal**: [http://localhost:3000/teacher](http://localhost:3000/teacher)
- **Start-of-Year Baseline**: [http://localhost:3000/onboarding](http://localhost:3000/onboarding)
- **Concentration Lab**: [http://localhost:3000/focus-lab](http://localhost:3000/focus-lab)
