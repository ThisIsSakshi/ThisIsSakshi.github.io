const profile = {
  About: {
    text: "Hi, I'm Sakshi. I build fast, thoughtful products with polished UI and clean engineering.",
    link: "mailto:sakshi@example.com"
  },
  Skills: {
    text: "Tech stack: JavaScript, React, Node.js, Python, SQL, Git, APIs, and product-minded problem solving.",
    link: "https://github.com/your-username"
  },
  Projects: {
    text: "I ship web products, dashboards, and automation projects focused on performance and business impact.",
    link: "https://github.com/your-username?tab=repositories"
  },
  Contact: {
    text: "Open to roles and collaborations. Let's build something delightful and high-impact.",
    link: "https://linkedin.com/in/your-linkedin"
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
  panelLink: document.getElementById("panelLink"),
  leftBtn: document.getElementById("leftBtn"),
  rightBtn: document.getElementById("rightBtn"),
  jumpBtn: document.getElementById("jumpBtn")
};

const cfg = {
  worldWidth: 3400,
  playerWidth: 44,
  groundY: 72,
  speed: 4.4,
  jumpPower: 13.5,
  gravity: 0.72
};

const state = {
  x: 120,
  y: 0,
  vx: 0,
  vy: 0,
  onGround: true,
  facingLeft: false,
  cameraX: 0,
  coins: 0,
  keys: new Set(),
  activeZone: "",
  typingTimer: null
};

function typeText(el, text, speed = 17) {
  if (state.typingTimer) clearInterval(state.typingTimer);
  el.textContent = "";
  let i = 0;

  state.typingTimer = setInterval(() => {
    el.textContent += text[i] || "";
    i += 1;
    if (i >= text.length) {
      clearInterval(state.typingTimer);
      state.typingTimer = null;
    }
  }, speed);
}

function setPanel(zone) {
  if (zone === state.activeZone) return;
  const info = profile[zone];
  if (!info) return;

  state.activeZone = zone;
  els.zoneName.textContent = zone;
  els.panelTitle.textContent = zone;
  typeText(els.panelText, info.text);
  els.panelLink.href = info.link;
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
  else state.activeZone = "";
}

function updateCoins() {
  els.coins.forEach((coin) => {
    if (coin.dataset.collected === "1") return;

    const cx = parseFloat(coin.style.left) + 14;
    const nearX = Math.abs((state.x + cfg.playerWidth / 2) - cx) < 26;
    const nearY = state.y < 62;

    if (nearX && nearY) {
      coin.dataset.collected = "1";
      coin.classList.add("collected");
      state.coins += 1;
      els.coinCount.textContent = String(state.coins);
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
    els.playerSprite.classList.add("jump");
    setTimeout(() => els.playerSprite.classList.remove("jump"), 180);
  }
}

function applyPhysics() {
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
  const press = (e) => { e.preventDefault(); state.keys.add(key); };
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

els.viewport.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });

els.pipes.forEach((pipe) => {
  pipe.addEventListener("click", () => {
    state.x = Number(pipe.dataset.x) - 20;
    setPanel(pipe.dataset.zone);
  });
});

requestAnimationFrame(gameLoop);
