/* ==========================================================================
   Accredian Co-Lab - Client-Side Interactive Application Logic
   ========================================================================== */

// --- Global Application State ---
const state = {
  accredianPoints: 420,
  xp: 370,
  level: 4,
  xpTarget: 500,
  connectionsCount: 14,
  activeVoiceRoom: null,
  voiceInterval: null,
  currentChannel: 'cohort-pm-2026',
  
  // Synergy Matcher Profiles Database
  matcherProfiles: [
    {
      id: 'ss',
      name: 'Sneha Sen',
      avatar: 'SS',
      role: 'Senior Data Analyst @ TechCorp',
      cohort: 'PM-2026-A',
      matchPct: '94%',
      skills: ['Data Analytics', 'SQL', 'Tableau', 'A/B Testing'],
      about: 'Transitioning from data analytics to technical product management. Looking for a partner to build a quantitative PM capstone dashboard project. Free on weekend mornings.',
      schedule: 'Sat-Sun: 9 AM - 1 PM IST',
      industry: 'FinTech'
    },
    {
      id: 'ak',
      name: 'Amit Kumar',
      avatar: 'AK',
      role: 'UI Designer @ CreativeStudio',
      cohort: 'PM-2026-A',
      matchPct: '88%',
      skills: ['Figma', 'Wireframing', 'User Research', 'Design Systems'],
      about: 'I design interfaces and map customer journeys. Wanting to sync up with someone who is strong on data analysis/strategy to form a balanced cohort team.',
      schedule: 'Weekdays: 8 PM - 10 PM IST',
      industry: 'E-commerce'
    },
    {
      id: 'np',
      name: 'Nisha Pandey',
      avatar: 'NP',
      role: 'Software Engineer @ CloudScale',
      cohort: 'PM-2026-A',
      matchPct: '82%',
      skills: ['System Design', 'Python', 'APIs', 'Agile Operations'],
      about: 'Backend dev looking to learn product planning and metrics. I can help wire up functional prototypes if you can help me write the Product Requirement Documents.',
      schedule: 'Flexible weekends',
      industry: 'SaaS'
    }
  ],
  currentMatcherIndex: 0,
  
  // Active Connections List
  connections: [
    { name: 'Abhishek Roy (Mentor)', role: 'Senior PM at Amazon', avatar: 'AR' },
    { name: 'Divya Sharma', role: 'Business Analyst', avatar: 'DS' }
  ],
  
  // Chat History Database
  chatHistory: {
    'cohort-pm-2026': [
      { sender: 'Abhishek Roy', role: 'mentor', avatar: 'AR', time: '10:15 AM', text: "Hello cohort! Don't forget that your Draft PRDs are due this Sunday at midnight. Let me know if you need review help." },
      { sender: 'Sneha Sen', role: 'peer', avatar: 'SS', time: '11:02 AM', text: "Hey Abhishek, is it okay if we focus on the mobile onboarding flow specifically, rather than the entire app lifecycle?" },
      { sender: 'Abhishek Roy', role: 'mentor', avatar: 'AR', time: '11:05 AM', text: "Absolutely, Sneha. Quality over quantity. A narrow, well-researched user flow is much better." }
    ],
    'project-alpha': [
      { sender: 'Sneha Sen', role: 'peer', avatar: 'SS', time: 'Yesterday', text: "Hey team! I have updated the user interview synthesis on our Shared Whiteboard. Can someone review the Persona sticky notes?" },
      { sender: 'Amit Kumar', role: 'peer', avatar: 'AK', time: 'Yesterday', text: "Looks great Sneha, I am starting the design wireframes for that onboarding flow now." }
    ],
    'alumni-corner': [
      { sender: 'Rahul Varma', role: 'peer', avatar: 'RV', time: 'Friday', text: "Accredian alumni here! Landing my first APM role at Swiggy was all about showcasing my portfolio. Make sure your Spotlight profiles look clean and verified!" },
      { sender: 'Priyanjali Roy', role: 'peer', avatar: 'PR', time: 'Friday', text: "Second that! Recruiters actually look at the verified Capstone credentials on the Spotlight page." }
    ],
    'ask-a-mentor': [
      { sender: 'Vikram Grover', role: 'peer', avatar: 'VG', time: '9:00 AM', text: "How do we define success metrics for products that have a long feedback loop? e.g. medical devices?" },
      { sender: 'Abhishek Roy', role: 'mentor', avatar: 'AR', time: '9:30 AM', text: "Excellent question, Vikram. For long-cycle products, focus on leading indicators (e.g. daily active clinicians, workflow completion rate) rather than lagging indicators (e.g. annual sales)." }
    ]
  },
  
  // Kanban Tasks
  tasks: [
    { id: 1, title: 'Draft competitor matrix sheet', status: 'done', assignee: 'SS', tag: 'research' },
    { id: 2, title: 'Map target user persona journey', status: 'inprogress', assignee: 'AK', tag: 'research' },
    { id: 3, title: 'Create interactive dashboard mocks', status: 'todo', assignee: 'RP', tag: 'design' },
    { id: 4, title: 'Draft final pitch presentation deck', status: 'todo', assignee: 'AK', tag: 'deck' }
  ],
  
  // Quests Check
  quests: {
    ask: false, // Doubt resolution quest
    voice: true, // Completed
    kanban: true // Completed
  }
};

// --- DOM Navigation & Setup ---
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initThemeToggle();
  initNotifications();
  initVoiceStudyRooms();
  initChatSystem();
  initSynergyMatcher();
  initCanvasKanban();
  initCanvasWhiteboard();
  initSpotlight();
  initQuests();
});

// Tab Navigation Controller
function initNavigation() {
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabId = item.getAttribute('data-tab');
      navigateToTab(tabId);
    });
  });
}

function navigateToTab(tabId) {
  // Update sidebar menu items active class
  document.querySelectorAll('.menu-item').forEach(item => {
    if(item.getAttribute('data-tab') === tabId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Switch displayed section
  document.querySelectorAll('.tab-pane').forEach(pane => {
    if(pane.id === `tab-${tabId}`) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });
}

// Theme Toggle Manager
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeBtn.innerHTML = isLight 
      ? '<i class="fa-solid fa-sun"></i><span>Light Mode</span>' 
      : '<i class="fa-solid fa-moon"></i><span>Dark Mode</span>';
  });
}

// Notifications Dropdown Handler
function initNotifications() {
  const notifBtn = document.getElementById('notif-btn');
  const dropdown = document.getElementById('notif-dropdown');
  
  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('active');
  });

  document.querySelector('.mark-read').addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelectorAll('.dropdown-item.unread').forEach(item => {
      item.classList.remove('unread');
    });
    const dot = notifBtn.querySelector('.badge-dot');
    if(dot) dot.remove();
  });
}

// --- Pulse: Study Rooms & Simulated Voice ---
function initVoiceStudyRooms() {
  const joinBtns = document.querySelectorAll('.join-voice-btn');
  const voiceLi = document.querySelectorAll('.voice-li');
  const overlay = document.getElementById('voice-overlay');
  const hangupBtn = document.getElementById('voice-hangup-btn');
  const voiceRoomName = document.getElementById('voice-room-name');
  
  joinBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const room = btn.getAttribute('data-room');
      connectToVoiceRoom(room);
    });
  });

  voiceLi.forEach(li => {
    li.addEventListener('click', () => {
      const room = li.getAttribute('data-room');
      connectToVoiceRoom(room);
    });
  });

  hangupBtn.addEventListener('click', () => {
    disconnectVoiceRoom();
  });
}

function connectToVoiceRoom(roomName) {
  // If already in a room, disconnect first
  if(state.activeVoiceRoom) {
    disconnectVoiceRoom();
  }
  
  state.activeVoiceRoom = roomName;
  document.getElementById('voice-room-name').textContent = roomName;
  document.getElementById('voice-overlay').classList.remove('hidden');
  document.getElementById('rooms-trigger-btn').classList.add('active');
  
  // Render members list
  renderVoiceMembers();
  
  // Start simulation of people talking (speaking classes)
  startVoiceSpeakingSimulation();
  
  // Mark quest as done (if first time)
  if(!state.quests.voice) {
    completeQuest('voice', 50, 60);
  }
}

function disconnectVoiceRoom() {
  state.activeVoiceRoom = null;
  document.getElementById('voice-overlay').classList.add('hidden');
  document.getElementById('rooms-trigger-btn').classList.remove('active');
  
  if(state.voiceInterval) {
    clearInterval(state.voiceInterval);
    state.voiceInterval = null;
  }
}

function renderVoiceMembers() {
  const container = document.getElementById('voice-members-container');
  container.innerHTML = '';
  
  const members = [
    { name: 'Rohan (You)', avatar: 'RP', mic: 'on', initialSpeaking: false },
    { name: 'Sneha S', avatar: 'SS', mic: 'on', initialSpeaking: true },
    { name: 'Amit K', avatar: 'AK', mic: 'on', initialSpeaking: false }
  ];
  
  if(state.activeVoiceRoom.includes("Data Science")) {
    members.push({ name: 'Instructor Roy', avatar: 'IR', mic: 'off', initialSpeaking: false });
  }

  members.forEach(m => {
    const bubble = document.createElement('div');
    bubble.className = `voice-user-bubble ${m.initialSpeaking ? 'speaking' : ''}`;
    bubble.id = `voice-bubble-${m.avatar.toLowerCase()}`;
    
    bubble.innerHTML = `
      <div class="voice-avatar">
        ${m.avatar}
        <i class="fa-solid ${m.mic === 'on' ? 'fa-microphone text-success' : 'fa-microphone-slash text-danger'}"></i>
      </div>
      <span class="voice-username">${m.name}</span>
    `;
    
    container.appendChild(bubble);
  });
}

function startVoiceSpeakingSimulation() {
  state.voiceInterval = setInterval(() => {
    const bubbles = document.querySelectorAll('.voice-user-bubble');
    bubbles.forEach(b => {
      // Don't simulate Rohan talking unless active
      if(b.id === 'voice-bubble-rp') return;
      
      // Randomly toggle speaking status
      const isSpeakingNow = Math.random() > 0.6;
      if(isSpeakingNow) {
        b.classList.add('speaking');
      } else {
        b.classList.remove('speaking');
      }
    });
  }, 2500);
}


// --- Pulse: Chat Simulation Engine ---
function initChatSystem() {
  const channelLis = document.querySelectorAll('.channel-li');
  const chatForm = document.getElementById('chat-send-form');
  const chatInput = document.getElementById('chat-message-input');
  
  channelLis.forEach(li => {
    li.addEventListener('click', () => {
      channelLis.forEach(l => l.classList.remove('active'));
      li.classList.add('active');
      
      state.currentChannel = li.getAttribute('data-channel');
      
      // Update header
      document.getElementById('current-channel-title').textContent = '#' + li.querySelector('span').textContent;
      let desc = '';
      switch(state.currentChannel) {
        case 'cohort-pm-2026': desc = 'General chat for Product Management Cohort 2026 Batch A'; break;
        case 'project-alpha': desc = 'Private channel for Capstone Group Project Alpha'; break;
        case 'alumni-corner': desc = 'Ask alumni for career advice and networking tips'; break;
        case 'ask-a-mentor': desc = 'Post concept doubts here for Mentor response'; break;
      }
      document.getElementById('current-channel-desc').textContent = desc;
      chatInput.placeholder = `Message #${li.querySelector('span').textContent}...`;
      
      renderChatMessages();
    });
  });
  
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = chatInput.value.trim();
    if(!msg) return;
    
    // Post Rohan's message
    const msgObj = {
      sender: 'Rohan Patel',
      role: 'peer',
      avatar: 'RP',
      time: getCurrentTime(),
      text: msg
    };
    
    state.chatHistory[state.currentChannel].push(msgObj);
    chatInput.value = '';
    renderChatMessages();
    
    // Handle Quest Trigger
    if(state.currentChannel === 'ask-a-mentor' && !state.quests.ask) {
      setTimeout(() => {
        completeQuest('ask', 40, 50);
      }, 500);
    }
    
    // Trigger Automated Peer Response
    simulatePeerResponse(msg);
  });
  
  // Initial render
  renderChatMessages();
}

function renderChatMessages() {
  const container = document.getElementById('chat-messages-container');
  container.innerHTML = '';
  
  const history = state.chatHistory[state.currentChannel] || [];
  
  history.forEach(m => {
    const isSelf = m.sender === 'Rohan Patel';
    const card = document.createElement('div');
    card.className = `message-card ${isSelf ? 'self' : ''}`;
    
    card.innerHTML = `
      <div class="message-avatar" style="background-color: ${isSelf ? 'var(--color-primary)' : 'var(--color-info)'}">
        ${m.avatar}
      </div>
      <div class="message-content-wrapper">
        <div class="message-meta">
          <span class="sender-name">${m.sender}</span>
          <span class="sender-role ${m.role}">${m.role}</span>
          <span class="msg-time">${m.time}</span>
        </div>
        <div class="message-text">${m.text}</div>
      </div>
    `;
    container.appendChild(card);
  });
  
  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

function simulatePeerResponse(userMsg) {
  setTimeout(() => {
    let reply = "Thanks for sharing that! Let's incorporate it in the final Canvas board.";
    let peer = "Sneha Sen";
    let avatar = "SS";
    let role = "peer";
    
    if(state.currentChannel === 'ask-a-mentor') {
      reply = "Good query. I recommend mapping this directly to your PM metrics matrix. Let's touch base in our doubt-clearing session tomorrow.";
      peer = "Abhishek Roy";
      avatar = "AR";
      role = "mentor";
    } else if(state.currentChannel === 'project-alpha') {
      reply = "Great idea Rohan. I'll add this task to the Kanban board so we can track it.";
      peer = "Amit Kumar";
      avatar = "AK";
      role = "peer";
    } else if(state.currentChannel === 'alumni-corner') {
      reply = "Awesome, networking is key! Direct messaging alumni on Co-Lab gets you almost 3x faster response than external networks.";
      peer = "Rahul Varma";
      avatar = "RV";
      role = "peer";
    }
    
    state.chatHistory[state.currentChannel].push({
      sender: peer,
      role: role,
      avatar: avatar,
      time: getCurrentTime(),
      text: reply
    });
    
    renderChatMessages();
  }, 1500);
}

function getCurrentTime() {
  const d = new Date();
  let hr = d.getHours();
  let min = d.getMinutes();
  const ampm = hr >= 12 ? 'PM' : 'AM';
  hr = hr % 12;
  hr = hr ? hr : 12;
  min = min < 10 ? '0' + min : min;
  return `${hr}:${min} ${ampm}`;
}


// --- Synergy Matcher Engine ---
function initSynergyMatcher() {
  const rejectBtn = document.getElementById('synergy-reject-btn');
  const connectBtn = document.getElementById('synergy-connect-btn');
  
  rejectBtn.addEventListener('click', () => {
    swipeCard('left');
  });
  
  connectBtn.addEventListener('click', () => {
    swipeCard('right');
  });
  
  renderMatcherCard();
  renderConnectionsList();
}

function renderMatcherCard() {
  const container = document.getElementById('matcher-card');
  const index = state.currentMatcherIndex;
  
  if(index >= state.matcherProfiles.length) {
    container.innerHTML = `
      <div class="p-8 text-center flex-grow flex flex-col items-center justify-center" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
        <i class="fa-solid fa-face-smile-wink text-primary mb-4" style="font-size: 48px; margin-bottom: 16px;"></i>
        <h3>You're All Caught Up!</h3>
        <p class="text-muted text-sm mt-2">No more profile recommendations inside your PM cohort right now. Check back tomorrow for more matches!</p>
      </div>
    `;
    document.querySelector('.matcher-actions-buttons').style.display = 'none';
    return;
  }
  
  const p = state.matcherProfiles[index];
  container.innerHTML = `
    <div class="matcher-card-hero">
      <span class="match-percentage-badge">${p.matchPct} Synergy</span>
      <div class="matcher-avatar-large">${p.avatar}</div>
      <h2>${p.name}</h2>
      <p class="matcher-title">${p.role}</p>
      <span class="matcher-cohort">${p.cohort}</span>
    </div>
    <div class="matcher-card-body">
      <div>
        <div class="matcher-section-title">Professional Background</div>
        <p class="text-sm">Industry Focus: <strong>${p.industry}</strong></p>
      </div>
      <div>
        <div class="matcher-section-title font-size-sm">Top Skills</div>
        <div class="matcher-skills-list">
          ${p.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
        </div>
      </div>
      <div>
        <div class="matcher-section-title">About & Objectives</div>
        <div class="matcher-about">
          <p>"${p.about}"</p>
        </div>
      </div>
      <div>
        <div class="matcher-section-title">Preferred Study Schedule</div>
        <div class="matcher-details-row">
          <span>Times</span>
          <span class="val">${p.schedule}</span>
        </div>
      </div>
    </div>
  `;
}

function swipeCard(direction) {
  const card = document.getElementById('matcher-card');
  
  if(direction === 'left') {
    card.classList.add('swipe-left');
    setTimeout(() => {
      nextProfile();
    }, 400);
  } else {
    card.classList.add('swipe-right');
    setTimeout(() => {
      // Trigger Celebration for Sneha
      const p = state.matcherProfiles[state.currentMatcherIndex];
      triggerMatchCelebration(p);
    }, 400);
  }
}

function nextProfile() {
  state.currentMatcherIndex++;
  const card = document.getElementById('matcher-card');
  card.className = "matcher-card glass";
  renderMatcherCard();
}

function triggerMatchCelebration(peer) {
  // Add to state connections
  state.connections.push({
    name: peer.name,
    role: peer.role.split('@')[0].trim(),
    avatar: peer.avatar
  });
  
  // Increment counters
  state.connectionsCount++;
  document.getElementById('sidebar-points-val').textContent = `${state.accredianPoints} AP`;
  document.getElementById('stat-connections-count').textContent = state.connectionsCount;
  document.getElementById('connections-count').textContent = state.connections.length;
  
  // Pre-load celebration popup
  document.getElementById('match-peer-name').textContent = peer.name;
  document.getElementById('match-partner-avatar').textContent = peer.avatar;
  
  // Show Celebration modal
  const modal = document.getElementById('match-celebration');
  modal.classList.remove('hidden');
  
  // Set triggers
  document.getElementById('btn-celebration-chat').onclick = () => {
    modal.classList.add('hidden');
    navigateToTab('canvas'); // jump to workspace
    nextProfile();
  };
  
  document.getElementById('btn-celebration-close').onclick = () => {
    modal.classList.add('hidden');
    nextProfile();
  };
  
  renderConnectionsList();
}

function renderConnectionsList() {
  const container = document.getElementById('connections-list-container');
  container.innerHTML = '';
  
  state.connections.forEach(c => {
    const card = document.createElement('div');
    card.className = "connection-item-card";
    card.innerHTML = `
      <div class="avatar">${c.avatar}</div>
      <div class="connection-item-info">
        <h4>${c.name}</h4>
        <p>${c.role}</p>
      </div>
      <i class="fa-solid fa-message text-muted" style="font-size: 14px"></i>
    `;
    
    card.addEventListener('click', () => {
      // Redirect to private channel
      navigateToTab('pulse');
    });
    
    container.appendChild(card);
  });
}


// --- Canvas Workspace: Kanban tasks board ---
function initCanvasKanban() {
  // Canvas Sub-tabs controller
  const canvasTabs = document.querySelectorAll('.btn-canvas-tab');
  canvasTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      canvasTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const sub = tab.getAttribute('data-subtab');
      document.querySelectorAll('.canvas-pane').forEach(pane => {
        if(pane.id === `subtab-${sub}`) {
          pane.classList.add('active');
          if(sub === 'whiteboard') {
            resizeWhiteboardCanvas(); // ensure canvas sizes properly
          }
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // Drag and Drop implementation
  const columns = document.querySelectorAll('.kanban-column');
  columns.forEach(col => {
    col.addEventListener('dragover', (e) => {
      e.preventDefault();
      col.classList.add('drag-over');
    });
    
    col.addEventListener('dragleave', () => {
      col.classList.remove('drag-over');
    });
    
    col.addEventListener('drop', (e) => {
      e.preventDefault();
      col.classList.remove('drag-over');
      const taskId = e.dataTransfer.getData('text/plain');
      const targetStatus = col.getAttribute('data-status');
      
      updateTaskStatus(parseInt(taskId), targetStatus);
    });
  });

  // Task creation Form & Modals
  const addTaskBtn = document.getElementById('add-kanban-task-btn');
  const modal = document.getElementById('task-modal');
  const cancelBtn = document.getElementById('btn-cancel-task');
  const closeBtn = document.getElementById('close-task-modal');
  const form = document.getElementById('task-form');
  
  addTaskBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });
  
  const closeModal = () => modal.classList.add('hidden');
  cancelBtn.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value.trim();
    const assignee = document.getElementById('task-assignee').value;
    const tag = document.getElementById('task-tag').value;
    
    if(!title) return;
    
    // Add new task status: todo
    const newTask = {
      id: Date.now(),
      title: title,
      assignee: assignee,
      tag: tag,
      status: 'todo'
    };
    
    state.tasks.push(newTask);
    form.reset();
    closeModal();
    renderKanbanBoard();
  });
  
  renderKanbanBoard();
}

function renderKanbanBoard() {
  const cols = {
    todo: document.getElementById('cards-todo'),
    inprogress: document.getElementById('cards-inprogress'),
    review: document.getElementById('cards-review'),
    done: document.getElementById('cards-done')
  };
  
  const counts = {
    todo: document.getElementById('count-todo'),
    inprogress: document.getElementById('count-inprogress'),
    review: document.getElementById('count-review'),
    done: document.getElementById('count-done')
  };
  
  // Clear lists
  Object.keys(cols).forEach(k => {
    cols[k].innerHTML = '';
    counts[k].textContent = '0';
  });
  
  state.tasks.forEach(t => {
    const card = document.createElement('div');
    card.className = 'kanban-card';
    card.draggable = true;
    card.setAttribute('data-id', t.id);
    
    card.innerHTML = `
      <div class="card-tag-row">
        <span class="task-tag ${t.tag}">${t.tag}</span>
        <div class="card-actions-btn-group">
          <button class="btn-card-del" onclick="deleteKanbanCard(${t.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
      <h5>${t.title}</h5>
      <div class="card-footer">
        <div class="task-assignee">${t.assignee}</div>
      </div>
    `;
    
    // Attach drag actions
    card.addEventListener('dragstart', (e) => {
      card.classList.add('dragging');
      e.dataTransfer.setData('text/plain', t.id);
    });
    
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
    });
    
    // Append to corresponding column
    if(cols[t.status]) {
      cols[t.status].appendChild(card);
      // Increment count
      counts[t.status].textContent = parseInt(counts[t.status].textContent) + 1;
    }
  });
}

function updateTaskStatus(id, newStatus) {
  const task = state.tasks.find(t => t.id === id);
  if(task) {
    task.status = newStatus;
    renderKanbanBoard();
  }
}

window.deleteKanbanCard = function(id) {
  state.tasks = state.tasks.filter(t => t.id !== id);
  renderKanbanBoard();
};


// --- Canvas Workspace: Interactive Whiteboard Canvas ---
let isDrawing = false;
let drawColor = '#6366f1';
let brushSize = 5;
let drawTool = 'select'; // select, draw, eraser
let ctx = null;

function initCanvasWhiteboard() {
  const canvas = document.getElementById('whiteboard-canvas');
  ctx = canvas.getContext('2d');
  
  const addStickyBtn = document.getElementById('add-sticky-btn');
  const clearBoardBtn = document.getElementById('clear-board-btn');
  
  const toolSelect = document.getElementById('tool-select');
  const toolDraw = document.getElementById('tool-draw');
  const toolEraser = document.getElementById('tool-eraser');
  const brushControls = document.getElementById('brush-controls');
  const brushSizeInput = document.getElementById('brush-size');
  
  // Set default sticky notes
  createStickyNote("Define problem statements & hypothesis.", 50, 80, "yellow");
  createStickyNote("Competitive analysis of Zoom vs. WhatsApp", 240, 100, "blue");
  
  // Resize handler
  window.addEventListener('resize', resizeWhiteboardCanvas);
  
  // Tool switching
  const setTool = (tool) => {
    drawTool = tool;
    toolSelect.classList.remove('active');
    toolDraw.classList.remove('active');
    toolEraser.classList.remove('active');
    
    if(tool === 'select') {
      toolSelect.classList.add('active');
      brushControls.classList.add('hidden');
      canvas.style.pointerEvents = 'none'; // click through canvas to sticky notes
    } else if(tool === 'draw') {
      toolDraw.classList.add('active');
      brushControls.classList.remove('hidden');
      canvas.style.pointerEvents = 'auto'; // allow drawing
      ctx.globalCompositeOperation = 'source-over';
    } else if(tool === 'eraser') {
      toolEraser.classList.add('active');
      brushControls.classList.remove('hidden');
      canvas.style.pointerEvents = 'auto';
      ctx.globalCompositeOperation = 'destination-out';
    }
  };
  
  toolSelect.addEventListener('click', () => setTool('select'));
  toolDraw.addEventListener('click', () => setTool('draw'));
  toolEraser.addEventListener('click', () => setTool('eraser'));
  
  brushSizeInput.addEventListener('input', (e) => {
    brushSize = e.target.value;
  });
  
  // Color Picker handler
  const colorCircles = document.querySelectorAll('.color-circle');
  colorCircles.forEach(c => {
    c.addEventListener('click', () => {
      colorCircles.forEach(cc => cc.classList.remove('active'));
      c.classList.add('active');
      drawColor = c.getAttribute('data-color');
    });
  });
  
  // Whiteboard drawing logic
  const startDraw = (e) => {
    if(drawTool === 'select') return;
    isDrawing = true;
    ctx.beginPath();
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = drawColor;
    
    const rect = canvas.getBoundingClientRect();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };
  
  const draw = (e) => {
    if(!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };
  
  const stopDraw = () => {
    isDrawing = false;
  };
  
  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);
  
  // Clear board
  clearBoardBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('sticky-container').innerHTML = '';
  });
  
  // Sticky notes
  addStickyBtn.addEventListener('click', () => {
    const colors = ["yellow", "green", "pink", "blue"];
    const col = colors[Math.floor(Math.random() * colors.length)];
    createStickyNote("New Sticky Note...", 100, 100, col);
  });
}

function resizeWhiteboardCanvas() {
  const canvas = document.getElementById('whiteboard-canvas');
  const parent = canvas.parentElement;
  
  // Save drawing state before resize
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(canvas, 0, 0);
  
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;
  
  // Restore drawing
  ctx.drawImage(tempCanvas, 0, 0);
}

function createStickyNote(text, x, y, color) {
  const container = document.getElementById('sticky-container');
  const note = document.createElement('div');
  note.className = `sticky-note ${color}`;
  note.style.left = `${x}px`;
  note.style.top = `${y}px`;
  
  note.innerHTML = `
    <textarea>${text}</textarea>
    <div class="sticky-controls">
      <button class="btn-sticky-action text-danger" onclick="this.parentElement.parentElement.remove()"><i class="fa-solid fa-trash"></i></button>
      <div>
        <button class="btn-sticky-action" onclick="changeStickyColor(this.parentElement.parentElement.parentElement, 'yellow')">🟡</button>
        <button class="btn-sticky-action" onclick="changeStickyColor(this.parentElement.parentElement.parentElement, 'green')">🟢</button>
        <button class="btn-sticky-action" onclick="changeStickyColor(this.parentElement.parentElement.parentElement, 'pink')">🌸</button>
        <button class="btn-sticky-action" onclick="changeStickyColor(this.parentElement.parentElement.parentElement, 'blue')">🔵</button>
      </div>
    </div>
  `;
  
  // Handle dragging
  let dragX = 0, dragY = 0;
  note.addEventListener('mousedown', (e) => {
    // If clicking text area or buttons, don't drag
    if(e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON' || e.target.tagName === 'I') return;
    
    e.preventDefault();
    dragX = e.clientX - note.offsetLeft;
    dragY = e.clientY - note.offsetTop;
    
    const moveNote = (moveEvent) => {
      note.style.left = `${moveEvent.clientX - dragX}px`;
      note.style.top = `${moveEvent.clientY - dragY}px`;
    };
    
    const releaseNote = () => {
      document.removeEventListener('mousemove', moveNote);
      document.removeEventListener('mouseup', releaseNote);
    };
    
    document.addEventListener('mousemove', moveNote);
    document.addEventListener('mouseup', releaseNote);
  });
  
  container.appendChild(note);
}

window.changeStickyColor = function(noteNode, colorName) {
  // Remove existing color classes
  noteNode.classList.remove('yellow', 'green', 'pink', 'blue');
  noteNode.classList.add(colorName);
};


// --- Spotlight Portfolio Share ---
function initSpotlight() {
  const shareBtn = document.getElementById('linkedin-share-btn');
  const toast = document.getElementById('toast-notif');
  
  shareBtn.addEventListener('click', () => {
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  });
}


// --- Gamified Quest & Rewards Shop Engine ---
function initQuests() {
  // Redeem Rewards Buttons logic
  const redeemBtns = document.querySelectorAll('.redeem-btn');
  const successModal = document.getElementById('rewards-modal');
  const rewardName = document.getElementById('unlocked-reward-name');
  const closeSuccessBtn = document.getElementById('btn-close-rewards-modal');
  
  redeemBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cost = parseInt(btn.getAttribute('data-cost'));
      const reward = btn.getAttribute('data-reward');
      
      if(state.accredianPoints >= cost) {
        // Deduct points
        state.accredianPoints -= cost;
        document.getElementById('sidebar-points-val').textContent = `${state.accredianPoints} AP`;
        
        // Show success modal
        rewardName.textContent = reward;
        successModal.classList.remove('hidden');
      } else {
        alert(`Insufficient Accredian Points. You need ${cost - state.accredianPoints} more AP to redeem this reward. Participate in study circles and answer peer doubts to earn more!`);
      }
    });
  });
  
  closeSuccessBtn.addEventListener('click', () => {
    successModal.classList.add('hidden');
  });
}

function completeQuest(questKey, apReward, xpReward) {
  state.quests[questKey] = true;
  
  // Award Points & XP
  state.accredianPoints += apReward;
  state.xp += xpReward;
  
  // Handle Level Up
  let leveledUp = false;
  if(state.xp >= state.xpTarget) {
    state.level++;
    state.xp = state.xp - state.xpTarget;
    leveledUp = true;
  }
  
  // Update sidebar elements
  document.getElementById('sidebar-points-val').textContent = `${state.accredianPoints} AP`;
  
  // Update stats grid on overview if exists
  const apCard = document.querySelector('.stat-card .stat-info h3');
  if(apCard) apCard.textContent = state.accredianPoints;
  
  // Update Quest Hub UI Elements
  const xpVal = document.getElementById('xp-val');
  if(xpVal) xpVal.textContent = state.xp;
  
  const progressBar = document.getElementById('xp-progress-bar');
  if(progressBar) {
    const pct = (state.xp / state.xpTarget) * 100;
    progressBar.style.width = `${pct}%`;
  }
  
  // Update quest item visual checks
  if(questKey === 'ask') {
    const chk = document.getElementById('chk-quest-ask');
    if(chk) {
      chk.className = "fa-solid fa-circle-check text-success";
      const card = document.getElementById('quest-card-ask');
      if(card) {
        card.classList.add('completed');
        const actBtn = card.querySelector('.btn-quest-action');
        if(actBtn) actBtn.outerHTML = '<span class="quest-status-text">Completed</span>';
      }
    }
  }
  
  // Celebration notification
  if(leveledUp) {
    alert(`🎉 Level Up! You reached Level ${state.level}! Keep contributing to the community.`);
  } else {
    // Show a mini top warning/toast or notification alert
    const toast = document.getElementById('toast-notif');
    if(toast) {
      toast.querySelector('.toast-message').textContent = `Quest Completed! +${apReward} AP and +${xpReward} XP earned.`;
      toast.querySelector('.toast-icon').className = "fa-solid fa-trophy text-warning toast-icon";
      toast.classList.add('active');
      setTimeout(() => {
        toast.classList.remove('active');
        // Reset classes
        toast.querySelector('.toast-icon').className = "fa-solid fa-circle-check text-success toast-icon";
      }, 4000);
    }
  }
}
