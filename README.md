# Accredian Co-Lab Student Dashboard

Accredian Co-Lab is a unified, native communication and collaboration student dashboard designed to eliminate dependency on external platforms (like WhatsApp, LinkedIn, Trello, Discord, and Telegram).

## 🚀 Features

Accredian Co-Lab is built upon five design pillars:

1. **Pulse (Instant Chat & Voice Rooms)**: Native cohort chat channels, private project rooms, and mentoring forums. Includes a live-simulated voice study room overlay with active speaker visualizers.
2. **Synergy (Smart Card Matcher)**: Tinder-style swipe interface to match students for capstone project partnerships based on timezones, target roles, compatible schedules, and shared skills.
3. **Canvas (Shared Workspaces)**: Lightweight group tools including a drag-and-drop Kanban task board and an interactive HTML5 whiteboard sketchpad with draggable sticky notes.
4. **Spotlight (Verified Student Portfolio)**: Verified digital credentials (grades, completion badges, peer ratings) displayed as a unified portfolio, with one-click export to LinkedIn.
5. **Quest Hub (Incentive Engine)**: Gamified loyalty rewards. Students earn XP and Accredian Points (AP) by answering questions, working in study rooms, or updating Kanban boards, which they can redeem in the AP Shop for resume reviews and mock interviews.

## 🛠️ Technical Stack
* **Markup**: HTML5 Semantic Structure
* **Styling**: Vanilla CSS3 (Glassmorphism, Dark/Light theme toggle, fluid transitions, and keyframe animations)
* **Interactivity**: Vanilla Javascript (simulated real-time chat, state-driven UI, Drag & Drop API, HTML5 Canvas 2D context drawing, and local state management)

## 📂 Project Structure
* `index.html` - Core structural layout of the dashboard sections.
* `styles.css` - Theme styles, layout grids/flexbox, animations, and typography.
* `app.js` - Mock database, chat responders, matcher swipes, Kanban controls, and game logic.

## 💻 Local Setup & Run
To run this project locally:
1. Clone the repository.
2. Spin up a local static server inside the directory (e.g. using Python: `python -m http.server 8000`).
3. Open `http://localhost:8000` in your web browser.
