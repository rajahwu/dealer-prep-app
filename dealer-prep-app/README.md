# Dealer Assessment Countdown

A real-time countdown and task tracker for casino dealer assessment preparation. Built to help you stay focused, calm, and structured in the hours leading up to your evaluation.

## Features

- **Live Countdown Timer** — Real-time tracking until assessment at 7 PM
- **Phase-Based Structure** — Organized prep schedule from 2 PM to 7 PM
- **Interactive Task Lists** — Check off tasks as you complete them
- **Progress Tracking** — Visual progress bars for each phase
- **Focus Mode** — Quick-access button for core technique reminders
- **Location Awareness** — Clear indicators for home vs. office phases
- **Mobile-Optimized** — Designed for on-the-go reference
- **Auto-Highlighting** — Current phase automatically highlighted based on time

## Quick Start

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Deploy to Vercel
```bash
vercel deploy
```

## Schedule Overview

### 2:00 PM - 3:00 PM: Mental Prep & Hand Activation (Home)
- Light mechanics work
- Visualization exercises
- Confidence building

### 3:00 PM - 4:00 PM: Mechanics Review (Home)
- Reference video review
- Mental rehearsal
- Pre-table prep

### 4:00 PM - 5:30 PM: Table Warm-In & High-Value Reps (Office)
- On-table practice
- Filmed review
- Consistent repetition

### 5:30 PM - 6:15 PM: Assessment Simulation (Office)
- Full mock runs
- Pressure simulation
- Performance focus

### 6:15 PM - 6:45 PM: Strategic Rest (Office)
- Hands-off recovery
- Mental rehearsal
- Energy conservation

### 6:45 PM - 7:00 PM: Walk-In Mode (Office)
- Light warm-up only
- Final mental prep
- Assessment ready

## Core Focus Cues

The app includes quick-reference focus cues for technique:
- **Riffle:** Even release, no spray
- **Bridge:** Gentle arc, clean cascade
- **Posture:** Calm body = competent read

## Tech Stack

- React 18
- Lucide React (icons)
- Modern CSS-in-JS
- Vercel deployment

## Usage Tips

1. **Open on mobile at 2 PM** — Keep it accessible throughout prep
2. **Check off tasks as you go** — Visual progress builds confidence
3. **Use Focus Mode** — Quick mental reset when needed
4. **Trust the schedule** — Let it guide you, don't overthink
5. **Stay present** — One phase, one task at a time

## Design Philosophy

This app is built on the principle that **structure reduces anxiety**. By breaking prep into clear phases with specific tasks and mindset cues, you can focus on execution rather than planning. The automatic phase highlighting means you always know exactly where you are and what comes next.

## Color Scheme

- **Accent Green:** `#00e6a8` — Active phases, completion
- **Purple:** `#5a4bff` — Focus mode, secondary actions
- **Dark Background:** `#0f1117` — Main background
- **Panel:** `#1a1d29` — Card backgrounds
- **Text:** `#f5f5f5` — Primary text

## Notes

- Assessment time is hardcoded to 7:00 PM (19:00)
- Task completion state persists in memory during session
- Mobile-first responsive design
- No external API dependencies
- Lightweight and fast

---

Built with focus. Deploy with confidence. Execute with calm.

Good luck! 🎯
