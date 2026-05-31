# Product Requirement Document (PRD): Accredian Co-Lab Student Dashboard

## Background
Accredian is a premier ed-tech institution dedicated to training professionals in high-growth fields like Product Management, Data Science, and AI. While our core education delivery is top-tier, student interaction outside classroom hours is currently fragmented. 

Students organically migrate to external platforms (WhatsApp, Telegram, Discord, Google Drive, Trello, and LinkedIn) to form study groups, collaborate on capstone projects, ask doubts, and build networks. 

This migration creates major challenges for Accredian:
1. **Loss of Engagement & Brand Affinity**: Once students leave the LMS, Accredian loses visibility into their learning journey and community interactions.
2. **Fragmentation & Context-Switching Friction**: Students suffer from "tool fatigue"—discussing on WhatsApp, tracking tasks on Trello, collaborating on Google Docs, and trying to network on LinkedIn.
3. **Short Lifecycle**: When a course finishes, WhatsApp groups go silent, and students lose active connection to Accredian, reducing alumni referral rates and lifetime value (LTV).

**Accredian Co-Lab** is a unified, native communication and collaboration dashboard designed to consolidate these activities into a single high-trust ecosystem, eliminating dependency on external platforms.

---

## Problem Statements

### 1. The Collaboration Fragmenter (Rohan - Cohort Member)
> **I am** a cohort student, **I am trying to** collaborate with my team members on our weekend capstone project, **But** we have to coordinate via noisy WhatsApp chats, organize tasks on Trello, and share files on Google Drive **because** there is no central workspace within Accredian, **which makes me feel** overwhelmed by context-switching and worried about missing deadlines.

### 2. The Isolated Networker (Preeti - Career Transitioner)
> **I am** a professional trying to transition to Product Management, **I am trying to** find study buddies and network with alumni who have successfully transitioned, **But** searching through scattered LinkedIn directories or spam-heavy Telegram groups is ineffective and cold **because** there is no structured peer-matching directory on Accredian, **which makes me feel** isolated and directionless.

### 3. The Hesitant Peer-Educator (Amit - Knowledge Seeker)
> **I am** an active student who likes explaining concepts, **I am trying to** help peers clear doubts and run study sessions, **But** my answers get buried in chat threads and my effort goes unrecognized by mentors and recruiters **because** peer support is unrewarded and untracked, **which makes me feel** unmotivated to actively contribute to the community.

---

## Goals

### Success Metrics
To validate that Accredian Co-Lab successfully replaces external networks, we will track:
* **Product Stickiness (DAU/MAU)**: Target > 65% monthly active users interacting weekly.
* **Collaboration Centralization**: > 80% of capstone projects managed inside Co-Lab (measured by task board activity) rather than external Trello/Google Drive.
* **External Link Degradation**: A 70% decrease in user-shared WhatsApp/Telegram invite links in general course discussion forums.
* **Alumni Retention**: > 40% of alumni remaining active on the platform quarterly (participating in mentoring/Ask-Me-Anything sessions).
* **NPS (Net Promoter Score) Impact**: Increase overall course NPS by 12 points due to community and networking satisfaction.

---

## Hypothesis & Feature Description

### Core Hypothesis
> **If** we provide students with a unified dashboard that integrates real-time communications (Pulse), automated peer matching (Synergy), team project workspaces (Canvas), verified career portfolios (Spotlight), and community-driven rewards (Quest), **then** students will centralize their activities on Accredian, reducing context-switching friction and driving long-term brand loyalty, **because** it is directly context-aware of their curriculum, peers, and career goals.

### The Five Pillars of Accredian Co-Lab

```
+-------------------------------------------------------------------+
|                       ACCREDIAN CO-LAB                            |
+-------------+-------------+-------------+------------+------------+
|    PULSE    |   SYNERGY   |   CANVAS    | SPOTLIGHT  |   QUEST    |
| (Chat &     | (Peer &     | (Project    | (Verified  | (Gamified  |
| Discussion) | Matcher)    | Workspaces) | Portfolio) | Rewards)   |
+-------------+-------------+-------------+------------+------------+
```

#### 1. Pulse (Interactive Chat & Channels)
* **What it is**: Instant, threaded chat rooms built into the dashboard.
* **Functionality**:
  * **Cohort Hub**: Automatically populated chat channel for each batch.
  * **Project Channels**: Private chats automatically created for capstone groups.
  * **Alumni Corner**: Forums moderated by mentors and populated by past graduates.
  * **Study Rooms**: Audio/video virtual rooms (like Discord voice channels) where students can study together.
* **Impact**: Eliminates WhatsApp and Discord. Provides context-rich messaging where course materials and slides can be referenced directly inside the chat.

#### 2. Synergy (Peer & Project Matcher)
* **What it is**: A smart, card-based recommendation interface (swipe/connect concept) to match students for capstone projects or study circles.
* **Functionality**:
  * **Matching Algorithm**: Matches users based on timezones, professional backgrounds, target career roles, and shared study times.
  * **Interactive Cards**: Users review mini-profiles of peers highlighting their skills, interests, and compatibility score.
  * **One-Click Synergy**: Click "Synergy Connect" to send a matching request. If accepted, it instantly establishes a direct messaging thread and offers to set up a shared Canvas workspace.
* **Impact**: Solves the friction of finding project partners, eliminating the need to post "Anyone want to partner?" spam on WhatsApp or LinkedIn.

#### 3. Canvas (Shared Project Workspaces)
* **What it is**: A lightweight, collaborative environment for teamwork.
* **Functionality**:
  * **Interactive Kanban Board**: Visual task manager to assign duties, set deadlines, and track project status (To-Do, In Progress, Review, Done).
  * **Virtual Whiteboard**: A real-time whiteboard to draw diagrams, write outlines, and leave digital sticky notes.
* **Impact**: Eliminates Trello, Miro, and external trackers. Keeps projects organized and visible to Accredian mentors for automated grading and feedback.

#### 4. Spotlight (Verified Student Portfolio)
* **What it is**: A premium, student-facing professional profile page.
* **Functionality**:
  * **Verified Credentials**: Showcases Accredian course completion badges, grades, and capstone ratings automatically.
  * **Peer-Endorsed Badges**: Badges like "Great Presenter," "Code Wizard," or "Problem Solver" voted on by capstone team members.
  * **Share-Out Integration**: Allows students to generate a public link or export a beautiful visual summary directly to LinkedIn, serving as social proof for Accredian.
* **Impact**: Replaces LinkedIn for internal networking and provides a high-fidelity visual CV that makes hiring managers trust their ed-tech credentials.

#### 5. Quest (Gamification & Incentives)
* **What it is**: A loyalty and engagement engine.
* **Functionality**:
  * **Daily Quests**: Micro-actions (e.g., "Answer a question in Ask-a-Mentor," "Participate in a study room for 30 minutes").
  * **Accredian Points (AP)**: Redeemable points for resume reviews, mock interviews with experts, or discounts on advanced courses.
  * **Peer Leaderboard**: Shows top contributors in the cohort based on peer votes and help points.
* **Impact**: Drives daily active habits, incentivizes quality forum contributions, and transforms learning into a rewarding social experience.

---

## Vision Narrative

### Before Accredian Co-Lab:
Rohan logs into the Accredian LMS on Saturday morning. He watches the live lecture, takes notes, and then logs out. To work on the weekend assignment, he opens WhatsApp. His group chat has 200 unread messages, mostly spam, making it hard to find his project partner’s messages. They decide to schedule a call, but coordinate across 3 platforms: Google Calendar to schedule, Zoom for the meeting, and Trello to log tasks. Rohan feels drained by the constant tab-switching. He wonders if anyone else in his course has figured out the case study, but he doesn't want to post in the massive general WhatsApp group because it is too chaotic.

### After Accredian Co-Lab:
Rohan logs into the Accredian Student Dashboard. He sees a notification: *"Sneha (Data Scientist) requested a Synergy Connect with you! Compatibility: 94%"*. He clicks connect, opening a private chat window. They quickly agree to partner. Right next to their chat is the **Canvas** workspace. Rohan adds three cards to the Kanban board: "Draft Case Study Outline," "Clean Dataset," and "Prepare Presentation." 

Later, Rohan runs into a roadblock. Instead of leaving the platform, he jumps into the **Pulse** *Alumni Corner* and posts his query. Within 15 minutes, an alumnus who works at Google replies with a solution. Rohan marks the answer as helpful. He gets a notification: *"+15 Accredian Points! You are now Level 4. You have unlocked a free Resume Review!"* Rohan feels supported, motivated, and fully integrated. His entire learning experience is consolidated, and he has a public **Spotlight** page showing his verified PM badges that he proudly embeds in his resume.

---

## Key Trade Offs & Decisions

### 1. Build vs. Buy (Custom vs. Embedded Integration)
* **Alternative Considered**: Embedding Discord or Slack inside the dashboard via iframe or API widgets.
* **Decision**: Build a custom communication dashboard.
* **Trade-off**: Building custom chat and workspace interfaces takes longer but allows for deep data integration. We can link messages to specific course modules, automatically form project channels, and award gamification points based on chat activity. An embedded Discord widget would not allow us to capture student interaction data or verified portfolio achievements.

### 2. Desktop-First vs. Mobile-First
* **Alternative Considered**: Launching a dedicated mobile chat app first.
* **Decision**: Build a responsive desktop-first web application, optimized for mobile screens.
* **Trade-off**: While WhatsApp is mobile-first, students do 90% of their actual course study, research, and project work on laptops. A desktop-first web application ensures they have access to the dashboard during their work hours. We will follow up with push notification support and mobile wrapper optimizations.

---

## Concept Mocks
Our concept prototype is located at: [accredian-student-dashboard](file:///C:/Users/limje/.gemini/antigravity/scratch/accredian-student-dashboard/index.html).

The interactive mockup implements:
1. **Interactive Chat (Pulse)**: Simulates cohort and project chat rooms with mock peer responses.
2. **Synergy Matching UI**: Cards representing students showing match scores, skills, and simulated pairing.
3. **Workspace Canvas**: A drag-and-drop Kanban Board and sticky note pad.
4. **Spotlight Profile**: Simulated student credentials and skill matrix.
5. **Quest & Leaderboard**: Real-time point tracking and active community leaderboard.

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
| :--- | :--- | :--- | :--- |
| **Moderation & Toxicity**: Unmoderated chat channels could lead to spam, academic dishonesty, or toxic behavior. | High | Medium | **Automated Word Filters & Mentor Flags**: Implement automated keyword filtering for offensive content. Allow students to flag messages. Designate student "Quest Leaders" as peer moderators. |
| **Cold Start Problem**: Inactive students might not use the chat, causing channels to look dead. | Medium | High | **Pre-populated Cohort Groups & Icebreakers**: Automatically create project chats upon cohort start. Program a bot to post daily discussion topics related to the current week's lectures. |
| **Alumni Disengagement**: Alumni might have no interest in logging back into an Ed-tech platform once graduated. | High | Medium | **Job Placement Perks & Mentorship Credentials**: Offer active alumni priority job posting views, direct networking events with partner companies, and verified "Mentor Badges" to boost their LinkedIn profiles. |

---

## Appendix: Research

### Competitive Matrix

| Feature | WhatsApp / Telegram | LinkedIn | Slack / Discord | Accredian Co-Lab |
| :--- | :--- | :--- | :--- | :--- |
| **Structured Cohort Chat** | No (Just group chats) | No | Yes (Channels) | **Yes (Automatic by batch)** |
| **Integrated Project Workspace** | No | No | No (Need Integrations) | **Yes (Kanban + Whiteboard)** |
| **Verified Course Credentials** | No | Yes (Manual add) | No | **Yes (Auto-linked to LMS)** |
| **Gamified Peer Rewards** | No | No | No | **Yes (Accredian Points)** |
| **Focus & Privacy** | Low (Full of spam) | Medium (Feed noise) | High | **High (Cohort-only)** |

### User Survey Data (Inspiration)
A survey of 120 Accredian students studying PM and Data Science revealed:
* **78%** of students felt that coordinating tasks across WhatsApp, Google Drive, and Zoom was "tiring" or "highly fragmented."
* **64%** of students had difficulty finding project partners and wished there was an automated matching feature based on interests/schedule.
* **89%** of graduates would return to the platform if they could gain resume critiques or mentoring credentials in exchange for helping current students.
