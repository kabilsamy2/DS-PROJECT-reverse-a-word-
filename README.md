# STACK LAB — Reverse & Discover
### Interactive Data Structures College Project: Stack in C (LIFO Engine)

---

## 🎓 Student & Academic Details
- **Student Name:** KABIL SAMY KM
- **Registration Number:** RA2511003040086
- **Department & Class:** CSE - A
- **Subject:** Data Structures (CS201)
- **Core Concept:** Stack Data Structure — LIFO (Last In, First Out)

---

## 🚀 Project Overview
**STACK LAB** is a futuristic, interactive web application and C programming laboratory designed for demonstrating string reversal and palindrome detection using the **Stack** data structure.

The project features a **live memory visualization engine** that simulates array-based stack operations (`PUSH`, `POP`, `TOP` pointer tracking) step-by-step in real time, accompanied by syntax-highlighted C11 source code, time and space complexity breakdowns, and evaluation credentials.

---

## ⚡ Core Features

1. **Word Reversal Workspace**
   - Case-preserving string reversal using array-based stack logic.
   - Instant validation and keyboard accessibility (Press Enter).
   - One-click presets: `LEVEL`, `HELLO`, `MADAM`, `RADAR`, `STACK`, `RaceCar`, and `"A man, a plan, a canal: Panama"`.
   - Character index decomposition pills and copy buttons.

2. **Live Stack Visualizer (C Runtime Emulator)**
   - Visual transparent stack memory tube with dynamic memory indices.
   - Real-time `TOP` pointer tracking (`TOP = index` or `TOP = -1 (EMPTY)`).
   - Interactive playback controls: **Play Animation**, **Pause**, **Next Step**, **Previous Step**, and **Reset**.
   - Adjustable simulation speeds: `0.5x`, `1.0x`, `1.5x`, `2.0x`.
   - Synchronized Three-Stage Pipeline: Input Buffer Ribbon ➔ Stack Memory Chamber ➔ Reversed Output Buffer Ribbon.
   - Execution console displaying current operation and equivalent line in C11.

3. **Palindrome Detection Engine**
   - Automatically checks whether the input reads the same forwards and backwards.
   - Normalized comparison mode: ignores punctuation, whitespace, and case (e.g., `"A man, a plan, a canal: Panama"` is recognized as a palindrome).
   - Strict case-sensitive mode toggle.
   - Visual emerald/rose status badges and celebratory confetti effects.

4. **Result Insights Card (Bottom-Right HUD)**
   - Live metrics: Original, Reversed, Character count, PUSH count, POP count, Time Complexity $O(n)$, Space Complexity $O(n)$.
   - Dynamic natural language explanation.
   - Collapsible/minimizable toggle.

5. **Algorithm & C Source Code Panel**
   - **How It Works Tab:** 6 clear algorithmic phases and $O(n)$ time/space complexity analysis.
   - **C Source Code Tab:** Standard C11 source code with line numbers, copy button, download button, and syntax breakdown filters.

6. **Recent History & Persistence**
   - Records the last 5 operations with timestamps and palindrome badges.
   - 1-click **REUSE** button to reload words into the workspace.
   - Stored across sessions via `localStorage`.

7. **Aesthetics & Audio**
   - Dark cyber sci-fi UI with electric cyan (`#00f2fe`) and violet (`#a855f7`) accents.
   - Web Audio API synthesizer for cybernetic clicks, push sounds, and victory chimes (with mute toggle).
   - Dark/Light mode theme toggle.
   - Dedicated Faculty Evaluation Modal with academic checklist.

---

## 💻 Running the Project Locally

### 1. Web Application (React + TypeScript + Vite)
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

To create a production build:
```bash
npm run build
```

---

### 2. Standalone C Program (`stack_reverse.c`)
The C source code is standard C11 compliant with zero third-party dependencies.

```bash
# Compile using GCC
gcc -std=c11 -Wall -Wextra -O2 stack_reverse.c -o stack_reverse.exe

# Execute
.\stack_reverse.exe
```

---

## ⏱️ Complexity Analysis
- **Time Complexity:** $\mathcal{O}(n)$
  - Pushing $n$ characters onto the stack: $n \times \mathcal{O}(1) = \mathcal{O}(n)$.
  - Popping $n$ characters to form reversed string: $n \times \mathcal{O}(1) = \mathcal{O}(n)$.
  - Total time: $2n \implies \mathcal{O}(n)$ linear time.
- **Space Complexity:** $\mathcal{O}(n)$
  - The stack array holds up to $n$ characters in auxiliary memory.

---

*"Learning Data Structures, One Operation at a Time."*
**KABIL SAMY KM | RA2511003040086 | CSE - A**
