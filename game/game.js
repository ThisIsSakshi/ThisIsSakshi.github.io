const profile = {
  About: {
    name: "Sakshi Sharma",
    title: "Senior Python Developer | Backend Engineer",
    location: "India",
    email: "mailto:thisissakshisharma@gmail.com",
    github: "https://github.com/ThisIsSakshi",
    linkedin: "https://www.linkedin.com/in/its-sakshi/",
    leetcode: "https://leetcode.com/u/Sakshi-Sharma/",
    stackOverflow: "https://stackoverflow.com/users/8655468/sakshi-sharma",
    hackerrank: "https://www.hackerrank.com/profile/ThisisSakshi",
    summary: `
      Hi, I'm Sakshi, a senior Python developer and technical mentor
      specializing in backend engineering, scalable system design, and
      workflow driven applications.

      I build production grade systems using Flask, SQLAlchemy 2.0,
      PostgreSQL, and modern frontend integrations. I focus on clean
      architecture, performance optimization, and maintainable code.
    `
  },

  Skills: {
    Languages: [
      "Python",
      "SQL",
      "HTML5",
      "CSS3"
    ],

    Frameworks: [
      "Flask",
      "Django",
      "Numpy",
      "Pandas",
      "Flask-WTF",
      "Bulma CSS"
    ],

    Databases: [
      "PostgreSQL",
      "SQLite"
    ],

    ORM_Tools: [
      "SQLAlchemy 2.0"
    ],

    DevOps_Cloud: [
      "AWS",
      "Git",
      "GitHub",
      "Linux"
    ],
    Technologies_and_Tools: [
      "Git",
      "Jira",
      "Heroku",
      "Jenkins"
    ],
    Concepts: [
      "REST API Design",
      "Relational Database Design",
      "Workflow Systems",
      "Caching Strategies",
      "Authentication & Authorization",
      "Secure Form Handling",
      "System Architecture",
      "Audit Trails & Logging"
    ],

    profileLink: "https://github.com/ThisIsSakshi"
  },

  Experience: [
    {
      company: "Net-Square Solutions",
      role: "Python Developer",
      duration: "June 2024 - Present",
      location: "Remote",
      clients: ["BT"],
      responsibilities: [
        "Designed and developed internal guest, asset, and logistics management systems for large scale event operations",
        "Implemented guest check-in workflows and attendance tracking modules",
        "Built Tshirt allocation and hotel night management features",
        "Designed relational database schema using SQLAlchemy 2.0 standards",
        "Ensured scalable backend architecture using Flask"
      ],
      technologies: [
        "Python",
        "Flask",
        "PostgreSQL",
        "SQLAlchemy 2.0"
      ]
    },
    {
      company: "UST Global",
      role: "Lead Software Developer",
      duration: "November 2018 - June 2024",
      location: "Bangalore, India",
      clients: ["NetApp", "Major Insurance Client", "Internal Finance & HR"],
      responsibilities: [
        "Led backend development and architectural decisions across multiple enterprise solutions",
        "Migrated backend systems to ASUP.NEXT platform ensuring seamless data continuity",
        "Optimized data retrieval using parallel processing techniques from platform REST APIs",
        "Built automated insurance validation systems for enterprise clients",
        "Developed internal automation and ticketing platforms for HR and financial operations",
        "Implemented performance focused backend services using Flask and Python based microservices",
        "Collaborated with cross functional teams for production deployments and CI/CD pipelines"
      ],
      technologies: [
        "Python",
        "Flask",
        "Nuclio",
        "MongoDB",
        "Solr",
        "Azure",
        "PyMuPDF",
        "PyPDF4"
      ]
    }
  ],

  Projects: [
    {
      name: "Budgio",
      description: `
        A full scale budget management and approval workflow system.
        Features request handling, multi-level approvals, dynamic
        request types, asset tagging, notifications, and audit trails.
      `,
      techStack: ["Flask", "SQLAlchemy 2.0", "PostgreSQL", "Bulma"],
      link: null
    },
    {
      name: "Snoopcon",
      description: `
        Guest management and event tracking system with Tshirt
        mapping, hotel nights tracking, and relational data modeling.
      `,
      techStack: ["Flask", "PostgreSQL", "Flask-WTF"],
      link: null
    },
    {
      name: "Supersafe",
      description: `
        Pentest and domain management system with dynamic forms,
        caching, and secure request lifecycle handling.
      `,
      techStack: ["Flask", "SQLAlchemy", "JavaScript"],
      link: null
    }
  ],

  Achievements: [
    {
      title: "UStar Recognition Award",
      date: "May, 2022",
      detail: "UST CodeGround"
    },
    {
      title: "Competition 3.0 Finalist",
      date: "Jan, 2022",
      detail: "UST CodeGround"
    },
    {
      title: "Competition 2.0 Finalist",
      date: "Oct, 2020",
      detail: "UST CodeGround"
    },
    "Designed full relational systems from scratch",
    "Built dynamic DB driven form engines",
    "Mentored developers on production grade backend practices",
    "Optimized database performance using execution-level control",
    
  ],

  Contact: {
    message: "Open to backend engineering roles, system design projects, and technical collaborations.",
    email: "mailto:thisissakshisharma@gmail.com",
    linkedin: "https://www.linkedin.com/in/its-sakshi/",
    github: "https://github.com/ThisIsSakshi",
    instagram: "https://www.instagram.com/emotional_geek/",
    facebook: "https://www.facebook.com/This.is.Sakshi"
  }
};

const els = {
  world: document.getElementById("world"),
  viewport: document.getElementById("viewport"),
  player: document.getElementById("player"),
  playerSprite: document.getElementById("playerSprite"),
  pipes: [...document.querySelectorAll(".pipe")],
  coins: [...document.querySelectorAll(".coin")],
  coinCount: document.getElementById("coinCount"),
  zoneName: document.getElementById("zoneName"),
  panel: document.getElementById("panel"),
  panelTitle: document.getElementById("panelTitle"),
  panelText: document.getElementById("panelText"),
  soundBtn: document.getElementById("soundBtn"),
  leftBtn: document.getElementById("leftBtn"),
  rightBtn: document.getElementById("rightBtn"),
  jumpBtn: document.getElementById("jumpBtn")
};

const cfg = {
  worldWidth: 4200,
  playerWidth: 44,
  playerHeight: 56,
  coinSize: 28,
  groundY: 72,
  speed: 4.4,
  jumpPower: 13.5,
  gravity: 0.72
};

const state = {
  x: 120,
  prevX: 120,
  y: 0,
  prevY: 0,
  vx: 0,
  vy: 0,
  onGround: true,
  facingLeft: false,
  cameraX: 0,
  coins: 0,
  keys: new Set(),
  activeZone: "",
  soundEnabled: true
};

function setupSharedCursor() {
  if (typeof window.setupSparkleCursor !== "function") {
    return;
  }

  window.setupSparkleCursor({
    heartCursor: "../assets/cursor-heart.gif",
    pointerCursor: "../assets/pointer.png"
  });
}

const audio = {
  ctx: null,
  master: null,
  unlocked: false,
  primed: false,
  loading: false,
  supported: true,
  unlockPromise: null
};

const audioUnlockEvents = ["pointerdown", "touchstart", "keydown"];
let audioUnlockHandler = null;
const AUDIO_RESUME_TIMEOUT_MS = 600;
const AUDIO_RESUME_ATTEMPTS = 2;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function removeAudioUnlockListeners() {
  if (!audioUnlockHandler) return;
  audioUnlockEvents.forEach((eventName) => {
    window.removeEventListener(eventName, audioUnlockHandler, true);
  });
}

function initAudio() {
  if (audio.ctx) return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    audio.supported = false;
    return;
  }

  try {
    audio.ctx = new AudioCtx({ latencyHint: "interactive" });
  } catch (_) {
    audio.ctx = new AudioCtx();
  }
  audio.master = audio.ctx.createGain();
  audio.master.gain.value = 0.28;
  audio.master.connect(audio.ctx.destination);
  audio.ctx.addEventListener("statechange", () => {
    audio.unlocked = audio.ctx.state === "running";
    if (audio.unlocked) {
      primeAudioEngine();
      removeAudioUnlockListeners();
      audioUnlockHandler = null;
    }
    updateSoundButton();
  });
}

function primeAudioEngine() {
  if (!audio.ctx || !audio.master || audio.primed) return;

  const now = audio.ctx.currentTime;
  const osc = audio.ctx.createOscillator();
  const amp = audio.ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(440, now);
  amp.gain.setValueAtTime(0.00001, now);
  amp.gain.exponentialRampToValueAtTime(0.00001, now + 0.02);

  osc.connect(amp);
  amp.connect(audio.master);
  osc.start(now);
  osc.stop(now + 0.02);
  audio.primed = true;
}

async function resumeAudioContext() {
  if (!audio.ctx) return false;
  if (audio.ctx.state === "running") return true;

  try {
    await Promise.race([
      audio.ctx.resume(),
      wait(AUDIO_RESUME_TIMEOUT_MS)
    ]);
  } catch (_) {
    // Ignore and allow retry attempts.
  }

  return audio.ctx.state === "running";
}

async function unlockAudio() {
  initAudio();
  if (!audio.ctx) {
    audio.supported = false;
    updateSoundButton();
    return false;
  }

  if (audio.unlockPromise) {
    return audio.unlockPromise;
  }

  audio.loading = true;
  updateSoundButton();
  audio.unlockPromise = (async () => {
    for (let attempt = 0; attempt < AUDIO_RESUME_ATTEMPTS; attempt += 1) {
      if (!audio.ctx) return false;
      const running = await resumeAudioContext();
      if (running) break;
      await wait(70);
    }

    audio.unlocked = audio.ctx.state === "running";
    if (audio.unlocked) {
      primeAudioEngine();
    }
    return audio.unlocked;
  })();

  try {
    return await audio.unlockPromise;
  } finally {
    audio.loading = false;
    audio.unlockPromise = null;
    updateSoundButton();
  }
}

function playTone({
  freq = 440,
  duration = 0.09,
  type = "sine",
  gain = 0.12,
  glideTo = 0,
  offset = 0
} = {}) {
  if (!state.soundEnabled || !audio.unlocked || !audio.ctx || !audio.master) return;
  if (audio.ctx.state !== "running") return;

  const now = audio.ctx.currentTime + 0.005 + offset;
  const osc = audio.ctx.createOscillator();
  const amp = audio.ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  if (glideTo > 0) {
    osc.frequency.exponentialRampToValueAtTime(glideTo, now + duration);
  }

  amp.gain.setValueAtTime(0.0001, now);
  amp.gain.exponentialRampToValueAtTime(gain, now + 0.01);
  amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(amp);
  amp.connect(audio.master);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

function playJumpSound() {
  playTone({ freq: 260, glideTo: 520, type: "square", duration: 0.1, gain: 0.11 });
}

function playCoinSound() {
  playTone({ freq: 880, glideTo: 1240, type: "triangle", duration: 0.08, gain: 0.14 });
  playTone({ freq: 1320, glideTo: 1580, type: "triangle", duration: 0.08, gain: 0.11, offset: 0.05 });
}

function playZoneSound() {
  playTone({ freq: 510, glideTo: 680, type: "sine", duration: 0.09, gain: 0.11 });
  playTone({ freq: 740, glideTo: 960, type: "sine", duration: 0.1, gain: 0.09, offset: 0.06 });
}

function updateSoundButton() {
  if (!els.soundBtn) return;
  if (!audio.supported) {
    els.soundBtn.textContent = "🔇 No Sound";
    els.soundBtn.classList.remove("is-loading");
    els.soundBtn.disabled = true;
    els.soundBtn.setAttribute("aria-pressed", "true");
    els.soundBtn.setAttribute("aria-busy", "false");
    return;
  }

  els.soundBtn.classList.toggle("is-loading", audio.loading);
  els.soundBtn.disabled = audio.loading;
  els.soundBtn.setAttribute("aria-busy", String(audio.loading));

  if (audio.loading) {
    els.soundBtn.textContent = "⏳ Sound Loading";
    els.soundBtn.setAttribute("aria-pressed", "false");
    return;
  }

  els.soundBtn.textContent = state.soundEnabled ? "🔊 Sound" : "🔈 Muted";
  els.soundBtn.setAttribute("aria-pressed", String(!state.soundEnabled));
}

function setupSoundControls() {
  audio.supported = Boolean(window.AudioContext || window.webkitAudioContext);
  initAudio();
  updateSoundButton();
  if (!audio.supported) return;

  audioUnlockHandler = async () => {
    const unlocked = await unlockAudio();
    if (!unlocked) return;

    removeAudioUnlockListeners();
    audioUnlockHandler = null;
  };

  window.addEventListener("pointerdown", audioUnlockHandler, { passive: true, capture: true });
  window.addEventListener("touchstart", audioUnlockHandler, { passive: true, capture: true });
  window.addEventListener("keydown", audioUnlockHandler, { capture: true });

  if (!els.soundBtn) return;
  els.soundBtn.addEventListener("click", async () => {
    if (!audio.supported || audio.loading) return;

    const wasUnlocked = audio.unlocked;
    const unlocked = await unlockAudio();
    if (!wasUnlocked && unlocked) {
      state.soundEnabled = true;
      removeAudioUnlockListeners();
      audioUnlockHandler = null;
      updateSoundButton();
      playTone({ freq: 620, glideTo: 860, type: "triangle", duration: 0.08, gain: 0.1 });
      return;
    }

    if (!unlocked) return;

    state.soundEnabled = !state.soundEnabled;
    updateSoundButton();
    if (state.soundEnabled) {
      playTone({ freq: 620, glideTo: 860, type: "triangle", duration: 0.08, gain: 0.1 });
    }
  });
}

const skillKeyNames = {
  ORM_Tools: "ORM & Tools",
  DevOps_Cloud: "DevOps & Cloud"
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    };
    return map[char];
  });
}

function splitParagraphs(text) {
  return String(text || "")
    .trim()
    .split(/\n\s*\n/)
    .map((chunk) => chunk.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function renderParagraphs(text) {
  return splitParagraphs(text)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}

function renderLinks(links) {
  return `<div class="panel-links">${links
    .filter((link) => Boolean(link.href))
    .map((link) => `<a class="panel-link" href="${link.href}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`)
    .join("")}</div>`;
}

function renderAboutPanel() {
  const about = profile.About;
  return `
    <section class="hero-card">
      <h3 class="hero-name">${escapeHtml(about.name)}</h3>
      <p class="hero-title">${escapeHtml(about.title)}</p>
      <div class="meta-row">
        <span class="meta-pill">${escapeHtml(about.location)}</span>
      </div>
    </section>
    ${renderParagraphs(about.summary)}
    ${renderLinks([
      { label: "Email", href: about.email },
      { label: "GitHub", href: about.github },
      { label: "LinkedIn", href: about.linkedin },
      { label: "LeetCode", href: about.leetcode },
      { label: "Stack Overflow", href: about.stackOverflow },
      { label: "HackerRank", href: about.hackerrank }
    ])}
  `;
}

function renderSkillsPanel() {
  const skillSections = Object.entries(profile.Skills).filter(([, value]) => Array.isArray(value));
  return `
    ${skillSections.map(([key, values]) => `
      <section class="content-card">
        <h4>${escapeHtml(skillKeyNames[key] || key.replace(/_/g, " "))}</h4>
        <div class="chip-row">
          ${values.map((value) => `<span class="chip">${escapeHtml(value)}</span>`).join("")}
        </div>
      </section>
    `).join("")}
    ${renderLinks([{ label: "GitHub Profile", href: profile.Skills.profileLink }])}
  `;
}

function renderExperiencePanel() {
  return profile.Experience.map((experience) => `
    <article class="content-card">
      <div class="card-head">
        <h4>${escapeHtml(experience.role)} · ${escapeHtml(experience.company)}</h4>
        <span class="meta-pill">${escapeHtml(experience.duration)}</span>
      </div>
      <p class="muted">${escapeHtml(experience.location)}</p>
      ${experience.clients && experience.clients.length ? `
        <div class="chip-row">
          ${experience.clients.map((client) => `<span class="chip">Client: ${escapeHtml(client)}</span>`).join("")}
        </div>
      ` : ""}
      <ul class="panel-list">
        ${experience.responsibilities.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
      ${experience.technologies && experience.technologies.length ? `
        <div class="chip-row">
          ${experience.technologies.map((tech) => `<span class="chip">${escapeHtml(tech)}</span>`).join("")}
        </div>
      ` : ""}
    </article>
  `).join("");
}

function renderProjectsPanel() {
  return profile.Projects.map((project) => `
    <article class="content-card">
      <div class="card-head">
        <h4>${escapeHtml(project.name)}</h4>
      </div>
      ${renderParagraphs(project.description)}
      <div class="chip-row">
        ${project.techStack.map((tool) => `<span class="chip">${escapeHtml(tool)}</span>`).join("")}
      </div>
      ${project.link ? renderLinks([{ label: "Open Project", href: project.link }]) : ""}
    </article>
  `).join("");
}

function renderAchievementsPanel() {
  const achievementRows = profile.Achievements.map((item) => {
    if (typeof item === "string") {
      return `<li>${escapeHtml(item)}</li>`;
    }

    return `
      <li>
        <strong>${escapeHtml(item.title)}</strong>
        <span class="ach-date">${escapeHtml(item.date)}</span>
        ${item.detail ? `<div class="ach-detail">${escapeHtml(item.detail)}</div>` : ""}
      </li>
    `;
  }).join("");

  return `
    <section class="content-card">
      <h4>Highlights</h4>
      <ul class="panel-list">
        ${achievementRows}
      </ul>
    </section>
  `;
}

function renderContactPanel() {
  const contact = profile.Contact;
  return `
    ${renderParagraphs(contact.message)}
    ${renderLinks([
      { label: "Email", href: contact.email },
      { label: "LinkedIn", href: contact.linkedin },
      { label: "GitHub", href: contact.github },
      { label: "Instagram", href: contact.instagram },
      { label: "Facebook", href: contact.facebook }
    ])}
  `;
}

const zoneRenderers = {
  About: renderAboutPanel,
  Skills: renderSkillsPanel,
  Experience: renderExperiencePanel,
  Projects: renderProjectsPanel,
  Achievements: renderAchievementsPanel,
  Contact: renderContactPanel
};

function setSakuraVisibility(zone) {
  document.body.classList.toggle("hide-sakura", zone === "About");
}

function setPanel(zone) {
  if (zone === state.activeZone) return;
  const renderZone = zoneRenderers[zone];
  if (!renderZone) return;

  state.activeZone = zone;
  setSakuraVisibility(zone);
  playZoneSound();
  els.zoneName.textContent = zone;
  els.panelTitle.textContent = zone;
  els.panelText.innerHTML = renderZone();
  els.panel.classList.add("active");
}

function updatePipes() {
  let nearestZone = "";

  els.pipes.forEach((pipe) => {
    const centerX = Number(pipe.dataset.x) + 58;
    const near = Math.abs((state.x + cfg.playerWidth / 2) - centerX) < 95 && state.y < 12;
    pipe.classList.toggle("active", near);
    if (near) nearestZone = pipe.dataset.zone;
  });

  if (nearestZone) setPanel(nearestZone);
  else {
    state.activeZone = "";
    setSakuraVisibility("");
    els.zoneName.textContent = "Start";
  }
}

function updateCoins() {
  const prevPlayerLeft = state.prevX;
  const prevPlayerRight = state.prevX + cfg.playerWidth;
  const prevPlayerBottom = cfg.groundY + state.prevY;
  const prevPlayerTop = prevPlayerBottom + cfg.playerHeight;

  const playerLeft = state.x;
  const playerRight = state.x + cfg.playerWidth;
  const playerBottom = cfg.groundY + state.y;
  const playerTop = playerBottom + cfg.playerHeight;

  const sweepLeft = Math.min(prevPlayerLeft, playerLeft);
  const sweepRight = Math.max(prevPlayerRight, playerRight);
  const sweepBottom = Math.min(prevPlayerBottom, playerBottom);
  const sweepTop = Math.max(prevPlayerTop, playerTop);
  const isJumping = state.y > 0 || state.prevY > 0;

  els.coins.forEach((coin) => {
    if (coin.dataset.collected === "1") return;

    const coinLeft = parseFloat(coin.style.left);
    const coinRight = coinLeft + cfg.coinSize;
    const coinBottom =
      Number.parseFloat(coin.dataset.bottom || "") ||
      Number.parseFloat(window.getComputedStyle(coin).bottom) ||
      0;
    if (!coin.dataset.bottom) {
      coin.dataset.bottom = String(coinBottom);
    }
    const coinTop = coinBottom + cfg.coinSize;
    const overlapX = sweepRight > coinLeft && sweepLeft < coinRight;
    const overlapY = sweepTop > coinBottom && sweepBottom < coinTop;

    if (isJumping && overlapX && overlapY) {
      coin.dataset.collected = "1";
      coin.classList.add("collected");
      state.coins += 1;
      els.coinCount.textContent = String(state.coins);
      playCoinSound();
      setTimeout(() => coin.remove(), 340);
    }
  });
}

function readInput() {
  const left = state.keys.has("arrowleft") || state.keys.has("a");
  const right = state.keys.has("arrowright") || state.keys.has("d");
  const jump = state.keys.has("arrowup") || state.keys.has("w") || state.keys.has(" ");

  if (left === right) state.vx = 0;
  else if (left) { state.vx = -cfg.speed; state.facingLeft = true; }
  else { state.vx = cfg.speed; state.facingLeft = false; }

  if (jump && state.onGround) {
    state.vy = cfg.jumpPower;
    state.onGround = false;
    playJumpSound();
    els.playerSprite.classList.add("jump");
    setTimeout(() => els.playerSprite.classList.remove("jump"), 180);
  }
}

function applyPhysics() {
  const prevX = state.x;
  const prevY = state.y;
  state.vy -= cfg.gravity;
  state.x += state.vx;
  state.y += state.vy;

  if (state.y <= 0) {
    state.y = 0;
    state.vy = 0;
    state.onGround = true;
  }

  const maxX = cfg.worldWidth - cfg.playerWidth;
  state.x = Math.max(0, Math.min(maxX, state.x));
  state.prevX = prevX;
  state.prevY = prevY;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpColor(hex1, hex2, t) {
  const a = hex1.replace("#", "");
  const b = hex2.replace("#", "");

  const r = Math.round(lerp(parseInt(a.slice(0, 2), 16), parseInt(b.slice(0, 2), 16), t));
  const g = Math.round(lerp(parseInt(a.slice(2, 4), 16), parseInt(b.slice(2, 4), 16), t));
  const bl = Math.round(lerp(parseInt(a.slice(4, 6), 16), parseInt(b.slice(4, 6), 16), t));

  return `rgb(${r}, ${g}, ${bl})`;
}

function updateDayCycle() {
  const t = Math.max(0, Math.min(1, state.x / (cfg.worldWidth - cfg.playerWidth)));
  const top = lerpColor("#8be9ff", "#ff8fb8", t);
  const bottom = lerpColor("#d7f7ff", "#7a5cff", t);
  const ambient = lerp(1, 0.82, t);

  document.documentElement.style.setProperty("--skyTop", top);
  document.documentElement.style.setProperty("--skyBottom", bottom);
  document.documentElement.style.setProperty("--ambient", String(ambient));
}

function render() {
  const vw = els.viewport.clientWidth;
  const targetCam = Math.max(0, Math.min(cfg.worldWidth - vw, state.x - vw * 0.42));
  state.cameraX += (targetCam - state.cameraX) * 0.12;

  els.world.style.transform = `translateX(${-state.cameraX}px)`;
  els.player.style.left = `${state.x}px`;
  els.player.style.bottom = `${cfg.groundY + state.y}px`;
  els.player.style.transform = state.facingLeft ? "scaleX(-1)" : "scaleX(1)";

  if (Math.abs(state.vx) > 0.1 && state.onGround) {
    els.playerSprite.classList.add("run");
  } else {
    els.playerSprite.classList.remove("run");
  }
}

function gameLoop() {
  readInput();
  applyPhysics();
  updateCoins();
  updatePipes();
  updateDayCycle();
  render();
  requestAnimationFrame(gameLoop);
}

function bindHold(button, key) {
  const press = (e) => {
    e.preventDefault();
    if (!audio.unlocked) {
      unlockAudio();
    }
    state.keys.add(key);
  };
  const release = (e) => { e.preventDefault(); state.keys.delete(key); };

  button.addEventListener("touchstart", press, { passive: false });
  button.addEventListener("touchend", release, { passive: false });
  button.addEventListener("touchcancel", release, { passive: false });
  button.addEventListener("pointerdown", press);
  button.addEventListener("pointerup", release);
  button.addEventListener("pointercancel", release);
  button.addEventListener("lostpointercapture", release);
}

window.addEventListener("keydown", (e) => state.keys.add(e.key.toLowerCase()));
window.addEventListener("keyup", (e) => state.keys.delete(e.key.toLowerCase()));

bindHold(els.leftBtn, "arrowleft");
bindHold(els.rightBtn, "arrowright");
bindHold(els.jumpBtn, " ");

setupSharedCursor();
setupSoundControls();

els.viewport.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });

els.pipes.forEach((pipe) => {
  pipe.addEventListener("click", () => {
    state.x = Number(pipe.dataset.x) - 20;
    setPanel(pipe.dataset.zone);
  });
});

requestAnimationFrame(gameLoop);
