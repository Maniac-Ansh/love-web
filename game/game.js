/**
 * THE LOVE QUEST: Interactive Romantic Game Engine
 * Chapter 1: The Verification Gate & Runaway Button
 */

// ==========================================================================
// 1. GAME STATE & AUDIO ENGINE
// ==========================================================================
const GameState = {
  playerName: localStorage.getItem("love_quest_player_name") || "Riuu 👑",
  currentChapter: 1,
  soundEnabled: true
};

// Web Audio API Synthesizer for Arcade & Romantic SFX
let audioCtx = null;

function getAudioContext() {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch (e) {
    return null;
  }
}

const SoundFX = {
  // Warm heartbeat pulse sound
  heartbeat: () => {
    if (!GameState.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [0, 0.22].forEach(delay => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(80, now + delay);
        osc.frequency.exponentialRampToValueAtTime(45, now + delay + 0.14);
        gain.gain.setValueAtTime(0.18, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.16);
      });
    } catch (e) {}
  },

  // Sweet kiss pop and shimmering twinkle
  kiss: () => {
    if (!GameState.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.08);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);

      [880, 1174.66, 1396.91, 1760].forEach((freq, idx) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "triangle";
        o.frequency.setValueAtTime(freq, now + 0.08 + idx * 0.04);
        g.gain.setValueAtTime(0.001, now + 0.08 + idx * 0.04);
        g.gain.linearRampToValueAtTime(0.08, now + 0.08 + idx * 0.04 + 0.01);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.08 + idx * 0.04 + 0.25);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(now + 0.08 + idx * 0.04);
        o.stop(now + 0.08 + idx * 0.04 + 0.25);
      });
    } catch (e) {}
  },

  // Rhythmic running footsteps
  footsteps: () => {
    if (!GameState.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      for (let i = 0; i < 4; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(520 + (i % 2) * 80, now + i * 0.2);
        gain.gain.setValueAtTime(0.05, now + i * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.2 + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.2);
        osc.stop(now + i * 0.2 + 0.08);
      }
    } catch (e) {}
  },

  // Error buzzer sound for wrong password
  buzzer: () => {
    if (!GameState.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.setValueAtTime(105, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.38);
    } catch (e) {}
  },

  // Angelic harp fanfare for Pink Theme Transformation
  angelicReveal: () => {
    if (!GameState.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98];
      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.001, now + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 1.2);
      });
    } catch (e) {}
  },

  // Zipper opening sound
  zipperOpen: () => {
    if (!GameState.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      for (let i = 0; i < 8; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(600 + i * 90, now + i * 0.025);
        gain.gain.setValueAtTime(0.05, now + i * 0.025);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.025 + 0.02);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.025);
        osc.stop(now + i * 0.025 + 0.02);
      }
    } catch (e) {}
  },

  // Playful dodge sound when NO button flees
  dodge: () => {
    if (!GameState.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  },

  // Click chime
  click: () => {
    if (!GameState.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(659.25, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  },

  // Perfect match chime
  matchSuccess: () => {
    if (!GameState.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [659.25, 830.61, 987.77, 1318.51];
      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.001, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.1, now + idx * 0.05 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.35);
      });
    } catch (e) {}
  },

  // Gentle differ chime
  differGentle: () => {
    if (!GameState.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [440, 554.37].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.07, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    } catch (e) {}
  },

  // Victory fanfare for Level Complete
  levelComplete: () => {
    if (!GameState.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [
        { f: 523.25, t: 0.0, d: 0.15 },
        { f: 659.25, t: 0.12, d: 0.15 },
        { f: 783.99, t: 0.24, d: 0.18 },
        { f: 1046.5, t: 0.36, d: 0.6 }
      ];
      const now = ctx.currentTime;
      notes.forEach(n => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(n.f, now + n.t);
        gain.gain.setValueAtTime(0.001, now + n.t);
        gain.gain.linearRampToValueAtTime(0.12, now + n.t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d);
      });
    } catch (e) {}
  },

  // Victory fanfare for YES button
  victory: () => {
    if (!GameState.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [
        { f: 523.25, t: 0.0, d: 0.15 },
        { f: 659.25, t: 0.12, d: 0.15 },
        { f: 783.99, t: 0.24, d: 0.18 },
        { f: 1046.5, t: 0.36, d: 0.55 },
        { f: 1318.5, t: 0.50, d: 0.70 }
      ];
      const now = ctx.currentTime;
      notes.forEach(n => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(n.f, now + n.t);
        gain.gain.setValueAtTime(0.001, now + n.t);
        gain.gain.linearRampToValueAtTime(0.12, now + n.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d);
      });
    } catch (e) {}
  },

  // Satisfying tactile scratch sound effect
  scratch: () => {
    if (!GameState.soundEnabled) return;
    const now = Date.now();
    if (now - (SoundFX._lastScratchTime || 0) < 65) return;
    SoundFX._lastScratchTime = now;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const t = ctx.currentTime;
      osc.frequency.setValueAtTime(550 + Math.random() * 350, t);
      osc.frequency.exponentialRampToValueAtTime(160, t + 0.04);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.04);
    } catch (e) {}
  }
};

// ==========================================================================
// 2. DOM ELEMENTS & INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initBackgroundCanvas();
  initHUD();
  initLevel1Gate();
  initDoor2Quiz();
  initDoor3();
  initDoor4();
  initDoor5();
  initDoor6();
  initCustomizationModal();
  handleDirectDoorRouting();
});

// Direct Door Navigation via URL hash (#door4) or query parameter (?door=4)
function handleDirectDoorRouting() {
  const hash = window.location.hash.toLowerCase();
  const params = new URLSearchParams(window.location.search);
  const doorParam = params.get("door") || params.get("d");

  let targetDoor = null;
  if (doorParam) {
    targetDoor = doorParam.toLowerCase();
  } else if (hash) {
    targetDoor = hash.replace("#", "");
  }

  if (!targetDoor) return;

  const allScreens = [
    "screen-welcome",
    "screen-door-1",
    "screen-door-2",
    "screen-door-3",
    "screen-door-4",
    "screen-door-5",
    "screen-door-6"
  ];
  allScreens.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  if (targetDoor === "4" || targetDoor === "door4" || targetDoor === "door-4" || targetDoor === "musicbox") {
    const d4 = document.getElementById("screen-door-4");
    if (d4) d4.style.display = "block";

    // Directly reveal the Music Box Chamber
    const passCard = document.getElementById("door4-password-card");
    const titleBox = document.getElementById("door4-title-box");
    const dialogueBox = document.getElementById("door4-dialogue-box");
    const musicScene = document.getElementById("door4-musicbox-scene");
    if (passCard) passCard.style.display = "none";
    if (titleBox) titleBox.style.display = "none";
    if (dialogueBox) dialogueBox.style.display = "none";
    if (musicScene) musicScene.style.display = "flex";

    const hudQuest = document.getElementById("hud-quest-name");
    if (hudQuest) hudQuest.textContent = "Door 4: The Enchanted Music Box 🎵";
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (targetDoor === "6" || targetDoor === "door6" || targetDoor === "door-6" || targetDoor === "out-of-the-heart" || targetDoor === "heart-exit" || targetDoor === "mystery") {
    isDarkRomanceThemeActive = false;
    const d6 = document.getElementById("screen-door-6");
    if (d6) d6.style.display = "block";
    const hudQuest = document.getElementById("hud-quest-name");
    if (hudQuest) hudQuest.textContent = "Door 6: Out of the Heart 🕊️🎁";
    setTimeout(() => { initDoor6Scratch(); }, 60);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (targetDoor === "5" || targetDoor === "door5" || targetDoor === "door-5" || targetDoor === "secret") {
    const d5 = document.getElementById("screen-door-5");
    if (d5) d5.style.display = "block";
    const hudQuest = document.getElementById("hud-quest-name");
    if (hudQuest) hudQuest.textContent = "Door 5: The Secret Room 🗝️🍷";
    activateDarkRomanceTheme();
    setTimeout(() => { initScratchCard(); }, 60);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (targetDoor === "3" || targetDoor === "door3" || targetDoor === "door-3") {
    isDarkRomanceThemeActive = false;
    const d3 = document.getElementById("screen-door-3");
    if (d3) d3.style.display = "block";
    const hudQuest = document.getElementById("hud-quest-name");
    if (hudQuest) hudQuest.textContent = "Door 3: The Sacred Bond 🎒";
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (targetDoor === "2" || targetDoor === "door2" || targetDoor === "door-2") {
    isDarkRomanceThemeActive = false;
    const d2 = document.getElementById("screen-door-2");
    if (d2) d2.style.display = "block";
    const hudQuest = document.getElementById("hud-quest-name");
    if (hudQuest) hudQuest.textContent = "Door 2: Heart Resonance 💖";
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (targetDoor === "1" || targetDoor === "door1" || targetDoor === "door-1") {
    isDarkRomanceThemeActive = false;
    const d1 = document.getElementById("screen-door-1");
    if (d1) d1.style.display = "block";
    const hudQuest = document.getElementById("hud-quest-name");
    if (hudQuest) hudQuest.textContent = "Door 1: The Sacred Gate 🗝️";
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    isDarkRomanceThemeActive = false;
  }
}

window.addEventListener("hashchange", handleDirectDoorRouting);

// Update HUD elements
function updateHUD() {
  const nameEl = document.getElementById("hud-player-name");
  if (nameEl) nameEl.textContent = GameState.playerName;
}

function initHUD() {
  updateHUD();

  // Sound toggle button
  const soundBtn = document.getElementById("sound-btn");
  const soundIcon = document.getElementById("sound-icon");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      GameState.soundEnabled = !GameState.soundEnabled;
      soundIcon.textContent = GameState.soundEnabled ? "🔊" : "🔇";
    });
  }
}

// ==========================================================================
// 3. DOOR 1: THE SACRED VERIFICATION GATE & PASSWORD CHECK
// ==========================================================================
let isPinkThemeActive = false;
let pinkPetals = [];

function spawnPinkPetals() {
  pinkPetals = [];
  const count = 38;
  for (let i = 0; i < count; i++) {
    pinkPetals.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 8 + 16,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: Math.random() * 1.6 + 1.2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      emoji: Math.random() > 0.4 ? "🌸" : (Math.random() > 0.5 ? "💖" : "🌹")
    });
  }
}

function initLevel1Gate() {
  // Screen 1: Welcome Screen -> Start Tour
  const startTourBtn = document.getElementById("btn-start-tour");
  if (startTourBtn) {
    startTourBtn.addEventListener("click", () => {
      SoundFX.click();
      document.getElementById("screen-welcome").style.display = "none";
      document.getElementById("screen-door-1").style.display = "block";
      document.getElementById("hud-quest-name").textContent = "Door 1: The Sacred Gate";
    });
  }

  // Pretest: Prettiest girl question & runaway button
  const yesBtn = document.getElementById("btn-verify-yes");
  const noBtn = document.getElementById("btn-verify-no");
  const pretestCard = document.getElementById("door1-pretest-card");
  const hintEl = document.getElementById("no-button-hint");
  const passwordCard = document.getElementById("door1-password-card");
  const passwordForm = document.getElementById("door1-password-form");
  const passwordInput = document.getElementById("door1-password-input");
  const errorBanner = document.getElementById("door1-error-banner");
  const successCard = document.getElementById("door1-success-card");
  const nextLvlBtn = document.getElementById("btn-start-level-2");
  const dialogueText = document.getElementById("door1-dialogue-text");

  const mischievousTaunts = [
    "(P.S. Try clicking 'NO' if you dare...)",
    "Nice try! Too slow, cutie! 🏃‍♀️💨",
    "Nope! That button is physically impossible to press! 💖",
    "Error 404: 'No' does not exist in our universe! ✨",
    "You know in your heart the answer is YES! 🥰",
    "Resistance is futile, Riuu! 👑",
    "Almost got it... just kidding! 😜"
  ];

  let tauntIndex = 0;
  let dodgeCount = 0;

  function dodge() {
    dodgeCount++;
    SoundFX.dodge();

    if (!pretestCard || !noBtn) return;
    const cardRect = pretestCard.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = (cardRect.width / 2) - (btnRect.width / 2) - 20;
    const maxY = 70;

    const randomX = (Math.random() - 0.5) * (maxX * 2);
    const randomY = (Math.random() - 0.5) * (maxY * 2);

    noBtn.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${(Math.random() - 0.5) * 20}deg)`;

    tauntIndex = (tauntIndex + 1) % mischievousTaunts.length;
    if (hintEl) {
      hintEl.textContent = mischievousTaunts[tauntIndex];
      hintEl.style.color = "#fcd34d";
    }

    if (dodgeCount >= 3 && yesBtn) {
      yesBtn.style.transform = "scale(1.14)";
      yesBtn.style.boxShadow = "0 0 50px rgba(255, 77, 121, 1)";
    }
  }

  if (noBtn) {
    noBtn.addEventListener("mouseenter", dodge);
    noBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      dodge();
    });
    noBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dodge();
    });
  }

  // Pretest YES clicked -> Proceed to Password Challenge
  if (yesBtn) {
    yesBtn.addEventListener("click", () => {
      SoundFX.click();
      pretestCard.style.display = "none";
      passwordCard.style.display = "block";
      if (dialogueText) {
        dialogueText.textContent = "Okay, but final verification is done only after a question... What is the password to enter? Check your card 1.";
      }
      if (passwordInput) {
        passwordInput.focus();
      }
    });
  }

  // Password Submission Verification
  if (passwordForm) {
    passwordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const enteredPass = passwordInput.value.trim();

      // Check if password matches Riuu1817 (case-insensitive)
      if (enteredPass.toLowerCase() === "riuu1817") {
        // SUCCESS: Transform screen to beautiful light pink paradise!
        errorBanner.style.display = "none";
        document.body.classList.add("pink-theme");
        isPinkThemeActive = true;
        spawnPinkPetals();

        // Sound fanfare
        SoundFX.angelicReveal();
        SoundFX.victory();

        // Particle shower
        createCelebrationParticles(window.innerWidth / 2, window.innerHeight * 0.45);

        // Overcharge Love Meter on HUD
        const meterFill = document.getElementById("love-meter-fill");
        const meterText = document.getElementById("love-meter-text");
        if (meterFill && meterText) {
          meterFill.style.width = "100%";
          meterFill.style.background = "linear-gradient(90deg, #ff758c, #ff4d79, #fcd34d)";
          meterText.textContent = "9999% ❤️";
        }

        // Hide password card, show success card with heartfelt message
        passwordCard.style.display = "none";
        successCard.style.display = "block";
        document.getElementById("hud-quest-name").textContent = "Door 1: Unlocked 🌸";
        if (dialogueText) {
          dialogueText.textContent = "Welcome home, my Riuu 💖 Every beat of my heart belongs to you.";
        }
      } else {
        // WRONG PASSWORD: Show protective error message!
        SoundFX.buzzer();
        errorBanner.style.display = "flex";
        errorBanner.classList.remove("angryShake");
        void errorBanner.offsetWidth; // re-trigger css animation
        errorBanner.classList.add("angryShake");
        passwordInput.value = "";
        passwordInput.focus();
      }
    });
  }

  // Transition to Door 2: The Heart Resonance
  if (nextLvlBtn) {
    nextLvlBtn.addEventListener("click", () => {
      SoundFX.click();
      document.getElementById("screen-door-1").style.display = "none";
      document.getElementById("screen-door-2").style.display = "block";
      document.getElementById("hud-quest-name").textContent = "Door 2: The Heart Resonance";
      if (window.startDoor2Quiz) {
        window.startDoor2Quiz();
      }
    });
  }
}

// ==========================================================================
// 4. DOOR 2: THE HEART RESONANCE (10-QUESTION PERCENTAGE MATCH ENGINE)
// ==========================================================================
const DOOR2_QUESTIONS = [
  {
    question: "What is my favorite season?",
    hint: null,
    options: [
      { text: "Winter ❄️", isMatch: true },
      { text: "Summer ☀️", isMatch: false }
    ],
    matchExplanation: "Winter ❄️ Cozy weather, warm hugs, and hot sips with you!"
  },
  {
    question: "Tea or Coffee?",
    hint: null,
    options: [
      { text: "Tea 🍵", isMatch: true },
      { text: "Coffee ☕", isMatch: false }
    ],
    matchExplanation: "Warm soothing tea 🍵 especially when shared together!"
  },
  {
    question: "What do I love the most about Riuu?",
    hint: "💌 Hint: Check your Card 2!",
    options: [
      { text: "Your captivating Eyes ✨", isMatch: true },
      { text: "Your gorgeous Hair 💇‍♀️", isMatch: false }
    ],
    matchExplanation: "Your eyes ✨ I get lost in them every single time I look at you."
  },
  {
    question: "What melts my heart the fastest?",
    hint: null,
    options: [
      { text: "Your cute Cheeks 🌸", isMatch: false },
      { text: "Your radiant Smile 😊", isMatch: true }
    ],
    matchExplanation: "Your smile 😊 It lights up my whole universe in a second."
  },
  {
    question: "Our ideal romantic date night?",
    hint: null,
    options: [
      { text: "Cozy movie night & cuddles at home 🎬", isMatch: true },
      { text: "Fancy luxury restaurant dinner 🍷", isMatch: false }
    ],
    matchExplanation: "Cozy movie night & cuddles 🎬 Nothing beats being wrapped up with you."
  },
  {
    question: "My absolute favorite way to feel close to you?",
    hint: null,
    options: [
      { text: "Holding your hands tightly 🤝", isMatch: true },
      { text: "Sweet gentle forehead kisses 💋", isMatch: false }
    ],
    matchExplanation: "Holding your hands 🤝 Fingers intertwined, feeling your warmth and never letting go!"
  },
  {
    question: "When we are apart, what do I crave most?",
    hint: null,
    options: [
      { text: "Reading through all our cute texts 💬", isMatch: false },
      { text: "Hearing your sweet voice on call 📞", isMatch: true }
    ],
    matchExplanation: "Hearing your voice 📞 It brings instant peace to my heart."
  },
  {
    question: "If we could escape anywhere right now?",
    hint: null,
    options: [
      { text: "A quiet snowy mountain cabin 🏔️", isMatch: true },
      { text: "A sunny beach watching the sunset 🌅", isMatch: false }
    ],
    matchExplanation: "A quiet snowy mountain cabin 🏔️ Warm blankets, snowfall, and you."
  },
  {
    question: "Who loves who more in this relationship?",
    hint: null,
    options: [
      { text: "I love you more! 💖", isMatch: false },
      { text: "Impossible—My love for you is infinite! ♾️", isMatch: true }
    ],
    matchExplanation: "My love for you is infinite ♾️ You can't beat infinite, cutie!"
  },
  {
    question: "Where is my favorite place in the entire world?",
    hint: null,
    options: [
      { text: "Wherever you are by my side 🌍", isMatch: false },
      { text: "Wrapped tightly in your arms 🤗", isMatch: true }
    ],
    matchExplanation: "Right in your arms 🤗 My safest and favorite place forever."
  }
];

let currentQuizIndex = 0;
let quizMatchCount = 0;
let isOptionLocked = false;

function initDoor2Quiz() {
  const btnOpt0 = document.getElementById("btn-opt-0");
  const btnOpt1 = document.getElementById("btn-opt-1");
  const btnStartDoor3 = document.getElementById("btn-start-door-3");

  if (btnOpt0) {
    btnOpt0.addEventListener("click", () => handleOptionSelect(0));
  }
  if (btnOpt1) {
    btnOpt1.addEventListener("click", () => handleOptionSelect(1));
  }

  if (btnStartDoor3) {
    btnStartDoor3.addEventListener("click", () => {
      SoundFX.click();
      document.getElementById("screen-door-2").style.display = "none";
      document.getElementById("screen-door-3").style.display = "block";
      document.getElementById("hud-quest-name").textContent = "Door 3: The Sacred Bond";
    });
  }

  window.startDoor2Quiz = function() {
    currentQuizIndex = 0;
    quizMatchCount = 0;
    isOptionLocked = false;

    document.getElementById("quiz-question-card").style.display = "flex";
    document.getElementById("quiz-result-card").style.display = "none";
    document.getElementById("quiz-reaction-banner").style.display = "none";

    renderQuizQuestion(0);
  };
}

function renderQuizQuestion(index) {
  const q = DOOR2_QUESTIONS[index];
  const total = DOOR2_QUESTIONS.length;

  // Update progress texts & bar
  document.getElementById("quiz-progress-text").textContent = `Question ${index + 1} of ${total}`;
  const pctProgress = ((index + 1) / total) * 100;
  document.getElementById("quiz-progress-fill").style.width = `${pctProgress}%`;

  // Match counter
  const runningPct = index === 0 ? 0 : Math.round((quizMatchCount / index) * 100);
  document.getElementById("quiz-match-counter").textContent = `Match: ${runningPct}%`;

  // Question text
  document.getElementById("quiz-question-text").textContent = q.question;

  // Hint tag
  const hintTag = document.getElementById("quiz-hint-tag");
  const hintText = document.getElementById("quiz-hint-text");
  if (q.hint) {
    hintText.textContent = q.hint;
    hintTag.style.display = "inline-flex";
  } else {
    hintTag.style.display = "none";
  }

  // Option buttons reset
  const btn0 = document.getElementById("btn-opt-0");
  const btn1 = document.getElementById("btn-opt-1");

  btn0.className = "quiz-opt-btn";
  btn1.className = "quiz-opt-btn";
  btn0.disabled = false;
  btn1.disabled = false;

  document.getElementById("btn-opt-0-text").textContent = q.options[0].text;
  document.getElementById("btn-opt-1-text").textContent = q.options[1].text;
  document.getElementById("btn-opt-0-status").textContent = "";
  document.getElementById("btn-opt-1-status").textContent = "";

  // Hide reaction banner
  document.getElementById("quiz-reaction-banner").style.display = "none";

  // Retrigger card animation
  const card = document.getElementById("quiz-question-card");
  card.style.animation = "none";
  void card.offsetWidth;
  card.style.animation = "";
}

function handleOptionSelect(choiceIdx) {
  if (isOptionLocked) return;
  isOptionLocked = true;

  const q = DOOR2_QUESTIONS[currentQuizIndex];
  const chosen = q.options[choiceIdx];
  const otherIdx = choiceIdx === 0 ? 1 : 0;

  const btnChosen = document.getElementById(`btn-opt-${choiceIdx}`);
  const btnOther = document.getElementById(`btn-opt-${otherIdx}`);
  const statusChosen = document.getElementById(`btn-opt-${choiceIdx}-status`);
  const statusOther = document.getElementById(`btn-opt-${otherIdx}-status`);

  const banner = document.getElementById("quiz-reaction-banner");
  const reactionIcon = document.getElementById("quiz-reaction-icon");
  const reactionText = document.getElementById("quiz-reaction-text");

  btnChosen.disabled = true;
  btnOther.disabled = true;

  if (chosen.isMatch) {
    // Matched!
    quizMatchCount++;
    SoundFX.matchSuccess();
    btnChosen.classList.add("is-matched");
    statusChosen.textContent = "💖";

    reactionIcon.textContent = "✨";
    reactionText.textContent = `A perfect match! ${q.matchExplanation}`;
  } else {
    // Differed gently
    SoundFX.differGentle();
    btnChosen.classList.add("is-differ");
    statusChosen.textContent = "💭";

    btnOther.classList.add("is-correct-reveal");
    statusOther.textContent = "💖";

    reactionIcon.textContent = "💌";
    reactionText.textContent = `A sweet thought! But my heart chose: ${q.matchExplanation}`;
  }

  banner.style.display = "flex";

  // Update running percentage
  const runningPct = Math.round((quizMatchCount / (currentQuizIndex + 1)) * 100);
  document.getElementById("quiz-match-counter").textContent = `Match: ${runningPct}%`;

  // Advance after gentle delay
  setTimeout(() => {
    currentQuizIndex++;
    if (currentQuizIndex < DOOR2_QUESTIONS.length) {
      isOptionLocked = false;
      renderQuizQuestion(currentQuizIndex);
    } else {
      showQuizResults();
    }
  }, 1700);
}

function showQuizResults() {
  document.getElementById("quiz-question-card").style.display = "none";
  const resultCard = document.getElementById("quiz-result-card");
  resultCard.style.display = "flex";

  const total = DOOR2_QUESTIONS.length;
  const finalPct = Math.round((quizMatchCount / total) * 100);

  document.getElementById("bp-matches-text").textContent = `${quizMatchCount} / ${total} Answers Matched`;
  document.getElementById("quiz-match-counter").textContent = `Final: ${finalPct}%`;

  // Sound and grand multi-wave confetti!
  SoundFX.levelComplete();
  SoundFX.angelicReveal();
  launchGrandConfetti();

  // Elements for pouring liquid colors heart
  const liquidBody = document.getElementById("heart-liquid-body");
  const waveGroup = document.getElementById("heart-liquid-wave-group");
  const pctText = document.getElementById("heart-percentage-val");
  const streamWrap = document.getElementById("pouring-stream-wrap");

  if (streamWrap) streamWrap.style.opacity = "1";

  // Liquid animation: Bottom tip is Y=87, Top cleft is Y=8 (range = 79 units)
  const duration = 2400; // ms
  const startTime = performance.now();

  function animateLiquid(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    // Smooth ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);

    const currentPct = Math.round(ease * finalPct);
    const targetY = 87 - (ease * finalPct / 100) * 79;
    const liquidHeight = Math.max(0, 100 - targetY + 10);

    if (liquidBody) {
      liquidBody.setAttribute("y", targetY);
      liquidBody.setAttribute("height", liquidHeight);
    }
    if (waveGroup) {
      waveGroup.setAttribute("transform", `translate(0, ${targetY})`);
    }
    if (pctText) {
      pctText.textContent = `${currentPct}%`;
    }

    if (progress < 1) {
      requestAnimationFrame(animateLiquid);
    } else {
      // Pouring stream fades out once filled
      if (streamWrap) streamWrap.style.opacity = "0";
      if (pctText) pctText.textContent = `${finalPct}%`;
      // Extra celebratory confetti fountain upon complete heart fill!
      launchGrandConfetti();
    }
  }
  requestAnimationFrame(animateLiquid);

  // Message & "THE PERFECT MATCH"
  const pmTitle = document.getElementById("perfect-match-title");
  const pmDesc = document.getElementById("perfect-match-desc");

  if (finalPct >= 90) {
    if (pmTitle) pmTitle.textContent = "THE PERFECT MATCH";
    if (pmDesc) pmDesc.textContent = `"Every single beat of my heart resonates with yours. You are my once-in-a-lifetime soulmate, Riuu."`;
  } else if (finalPct >= 70) {
    if (pmTitle) pmTitle.textContent = "A BEAUTIFUL MATCH";
    if (pmDesc) pmDesc.textContent = `"Our hearts beat in sweet harmony! Every little quirk makes our love even more special."`;
  } else {
    if (pmTitle) pmTitle.textContent = "SWEET OPPOSITES MATCH";
    if (pmDesc) pmDesc.textContent = `"Opposites attract and every detail gives me another reason to love you endlessly!"`;
  }
}

// ==========================================================================
// 5. GRAND MULTI-WAVE CELEBRATION CONFETTI ENGINE
// ==========================================================================
function launchGrandConfetti() {
  const colors = ["#ff4d79", "#fcd34d", "#ff758c", "#38bdf8", "#c084fc", "#ffffff", "#fb7185", "#34d399"];
  const icons = ["💖", "✨", "🌸", "🌹", "🎉", "👑", "💕", "⭐"];

  function fireBurst(originX, originY, angleMin, angleMax, count) {
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const isEmoji = Math.random() > 0.42;

      if (isEmoji) {
        el.textContent = icons[Math.floor(Math.random() * icons.length)];
        el.style.fontSize = `${Math.random() * 16 + 16}px`;
      } else {
        const w = Math.random() * 8 + 8;
        const h = Math.random() * 14 + 10;
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
        el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        el.style.borderRadius = Math.random() > 0.5 ? "2px" : "50%";
        el.style.boxShadow = `0 0 10px ${el.style.backgroundColor}`;
      }

      el.style.position = "fixed";
      el.style.left = `${originX}px`;
      el.style.top = `${originY}px`;
      el.style.pointerEvents = "none";
      el.style.zIndex = "9999";
      el.style.willChange = "transform, opacity";

      const angle = angleMin + Math.random() * (angleMax - angleMin);
      const velocity = Math.random() * 450 + 260;
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity;
      const rotX = Math.random() * 720;
      const rotY = Math.random() * 720;
      const duration = Math.random() * 1.2 + 1.6;

      el.style.transition = `transform ${duration}s cubic-bezier(0.12, 0.8, 0.32, 1), opacity ${duration}s ease`;
      document.body.appendChild(el);

      requestAnimationFrame(() => {
        el.style.transform = `translate3d(${destX}px, ${destY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        el.style.opacity = "0";
      });

      setTimeout(() => el.remove(), duration * 1000 + 100);
    }
  }

  // Wave 1: Immediate cannons from bottom-left, bottom-right, and central fountain
  fireBurst(window.innerWidth * 0.15, window.innerHeight * 0.85, -Math.PI * 0.5, -Math.PI * 0.15, 32);
  fireBurst(window.innerWidth * 0.85, window.innerHeight * 0.85, -Math.PI * 0.85, -Math.PI * 0.5, 32);
  fireBurst(window.innerWidth * 0.5, window.innerHeight * 0.45, 0, Math.PI * 2, 36);

  // Wave 2: Secondary cannons at 550ms
  setTimeout(() => {
    fireBurst(window.innerWidth * 0.2, window.innerHeight * 0.8, -Math.PI * 0.45, -Math.PI * 0.1, 26);
    fireBurst(window.innerWidth * 0.8, window.innerHeight * 0.8, -Math.PI * 0.9, -Math.PI * 0.55, 26);
  }, 550);

  // Wave 3: Heart-level burst at 1200ms
  setTimeout(() => {
    fireBurst(window.innerWidth * 0.5, window.innerHeight * 0.35, 0, Math.PI * 2, 40);
  }, 1200);

  // Wave 4: Grand finale shower at 1900ms
  setTimeout(() => {
    fireBurst(window.innerWidth * 0.25, window.innerHeight * 0.9, -Math.PI * 0.45, -Math.PI * 0.2, 22);
    fireBurst(window.innerWidth * 0.75, window.innerHeight * 0.9, -Math.PI * 0.8, -Math.PI * 0.55, 22);
  }, 1900);
}

function createCelebrationParticles(originX, originY) {
  launchGrandConfetti();
}

// ==========================================================================
// 6. DOOR 3: THE SACRED BOND (COUPLE WALK, BAG OPEN & ZERO FEET APART)
// ==========================================================================
function initDoor3() {
  const passwordForm = document.getElementById("door3-password-form");
  const passwordInput = document.getElementById("door3-password-input");
  const errorBanner = document.getElementById("door3-error-banner");
  const passwordCard = document.getElementById("door3-password-card");
  const dialogueBox = document.getElementById("door3-dialogue-box");
  const titleBox = document.getElementById("door3-title-box");
  const walkScene = document.getElementById("door3-walk-scene");
  const coupleBagContainer = document.getElementById("couple-bag-container");
  const backpack = document.getElementById("school-backpack");
  const zeroFeetCard = document.getElementById("zero-feet-message-card");

  let isBagOpened = false;
  const btnUnzipD3 = document.getElementById("btn-unzip-bag-d3");

  function triggerBagOpen() {
    if (isBagOpened) return;
    isBagOpened = true;

    try { SoundFX.zipperOpen(); } catch (e) {}
    try { SoundFX.angelicReveal(); } catch (e) {}

    // Add bag opened class
    if (backpack) backpack.classList.add("bag-opened");

    // Animate couple walking together (0 distance)
    const coupleWrap = document.getElementById("couple-animation-wrap");
    if (coupleWrap) {
      coupleWrap.style.gap = "0px";
    }

    // Hide hint pill & unzip button
    const hintPill = document.getElementById("walk-hint-pill");
    if (hintPill) hintPill.style.display = "none";
    if (btnUnzipD3) btnUnzipD3.style.display = "none";

    // Launch the fullscreen Sea of Hearts animation from bag
    const bagRect = coupleBagContainer ? coupleBagContainer.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
    try { startSeaOfHeartsAnimation(bagRect.left + bagRect.width / 2, bagRect.top + bagRect.height / 2); } catch (e) {}

    // Launch multiple confetti bursts
    try { launchGrandConfetti(); } catch (e) {}

    // Reveal the "I want to stay 0 feet apart from you..." card
    setTimeout(() => {
      if (zeroFeetCard) {
        zeroFeetCard.style.display = "block";
        zeroFeetCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      try { SoundFX.victory(); } catch (e) {}
      try { launchGrandConfetti(); } catch (e) {}
    }, 700);
  }

  if (passwordForm) {
    passwordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const entered = passwordInput.value.trim().toLowerCase();

      // Check for 'five feets apart', 'five feet apart'
      if (entered === "five feets apart" || entered === "five feet apart" || entered.includes("five")) {
        try { SoundFX.angelicReveal(); } catch (e) {}
        try { SoundFX.victory(); } catch (e) {}

        // Switch to Twilight theme
        document.body.classList.remove("pink-theme");
        document.body.classList.add("twilight-theme");

        // Hide password elements
        if (errorBanner) errorBanner.style.display = "none";
        if (passwordCard) passwordCard.style.display = "none";
        if (dialogueBox) dialogueBox.style.display = "none";
        if (titleBox) titleBox.style.display = "none";

        // Reveal walking couple scene
        if (walkScene) walkScene.style.display = "flex";
        document.getElementById("hud-quest-name").textContent = "Door 3: Walking Together 🎒";

        try { launchGrandConfetti(); } catch (e) {}
      } else {
        // Wrong password
        try { SoundFX.buzzer(); } catch (e) {}
        if (errorBanner) {
          errorBanner.style.display = "flex";
          errorBanner.classList.remove("angryShake");
          void errorBanner.offsetWidth;
          errorBanner.classList.add("angryShake");
        }
        passwordInput.value = "";
        passwordInput.focus();
      }
    });
  }

  // Handle click on the school bag, the unzip button, or anywhere on walk scene
  if (coupleBagContainer) coupleBagContainer.addEventListener("click", triggerBagOpen);
  if (btnUnzipD3) btnUnzipD3.addEventListener("click", triggerBagOpen);
  if (walkScene) {
    walkScene.addEventListener("click", (e) => {
      if (!isBagOpened && !e.target.closest("button")) {
        triggerBagOpen();
      }
    });
  }

  const btnStartDoor4 = document.getElementById("btn-start-door-4");
  if (btnStartDoor4) {
    btnStartDoor4.addEventListener("click", () => {
      try { SoundFX.click(); } catch (e) {}
      document.getElementById("screen-door-3").style.display = "none";
      const d4Screen = document.getElementById("screen-door-4");
      if (d4Screen) d4Screen.style.display = "block";
      document.getElementById("hud-quest-name").textContent = "Door 4: The Enchanted Music Box 🎵";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// Sea of Hearts Fullscreen Canvas Animation
let seaOfHeartsActive = false;
let seaHearts = [];

function startSeaOfHeartsAnimation(originX, originY) {
  const canvas = document.getElementById("hearts-sea-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  canvas.style.display = "block";
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  seaOfHeartsActive = true;
  seaHearts = [];

  const heartIcons = ["💖", "💕", "🌸", "🌹", "✨", "💗", "💓", "👑", "❤️"];
  const count = 140;

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 3;
    seaHearts.push({
      x: originX || width / 2,
      y: originY || height / 2,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - Math.random() * 4,
      size: Math.random() * 24 + 18,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 4,
      alpha: 0,
      targetAlpha: Math.random() * 0.7 + 0.3,
      floatSpeedY: Math.random() * 1.2 + 0.8,
      floatSpeedX: (Math.random() - 0.5) * 1.2,
      icon: heartIcons[Math.floor(Math.random() * heartIcons.length)],
      isErupted: false
    });
  }

  function renderSea() {
    if (!seaOfHeartsActive) return;
    ctx.clearRect(0, 0, width, height);

    seaHearts.forEach(h => {
      if (!h.isErupted) {
        h.x += h.vx;
        h.y += h.vy;
        h.vx *= 0.94;
        h.vy *= 0.94;
        if (h.alpha < h.targetAlpha) h.alpha += 0.04;
        if (Math.abs(h.vx) < 0.2 && Math.abs(h.vy) < 0.2) {
          h.isErupted = true;
        }
      } else {
        h.y -= h.floatSpeedY;
        h.x += Math.sin(Date.now() * 0.002 + h.size) * 0.8 + h.floatSpeedX;
        h.rotation += h.rotSpeed;

        if (h.y < -40) {
          h.y = height + 40;
          h.x = Math.random() * width;
        }
      }

      ctx.save();
      ctx.translate(h.x, h.y);
      ctx.rotate((h.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, Math.min(1, h.alpha));
      ctx.font = `${h.size}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#ff4d79";
      ctx.fillText(h.icon, 0, 0);
      ctx.restore();
    });

    requestAnimationFrame(renderSea);
  }

  renderSea();
}


// ==========================================================================
// 5. COSMIC BACKGROUND CANVAS
// ==========================================================================
function initBackgroundCanvas() {
  const canvas = document.getElementById("game-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const stars = [];
  for (let i = 0; i < 90; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      color: Math.random() > 0.4 ? "#ffb3c1" : "#fcd34d"
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach(s => {
      s.alpha += s.speed;
      if (s.alpha > 1 || s.alpha < 0.2) s.speed = -s.speed;

      ctx.save();
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
      ctx.shadowBlur = 8;
      ctx.shadowColor = s.color;
      ctx.fill();
      ctx.restore();
    });

    // Render falling pink petals and hearts if pink theme is active
    if (isPinkThemeActive && pinkPetals.length > 0) {
      pinkPetals.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x > width + 30) p.x = -30;
        if (p.x < -30) p.x = width + 30;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#ff758c";
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
      });
    }

    // Render falling dark romance petals, embers & wine drops if dark romance theme is active
    if (isDarkRomanceThemeActive && darkRomancePetals.length > 0) {
      darkRomancePetals.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x > width + 30) p.x = -30;
        if (p.x < -30) p.x = width + 30;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowBlur = 16;
        ctx.shadowColor = p.glowColor;
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
      });
    }

    requestAnimationFrame(render);
  }
  render();
}

let isDarkRomanceThemeActive = false;
let darkRomancePetals = [];

function activateDarkRomanceTheme() {
  isDarkRomanceThemeActive = true;
  isPinkThemeActive = false;
  darkRomancePetals = [];
  const items = [
    { emoji: "🌹", glow: "#e11d48" },
    { emoji: "🥀", glow: "#9f1239" },
    { emoji: "🍷", glow: "#be123c" },
    { emoji: "🕯️", glow: "#f59e0b" },
    { emoji: "✨", glow: "#fcd34d" },
    { emoji: "💋", glow: "#f43f5e" },
    { emoji: "🔥", glow: "#ea580c" },
    { emoji: "💖", glow: "#ff4d79" }
  ];
  const count = 38;
  for (let i = 0; i < count; i++) {
    const item = items[Math.floor(Math.random() * items.length)];
    darkRomancePetals.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speedX: (Math.random() - 0.5) * 1.3,
      speedY: Math.random() * 1.5 + 0.6,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2.5,
      size: Math.random() * 18 + 16,
      emoji: item.emoji,
      glowColor: item.glow
    });
  }
}

// ==========================================================================
// 6. CUSTOMIZATION MODAL (SET PARTNER'S NAME)
// ==========================================================================
function initCustomizationModal() {
  const modal = document.getElementById("name-modal");
  const configBtn = document.getElementById("config-btn");
  const closeBtn = document.getElementById("close-modal-btn");
  const saveBtn = document.getElementById("save-name-btn");
  const input = document.getElementById("partner-name-input");

  if (!modal || !configBtn) return;

  configBtn.addEventListener("click", () => {
    input.value = GameState.playerName;
    modal.style.display = "flex";
    input.focus();
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  saveBtn.addEventListener("click", () => {
    const val = input.value.trim();
    if (val) {
      GameState.playerName = val;
      localStorage.setItem("love_quest_player_name", val);
      updateHUD();
      modal.style.display = "none";
      SoundFX.click();
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}

// ==========================================================================
// 7. DOOR 4: THE ENCHANTED MUSIC BOX (VINTAGE BOX, AUDIO, FLYING NOTES)
// ==========================================================================
function initDoor4() {
  const passwordForm = document.getElementById("door4-password-form");
  const passwordInput = document.getElementById("door4-password-input");
  const errorBanner = document.getElementById("door4-error-banner");
  const passwordCard = document.getElementById("door4-password-card");
  const dialogueBox = document.getElementById("door4-dialogue-box");
  const titleBox = document.getElementById("door4-title-box");
  const musicboxScene = document.getElementById("door4-musicbox-scene");
  const btnSubmitPass = document.getElementById("btn-submit-door4-password");

  const musicBox = document.getElementById("music-box");
  const windupKey = document.getElementById("windup-key");
  const windupKeyWrap = document.getElementById("musicbox-windup-key-wrap");
  const statusBanner = document.getElementById("musicbox-status-banner");
  const statusIcon = document.getElementById("musicbox-status-icon");
  const statusText = document.getElementById("musicbox-status-text");

  const visualizerWrap = document.getElementById("melody-visualizer-wrap");
  const controlsCard = document.getElementById("musicbox-controls-card");
  const letterCard = document.getElementById("musicbox-letter-card");

  const audio = document.getElementById("melody-audio");
  const btnPlayPause = document.getElementById("btn-audio-play-pause");
  const playPauseIcon = document.getElementById("play-pause-icon");
  const playPauseText = document.getElementById("play-pause-text");
  const btnRewind = document.getElementById("btn-audio-rewind");
  const btnForward = document.getElementById("btn-audio-forward");
  const progressTrack = document.getElementById("audio-progress-track");
  const progressFill = document.getElementById("audio-progress-fill");
  const progressThumb = document.getElementById("audio-progress-thumb");
  const timeCurrent = document.getElementById("audio-current-time");
  const timeTotal = document.getElementById("audio-total-time");

  const btnReopen = document.getElementById("btn-reopen-musicbox");
  const btnBackToDoor3 = document.getElementById("btn-back-to-door-3-from-4");

  let isBoxOpened = false;

  function unlockDoor4Gate() {
    try { SoundFX.angelicReveal(); } catch (e) {}
    try { SoundFX.victory(); } catch (e) {}

    if (errorBanner) errorBanner.style.display = "none";
    if (passwordCard) passwordCard.style.display = "none";
    if (dialogueBox) dialogueBox.style.display = "none";
    if (titleBox) titleBox.style.display = "none";

    if (musicboxScene) musicboxScene.style.display = "flex";
    document.getElementById("hud-quest-name").textContent = "Door 4: Music Box 🎵";

    try { launchGrandConfetti(); } catch (e) {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePassSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    unlockDoor4Gate();
  }

  if (passwordForm) passwordForm.addEventListener("submit", handlePassSubmit);
  if (btnSubmitPass) btnSubmitPass.addEventListener("click", handlePassSubmit);

  // OPEN MUSIC BOX & PLAY AUDIO
  function openMusicBox() {
    if (isBoxOpened) {
      togglePlayPause();
      return;
    }
    isBoxOpened = true;

    try { SoundFX.zipperOpen(); } catch (e) {}
    try { SoundFX.matchSuccess(); } catch (e) {}

    // Add opened class to box (swings lid open in 3D, turns gears, lights interior)
    if (musicBox) musicBox.classList.add("box-opened");
    if (windupKey) windupKey.classList.add("winding");

    // Update status banner
    if (statusBanner) {
      if (statusIcon) statusIcon.textContent = "🎶";
      if (statusText) statusText.textContent = "Our enchanted music box is playing! Listen with all your heart 💖";
    }

    // Play Audio with multi-source fallback
    playAudioWithFallback();

    // Start flying musical notes canvas
    startMusicalNotesCanvas();

    // Show visualizer & controls
    if (visualizerWrap) visualizerWrap.style.display = "flex";
    if (controlsCard) {
      controlsCard.style.display = "block";
      controlsCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // Launch confetti celebration
    try { launchGrandConfetti(); } catch (e) {}

    // Reveal Love Letter Card after 1.2s
    setTimeout(() => {
      if (letterCard) {
        letterCard.style.display = "block";
      }
      try { launchGrandConfetti(); } catch (e) {}
    }, 1200);
  }

  function playAudioWithFallback() {
    if (!audio) return;
    if (!audio.src || !audio.src.includes("our-melody")) {
      audio.src = "audio/our-melody.mp3";
    }
    audio.load();
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (playPauseIcon) playPauseIcon.textContent = "⏸️";
          if (playPauseText) playPauseText.textContent = "PAUSE MELODY";
          if (musicBox) musicBox.classList.add("playing");
          setMusicNotesActive(true);
        })
        .catch((err) => {
          console.warn("First audio playback attempt encountered error, trying fallback format:", err);
          audio.src = "audio/our-melody.mpeg";
          audio.load();
          audio
            .play()
            .then(() => {
              if (playPauseIcon) playPauseIcon.textContent = "⏸️";
              if (playPauseText) playPauseText.textContent = "PAUSE MELODY";
              if (musicBox) musicBox.classList.add("playing");
              setMusicNotesActive(true);
            })
            .catch((e) => {
              console.warn("Fallback playback also paused or blocked:", e);
              if (playPauseIcon) playPauseIcon.textContent = "▶️";
              if (playPauseText) playPauseText.textContent = "CLICK TO PLAY MELODY 🎵";
            });
        });
    }
  }

  // Click on box, key, or status to open
  if (musicBox) musicBox.addEventListener("click", openMusicBox);
  if (windupKeyWrap) {
    windupKeyWrap.addEventListener("click", (e) => {
      e.stopPropagation();
      openMusicBox();
    });
  }
  if (statusBanner) statusBanner.addEventListener("click", openMusicBox);

  // Play / Pause toggle
  function togglePlayPause() {
    if (!audio) return;
    if (audio.paused) {
      playAudioWithFallback();
    } else {
      audio.pause();
      if (playPauseIcon) playPauseIcon.textContent = "▶️";
      if (playPauseText) playPauseText.textContent = "RESUME MELODY";
      if (musicBox) musicBox.classList.remove("playing");
      setMusicNotesActive(false);
    }
  }

  if (btnPlayPause) btnPlayPause.addEventListener("click", togglePlayPause);

  // Rewind / Forward 10s
  if (btnRewind && audio) {
    btnRewind.addEventListener("click", () => {
      try { SoundFX.click(); } catch (e) {}
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    });
  }

  if (btnForward && audio) {
    btnForward.addEventListener("click", () => {
      try { SoundFX.click(); } catch (e) {}
      audio.currentTime = Math.min(audio.duration || 9999, audio.currentTime + 10);
    });
  }

  // Time formatting helper
  function formatTime(sec) {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  // Audio Events
  if (audio) {
    audio.addEventListener("loadedmetadata", () => {
      if (timeTotal) timeTotal.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      if (timeCurrent) timeCurrent.textContent = formatTime(audio.currentTime);
      if (audio.duration && progressFill) {
        const pct = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${pct}%`;
        if (progressThumb) progressThumb.style.left = `${pct}%`;
      }
    });

    audio.addEventListener("play", () => {
      if (playPauseIcon) playPauseIcon.textContent = "⏸️";
      if (playPauseText) playPauseText.textContent = "PAUSE MELODY";
      if (musicBox) musicBox.classList.add("playing");
      setMusicNotesActive(true);
    });

    audio.addEventListener("pause", () => {
      if (playPauseIcon) playPauseIcon.textContent = "▶️";
      if (playPauseText) playPauseText.textContent = "RESUME MELODY";
      if (musicBox) musicBox.classList.remove("playing");
      setMusicNotesActive(false);
    });

    audio.addEventListener("ended", () => {
      if (playPauseIcon) playPauseIcon.textContent = "🔄";
      if (playPauseText) playPauseText.textContent = "REPLAY MELODY";
      if (musicBox) musicBox.classList.remove("playing");
      setMusicNotesActive(false);
      try { launchGrandConfetti(); } catch (e) {}
    });
  }

  // Scrubber click to seek
  if (progressTrack && audio) {
    progressTrack.addEventListener("click", (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      if (audio.duration) {
        audio.currentTime = ratio * audio.duration;
      }
    });
  }

  // Replay from beginning button
  if (btnReopen && audio) {
    btnReopen.addEventListener("click", () => {
      try { SoundFX.click(); } catch (e) {}
      audio.currentTime = 0;
      audio.play().catch(() => {});
      if (musicboxScene) musicboxScene.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Back to Door 3 button
  if (btnBackToDoor3) {
    btnBackToDoor3.addEventListener("click", () => {
      try { SoundFX.click(); } catch (e) {}
      if (audio) audio.pause();
      setMusicNotesActive(false);
      document.getElementById("screen-door-4").style.display = "none";
      document.getElementById("screen-door-3").style.display = "block";
      document.getElementById("hud-quest-name").textContent = "Door 3: The Sacred Bond";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Next Door: Door 5 (Secret Room)
  const btnStartDoor5 = document.getElementById("btn-start-door-5");
  if (btnStartDoor5) {
    btnStartDoor5.addEventListener("click", () => {
      try { SoundFX.click(); } catch (e) {}
      try { SoundFX.angelicReveal(); } catch (e) {}
      document.getElementById("screen-door-4").style.display = "none";
      const d5Screen = document.getElementById("screen-door-5");
      if (d5Screen) d5Screen.style.display = "block";
      document.getElementById("hud-quest-name").textContent = "Door 5: The Secret Room 🗝️🍷";
      activateDarkRomanceTheme();
      setTimeout(() => { initScratchCard(); }, 60);
      window.scrollTo({ top: 0, behavior: "smooth" });
      try { launchGrandConfetti(); } catch (e) {}
    });
  }
}

// ==========================================================================
// 8. DOOR 4: FLYING MUSICAL NOTES CANVAS ENGINE
// ==========================================================================
let musicNotesActive = false;
let musicalNotes = [];
let noteSpawnTimer = 0;
let musicNotesCanvasStarted = false;

function setMusicNotesActive(isActive) {
  musicNotesActive = isActive;
}

function spawnMusicalNote(originX, originY, isBurst = false) {
  const noteSymbols = ["🎵", "🎶", "🎼", "✨", "💖", "🌸", "💫", "⭐", "💗", "🎹", "🎻"];
  const colors = ["#ff758c", "#fcd34d", "#f43f5e", "#a78bfa", "#38bdf8", "#fb7185", "#f472b6"];

  const angle = isBurst
    ? Math.random() * Math.PI * 2
    : -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
  const speed = isBurst ? Math.random() * 8 + 3 : Math.random() * 6 + 4;

  musicalNotes.push({
    x: originX,
    y: originY,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: Math.random() * 18 + 20,
    symbol: noteSymbols[Math.floor(Math.random() * noteSymbols.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 4,
    alpha: 0,
    targetAlpha: Math.random() * 0.7 + 0.3,
    age: 0,
    maxAge: Math.random() * 160 + 130,
    waveFreq: Math.random() * 0.04 + 0.02,
    waveAmp: Math.random() * 2.6 + 1.2
  });
}

function startMusicalNotesCanvas() {
  const canvas = document.getElementById("music-notes-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  canvas.style.display = "block";
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  musicNotesActive = true;

  function getMusicBoxCenter() {
    const box = document.getElementById("music-box");
    if (!box) return { x: width / 2, y: height * 0.45 };
    const rect = box.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height * 0.35
    };
  }

  // Initial burst of notes erupting from the box
  const origin = getMusicBoxCenter();
  for (let i = 0; i < 45; i++) {
    spawnMusicalNote(origin.x, origin.y, true);
  }

  if (musicNotesCanvasStarted) return;
  musicNotesCanvasStarted = true;

  // Clicking on canvas/window creates interactive note bursts
  window.addEventListener("click", (e) => {
    if (!musicNotesActive) return;
    if (e.target.closest("button") || e.target.closest("a") || e.target.closest("input")) return;
    for (let i = 0; i < 14; i++) {
      spawnMusicalNote(e.clientX, e.clientY, true);
    }
  });

  function renderMusicNotes() {
    ctx.clearRect(0, 0, width, height);

    const boxCenter = getMusicBoxCenter();

    // Continuously stream notes while melody is active
    if (musicNotesActive) {
      noteSpawnTimer++;
      if (noteSpawnTimer % 4 === 0) {
        spawnMusicalNote(
          boxCenter.x + (Math.random() - 0.5) * 60,
          boxCenter.y + (Math.random() - 0.5) * 20,
          false
        );
      }
    }

    for (let i = musicalNotes.length - 1; i >= 0; i--) {
      const n = musicalNotes[i];
      n.age++;

      // Fade in then out
      if (n.age < 20) {
        n.alpha = (n.age / 20) * n.targetAlpha;
      } else if (n.age > n.maxAge - 35) {
        n.alpha = Math.max(0, ((n.maxAge - n.age) / 35) * n.targetAlpha);
      }

      // Physics: Upward float with sin wave drift
      n.x += n.vx + Math.sin(n.age * n.waveFreq) * n.waveAmp;
      n.y += n.vy;
      n.vx *= 0.98;
      n.vy *= 0.98;
      n.vy -= 0.05; // Gentle upward anti-gravity
      n.rotation += n.rotSpeed;

      ctx.save();
      ctx.translate(n.x, n.y);
      ctx.rotate((n.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, Math.min(1, n.alpha));
      ctx.font = `${n.size}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 18;
      ctx.shadowColor = n.color;
      ctx.fillText(n.symbol, 0, 0);
      ctx.restore();

      // Remove expired or off-screen particles
      if (n.age >= n.maxAge || n.y < -50 || n.x < -60 || n.x > width + 60) {
        musicalNotes.splice(i, 1);
      }
    }

    requestAnimationFrame(renderMusicNotes);
  }

  renderMusicNotes();
}

// ==========================================================================
// 9. DOOR 5: THE SECRET ROOM (COZY MYSTERY VAULT & HIDDEN TREASURES)
// ==========================================================================
function initDoor5() {
  const btnBackToDoor4 = document.getElementById("btn-back-to-door-4");
  if (btnBackToDoor4) {
    btnBackToDoor4.addEventListener("click", () => {
      try { SoundFX.click(); } catch (e) {}
      isDarkRomanceThemeActive = false;
      document.getElementById("screen-door-5").style.display = "none";
      document.getElementById("screen-door-4").style.display = "block";
      document.getElementById("hud-quest-name").textContent = "Door 4: The Enchanted Music Box 🎵";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const btnGoToDoor6 = document.getElementById("btn-go-to-door-6");
  if (btnGoToDoor6) {
    btnGoToDoor6.addEventListener("click", () => {
      try { SoundFX.victory(); } catch (e) {}
      isDarkRomanceThemeActive = false;
      document.getElementById("screen-door-5").style.display = "none";
      const d6 = document.getElementById("screen-door-6");
      if (d6) d6.style.display = "block";
      document.getElementById("hud-quest-name").textContent = "Door 6: Out of the Heart 🕊️🎁";
      setTimeout(() => { initDoor6Scratch(); }, 60);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  initScratchCard();
  initSecretsPasswordVault();
}

/**
 * Interactive Golden Scratch Foil Engine for ALL Picture Cards
 * Covers:
 * 1. Who is in my heart 24/7? (Photo 1)
 * 2. Cutest person in my life (Photo 2)
 * 3. Always want to hold you (Photo 3)
 * 4. My safest place... (Photo 4)
 * 5. Our Dream Date (Card 5)
 */
function initScratchCard() {
  const scratchCards = [
    {
      id: 1,
      canvasId: "scratch-canvas",
      btnId: "btn-reveal-scratch",
      width: 340,
      height: 420,
      icon: "🪙",
      title: "SCRATCH TO REVEAL",
      subtitle: "WHO IS IN MY HEART?",
      tag: "24 / 7   F O R E V E R 💕"
    },
    {
      id: 2,
      canvasId: "scratch-canvas-2",
      btnId: "btn-reveal-card-2",
      width: 320,
      height: 280,
      icon: "👑",
      title: "SCRATCH TO REVEAL",
      subtitle: "CUTEST PERSON IN MY LIFE",
      tag: "✨ Rub with finger or mouse ✨"
    },
    {
      id: 3,
      canvasId: "scratch-canvas-3",
      btnId: "btn-reveal-card-3",
      width: 320,
      height: 280,
      icon: "🤗",
      title: "SCRATCH TO REVEAL",
      subtitle: "ALWAYS WANT TO HOLD YOU",
      tag: "💖 Warm sweet embrace 💖"
    },
    {
      id: 4,
      canvasId: "scratch-canvas-4",
      btnId: "btn-reveal-card-4",
      width: 320,
      height: 280,
      icon: "🏡",
      title: "SCRATCH TO REVEAL",
      subtitle: "MY SAFEST PLACE...",
      tag: "🌸 Sanctuary of peace 🌸"
    },
    {
      id: 5,
      canvasId: "scratch-canvas-5",
      btnId: "btn-reveal-card-5",
      width: 320,
      height: 160,
      icon: "🕯️",
      title: "SCRATCH TO REVEAL",
      subtitle: "OUR DREAM DATE",
      tag: "🍷 Cooking & cuddles 🍝"
    }
  ];

  const cardControllers = [];

  scratchCards.forEach((cfg) => {
    const ctrl = bindScratchFoil(cfg);
    if (ctrl) cardControllers.push(ctrl);
  });

  // Master Button: "Scratch Off All Pictures (Reveal All)"
  const btnRevealAllCards = document.getElementById("btn-reveal-all-cards");
  if (btnRevealAllCards) {
    btnRevealAllCards.addEventListener("click", () => {
      try { SoundFX.victory(); } catch (e) {}
      try { SoundFX.angelicReveal(); } catch (e) {}
      cardControllers.forEach((ctrl, idx) => {
        setTimeout(() => {
          ctrl.reveal();
        }, idx * 180);
      });
      try { launchGrandConfetti(); } catch (e) {}
    });
  }
}

function bindScratchFoil(cfg) {
  const canvas = document.getElementById(cfg.canvasId);
  const btnReveal = document.getElementById(cfg.btnId);
  if (!canvas) return null;

  // Prevent duplicate binding
  if (canvas._isBound) {
    if (!canvas._isRevealed && canvas._drawFoil) {
      canvas._drawFoil();
    }
    return { reveal: canvas._reveal, drawFoil: canvas._drawFoil, canvasId: cfg.canvasId };
  }
  canvas._isBound = true;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const width = (canvas.width = cfg.width);
  const height = (canvas.height = cfg.height);

  let isScratching = false;
  let isRevealed = false;
  let activePointerId = null;
  let lastX = null;
  let lastY = null;
  let strokeCount = 0;

  // Render Rich Rose Gold & Velvet Crimson Dark Romance Foil
  function drawFoil() {
    if (isRevealed) return;
    ctx.save();
    ctx.globalCompositeOperation = "source-over";

    // Sensual dark romance metallic gradient: Deep Rose Wine -> Crimson -> 24k Gold -> Amber -> Ruby -> Velvet Obsidian
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#881337");    // deep velvety rose
    grad.addColorStop(0.2, "#e11d48");   // vivid passion crimson
    grad.addColorStop(0.42, "#fcd34d");  // radiant 24k gold
    grad.addColorStop(0.65, "#fbbf24");  // warm champagne gold
    grad.addColorStop(0.85, "#be123c");  // rich ruby
    grad.addColorStop(1, "#4c0519");     // obsidian wine
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Multicolored glitter flecks (Gold, Ruby, and Diamond White)
    const sparkleCount = height > 200 ? 240 : 130;
    for (let i = 0; i < sparkleCount; i++) {
      const rand = Math.random();
      if (rand > 0.6) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      } else if (rand > 0.3) {
        ctx.fillStyle = "rgba(252, 211, 77, 0.65)";
      } else {
        ctx.fillStyle = "rgba(244, 63, 94, 0.55)";
      }
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Outer luminous gold border
    ctx.strokeStyle = "rgba(252, 211, 77, 0.75)";
    ctx.lineWidth = 3.5;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Inner dashed dark crimson romance border
    ctx.setLineDash([7, 5]);
    ctx.strokeStyle = "#ffe4e6";
    ctx.lineWidth = 1.3;
    ctx.strokeRect(14, 14, width - 28, height - 28);
    ctx.setLineDash([]);

    // Typography & Gothic Romance Emblems
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (height <= 180) {
      // Compact Dream Date Foil
      ctx.font = "28px serif";
      ctx.fillText(cfg.icon, width / 2, height * 0.28);

      ctx.font = "bold 15px 'Segoe UI', Tahoma, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#e11d48";
      ctx.shadowBlur = 6;
      ctx.fillText(cfg.title, width / 2, height * 0.52);

      ctx.font = "bold 9px 'Press Start 2P', monospace";
      ctx.fillStyle = "#fef08a";
      ctx.shadowBlur = 0;
      ctx.fillText(cfg.subtitle, width / 2, height * 0.70);

      ctx.font = "11px 'Segoe UI', Tahoma, sans-serif";
      ctx.fillStyle = "#ffe4e6";
      ctx.fillText(cfg.tag, width / 2, height * 0.86);
    } else if (height <= 300) {
      // Standard Polaroid Cards 2, 3, 4
      ctx.font = "40px serif";
      ctx.fillText(cfg.icon, width / 2, height * 0.28);

      ctx.font = "bold 18px 'Segoe UI', Tahoma, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#e11d48";
      ctx.shadowBlur = 8;
      ctx.fillText(cfg.title, width / 2, height * 0.48);

      ctx.font = "bold 10px 'Press Start 2P', monospace";
      ctx.fillStyle = "#fef08a";
      ctx.shadowBlur = 0;
      ctx.fillText(cfg.subtitle, width / 2, height * 0.62);

      ctx.font = "12px 'Segoe UI', Tahoma, sans-serif";
      ctx.fillStyle = "#ffe4e6";
      ctx.fillText(cfg.tag, width / 2, height * 0.76);
    } else {
      // Full Scratch Card 1
      ctx.font = "48px serif";
      ctx.fillText(cfg.icon, width / 2, height * 0.32);

      ctx.font = "bold 20px 'Segoe UI', Tahoma, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#e11d48";
      ctx.shadowBlur = 8;
      ctx.fillText(cfg.title, width / 2, height * 0.48);

      ctx.font = "bold 12px 'Press Start 2P', monospace";
      ctx.fillStyle = "#fef08a";
      ctx.shadowBlur = 0;
      ctx.fillText(cfg.subtitle, width / 2, height * 0.58);

      ctx.font = "14px 'Segoe UI', Tahoma, sans-serif";
      ctx.fillStyle = "#ffe4e6";
      ctx.fillText("✨ Rub with finger or mouse ✨", width / 2, height * 0.69);

      ctx.font = "12px 'Segoe UI', Tahoma, sans-serif";
      ctx.fillStyle = "#fcd34d";
      ctx.fillText(cfg.tag, width / 2, height * 0.78);
    }

    ctx.restore();
  }

  drawFoil();
  canvas._drawFoil = drawFoil;

  function getCoords(e) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return { x: 0, y: 0 };
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function scratchAt(x, y) {
    if (isRevealed) return;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";

    // Generous smooth circular brush for satisfying scratching
    const brushRadius = height <= 180 ? 28 : 36;
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();

    // Gapless line interpolation between consecutive points
    if (lastX !== null && lastY !== null) {
      ctx.lineWidth = brushRadius * 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.restore();

    lastX = x;
    lastY = y;

    strokeCount++;
    if (strokeCount % 8 === 0) {
      checkScratchedPercentage();
    }
  }

  function checkScratchedPercentage() {
    if (isRevealed) return;
    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      let transparentCount = 0;
      const totalPixels = data.length / 4;

      // Sample every 32nd pixel for instant high performance
      for (let i = 3; i < data.length; i += 32) {
        if (data[i] === 0) transparentCount += 8;
      }

      const percent = transparentCount / totalPixels;
      // 18% scratch threshold triggers celebratory auto-unveil!
      if (percent > 0.18) {
        reveal();
      }
    } catch (e) {}
  }

  function reveal() {
    if (isRevealed) return;
    isRevealed = true;
    canvas._isRevealed = true;
    canvas.classList.add("revealed");

    if (btnReveal) {
      btnReveal.innerHTML = "<span>✅ Revealed 💖</span>";
      btnReveal.style.opacity = "0.75";
      btnReveal.style.pointerEvents = "none";
    }

    try { SoundFX.angelicReveal(); } catch (e) {}
    try { launchGrandConfetti(); } catch (e) {}
  }

  canvas._reveal = reveal;

  // Flake micro-glitter particles at touch/mouse position
  function spawnGlitterFlakes(cx, cy) {
    try {
      const glitters = ["✨", "🌟", "💫", "⭐", "🪙", "💖"];
      for (let i = 0; i < 2; i++) {
        const el = document.createElement("div");
        el.className = "scratch-sparkle-particle";
        el.textContent = glitters[Math.floor(Math.random() * glitters.length)];
        el.style.left = `${cx}px`;
        el.style.top = `${cy}px`;
        const dx = (Math.random() - 0.5) * 60;
        const dy = (Math.random() - 0.5) * 60 - 15;
        el.style.setProperty("--p-dx", `${dx}px`);
        el.style.setProperty("--p-dy", `${dy}px`);
        document.body.appendChild(el);
        setTimeout(() => { if (el && el.parentNode) el.remove(); }, 600);
      }
    } catch (_) {}
  }

  // Modern Pointer Events API: 100% reliable across Desktop Mouse & Mobile Touch
  function handlePointerDown(e) {
    if (isRevealed) return;
    e.preventDefault();
    e.stopPropagation();

    try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
    isScratching = true;
    activePointerId = e.pointerId;

    const coords = getCoords(e);
    lastX = coords.x;
    lastY = coords.y;
    scratchAt(coords.x, coords.y);
    spawnGlitterFlakes(e.clientX, e.clientY);
    SoundFX.scratch();
  }

  function handlePointerMove(e) {
    if (!isScratching || e.pointerId !== activePointerId || isRevealed) return;
    e.preventDefault();
    e.stopPropagation();

    const coords = getCoords(e);
    scratchAt(coords.x, coords.y);
    spawnGlitterFlakes(e.clientX, e.clientY);
    SoundFX.scratch();
  }

  function handlePointerUp(e) {
    if (isScratching && e.pointerId === activePointerId) {
      isScratching = false;
      activePointerId = null;
      lastX = null;
      lastY = null;
      try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
      checkScratchedPercentage();
    }
  }

  canvas.addEventListener("pointerdown", handlePointerDown, { passive: false });
  canvas.addEventListener("pointermove", handlePointerMove, { passive: false });
  canvas.addEventListener("pointerup", handlePointerUp);
  canvas.addEventListener("pointercancel", handlePointerUp);

  // Fallback mouse/touch prevent default
  canvas.addEventListener("contextmenu", (e) => e.preventDefault());
  canvas.addEventListener("dragstart", (e) => e.preventDefault());

  // Individual Reveal Button
  if (btnReveal) {
    btnReveal.addEventListener("click", () => {
      try { SoundFX.click(); } catch (e) {}
      reveal();
    });
  }

  return { reveal, drawFoil, canvasId: cfg.canvasId };
}

/**
 * Top 3 Deepest Secrets Password Vault Engine
 * Password: "Rise and shine" (case-insensitive)
 */
function initSecretsPasswordVault() {
  const form = document.getElementById("secrets-password-form");
  const input = document.getElementById("secrets-password-input");
  const btnSubmit = document.getElementById("btn-submit-secrets-pass");
  const errorBanner = document.getElementById("secrets-error-banner");
  const passwordBox = document.getElementById("secrets-password-box");
  const unlockedContainer = document.getElementById("unlocked-secrets-container");

  if (!form || !input) return;

  function handleSecretsUnlock(e) {
    if (e && e.preventDefault) e.preventDefault();

    const val = input.value.trim().toLowerCase().replace(/\s+/g, " ");

    // Check for "Rise and shine" (or variations like "rise & shine" or containing both "rise" and "shine")
    const isCorrect =
      val === "rise and shine" ||
      val === "rise & shine" ||
      (val.includes("rise") && val.includes("shine"));

    if (isCorrect) {
      // Success!
      if (errorBanner) errorBanner.style.display = "none";
      if (passwordBox) passwordBox.style.display = "none";
      if (unlockedContainer) {
        unlockedContainer.style.display = "flex";
        unlockedContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      try { SoundFX.victory(); } catch (e) {}
      try { SoundFX.kiss(); } catch (e) {}
      try { launchGrandConfetti(); } catch (e) {}
    } else {
      // Wrong password
      if (errorBanner) {
        errorBanner.style.display = "flex";
        errorBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      if (passwordBox) {
        passwordBox.classList.remove("shake");
        void passwordBox.offsetWidth; // trigger reflow
        passwordBox.classList.add("shake");
      }
      input.focus();
    }
  }

  form.addEventListener("submit", handleSecretsUnlock);
  if (btnSubmit) btnSubmit.addEventListener("click", handleSecretsUnlock);
}

// ==========================================================================
// 10. DOOR 6: OUT OF THE HEART (SANCTUARY & TOMORROW'S MYSTERY BOX)
// ==========================================================================
function initDoor6() {
  const btnBackToDoor5 = document.getElementById("btn-back-to-door-5");
  if (btnBackToDoor5) {
    btnBackToDoor5.addEventListener("click", () => {
      try { SoundFX.click(); } catch (e) {}
      document.getElementById("screen-door-6").style.display = "none";
      const d5 = document.getElementById("screen-door-5");
      if (d5) d5.style.display = "block";
      document.getElementById("hud-quest-name").textContent = "Door 5: The Secret Room 🗝️🍷";
      activateDarkRomanceTheme();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const btnRestartGame = document.getElementById("btn-restart-game");
  if (btnRestartGame) {
    btnRestartGame.addEventListener("click", () => {
      try { SoundFX.victory(); } catch (e) {}
      try { launchGrandConfetti(); } catch (e) {}
      document.getElementById("screen-door-6").style.display = "none";
      const d1 = document.getElementById("screen-door-1");
      if (d1) d1.style.display = "block";
      document.getElementById("hud-quest-name").textContent = "Level 1: Gate of Identity 🗝️";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Interactive 3D Mystery Gift Box
  const interactiveGift = document.getElementById("mystery-interactive-gift");
  const giftWhisper = document.getElementById("giftbox-whisper");
  if (interactiveGift) {
    interactiveGift.addEventListener("click", () => {
      try { SoundFX.click(); } catch (e) {}
      try { SoundFX.kiss(); } catch (e) {}

      // Trigger shake animation
      interactiveGift.classList.remove("gift-shake");
      void interactiveGift.offsetWidth; // force reflow
      interactiveGift.classList.add("gift-shake");

      // Show whisper bubble
      if (giftWhisper) {
        giftWhisper.style.display = "block";
      }

      // Sparkle burst
      try {
        const rect = interactiveGift.getBoundingClientRect();
        for (let i = 0; i < 8; i++) {
          createParticle(rect.left + rect.width / 2, rect.top + rect.height / 2, ["💖", "✨", "🎁", "🍬"][i % 4]);
        }
      } catch (e) {}
    });
  }

  // Quest Acceptance Button
  const btnAcceptQuest = document.getElementById("btn-accept-quest");
  const certBadge = document.getElementById("quest-certified-badge");
  if (btnAcceptQuest) {
    btnAcceptQuest.addEventListener("click", () => {
      try { SoundFX.victory(); } catch (e) {}
      try { SoundFX.kiss(); } catch (e) {}
      try { launchGrandConfetti(); } catch (e) {}

      btnAcceptQuest.innerHTML = "<span>💖 PROMISE SEALED WITH LOVE 💖</span>";
      btnAcceptQuest.style.opacity = "0.9";
      btnAcceptQuest.style.cursor = "default";
      btnAcceptQuest.disabled = true;

      if (certBadge) {
        certBadge.style.display = "flex";
        certBadge.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  initGoldenWishTicket();
  initPick3GiftBoxes();
  initDoor6Scratch();
}

/**
 * Feature 1: Golden One-Day Wish Ticket Engine (Friday, 16 Oct Only)
 */
function initGoldenWishTicket() {
  const btnRedeem = document.getElementById("btn-redeem-ticket");
  const input = document.getElementById("wish-ticket-input");
  const banner = document.getElementById("wish-redeemed-banner");
  const display = document.getElementById("redeemed-wish-display");
  const statusLabel = document.getElementById("ticket-status-label");
  const inputContainer = document.getElementById("ticket-input-container");

  if (!btnRedeem) return;

  btnRedeem.addEventListener("click", () => {
    const rawWish = input ? input.value.trim() : "";
    const wish = rawWish || "A sweet romantic treat & wish of Riuu's choice for 16 Oct 💖";

    try { SoundFX.victory(); } catch (e) {}
    try { SoundFX.kiss(); } catch (e) {}
    try { launchGrandConfetti(); } catch (e) {}

    if (display) {
      display.textContent = `"${wish}"`;
    }
    if (banner) {
      banner.style.display = "flex";
      banner.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    if (statusLabel) {
      statusLabel.textContent = "CLAIMED FOR 16 OCT 👑";
      statusLabel.style.color = "#d97706";
    }
    if (inputContainer) {
      inputContainer.style.display = "none";
    }

    try {
      localStorage.setItem("riu_wish_ticket_16oct", wish);
    } catch (e) {}
  });

  // Check if previously redeemed
  try {
    const savedWish = localStorage.getItem("riu_wish_ticket_16oct");
    if (savedWish && banner && display) {
      display.textContent = `"${savedWish}"`;
      banner.style.display = "flex";
      if (inputContainer) inputContainer.style.display = "none";
      if (statusLabel) {
        statusLabel.textContent = "CLAIMED FOR 16 OCT 👑";
        statusLabel.style.color = "#d97706";
      }
    }
  } catch (e) {}
}

/**
 * Feature 2: 9 Mystery Gift Boxes Mini-Game (Pick 3)
 * 6 Rewards + 3 Empty Boxes.
 * Strictly ONE round (No retry / No reset) — Whatever is in her luck is final!
 * Tell her to take a screenshot and send it to Ansh to redeem!
 */
function initPick3GiftBoxes() {
  const grid = document.getElementById("gift-boxes-grid");
  const counterEl = document.getElementById("picks-count-num");
  const summaryTray = document.getElementById("pick3-summary-tray");
  const rewardsRow = document.getElementById("pst-rewards-row");
  const btnClaim = document.getElementById("btn-claim-3-rewards");

  if (!grid) return;

  // The 6 Real Romantic Rewards + 3 Empty/Luck Boxes
  const basePool = [
    {
      type: "reward",
      icon: "🥺💋",
      title: "Forehead Kiss",
      desc: "Soft, tender kiss filled with pure devotion & care"
    },
    {
      type: "reward",
      icon: "🫂💖",
      title: "A Nice Proper Hug",
      desc: "Warm, long, tight hug to melt all your stress"
    },
    {
      type: "reward",
      icon: "🌸🥰",
      title: "Sweet Cheek Kiss",
      desc: "Soft lingering kiss making your cheeks blush"
    },
    {
      type: "reward",
      icon: "👫✨",
      title: "Walk Holding Hands",
      desc: "Walking together hand-in-hand with fingers tightly locked"
    },
    {
      type: "reward",
      icon: "🤏🥰",
      title: "Squeeze Cheeks x6",
      desc: "Gently squeezing your cute cheeks 6 times continuously!"
    },
    {
      type: "reward",
      icon: "🎀💇‍♀️",
      title: "Tie Your Hair",
      desc: "Gently brushing and tying your beautiful hair for you"
    },
    {
      type: "empty",
      icon: "💨🙈",
      title: "Empty Box!",
      desc: "Aww, empty box! Just sweet air & love inside!"
    },
    {
      type: "empty",
      icon: "📦🥺",
      title: "Empty Box!",
      desc: "Oops! Better luck on your next pick, cutie!"
    },
    {
      type: "empty",
      icon: "💨✨",
      title: "Empty Box!",
      desc: "Nothing here! Ansh's heart was in another box!"
    }
  ];

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Load persistent pool or create one
  let shuffledPool = [];
  try {
    const savedPool = localStorage.getItem("riu_pick3_pool_fixed");
    if (savedPool) {
      shuffledPool = JSON.parse(savedPool);
    }
  } catch (e) {}

  if (!shuffledPool || shuffledPool.length !== 9) {
    shuffledPool = shuffle(basePool);
    try {
      localStorage.setItem("riu_pick3_pool_fixed", JSON.stringify(shuffledPool));
    } catch (e) {}
  }

  // Load persistent user picks
  let userPicks = [];
  let openedIndices = [];
  try {
    const savedPicks = localStorage.getItem("riu_pick3_user_picks");
    const savedIndices = localStorage.getItem("riu_pick3_opened_indices");
    if (savedPicks) userPicks = JSON.parse(savedPicks);
    if (savedIndices) openedIndices = JSON.parse(savedIndices);
  } catch (e) {}

  let picksLeft = Math.max(0, 3 - userPicks.length);
  if (counterEl) counterEl.textContent = picksLeft;

  const boxes = grid.querySelectorAll(".lucky-gift-box");

  function renderSummary() {
    if (!rewardsRow) return;
    rewardsRow.innerHTML = "";
    userPicks.forEach((pick, idx) => {
      const card = document.createElement("div");
      card.className = `pst-reward-card ${pick.type === "empty" ? "empty-reward" : ""}`;
      card.innerHTML = `
        <span class="pst-icon">${pick.icon}</span>
        <span class="pst-pick-num">PICK #${idx + 1}</span>
        <h4>${pick.title}</h4>
        <p>${pick.desc}</p>
      `;
      rewardsRow.appendChild(card);
    });
    if (summaryTray) {
      summaryTray.style.display = "block";
    }
  }

  // Restore previously opened boxes if any
  openedIndices.forEach((idx) => {
    const box = boxes[idx];
    if (box) {
      const item = shuffledPool[idx];
      const iconEl = box.querySelector(".lgb-rev-icon");
      const titleEl = box.querySelector(".lgb-rev-title");
      const descEl = box.querySelector(".lgb-rev-desc");
      if (iconEl) iconEl.textContent = item.icon;
      if (titleEl) titleEl.textContent = item.title;
      if (descEl) descEl.textContent = item.desc;
      box.classList.add("opened");
      if (item.type === "empty") box.classList.add("empty-box");
    }
  });

  if (picksLeft === 0) {
    boxes.forEach((b) => {
      if (!b.classList.contains("opened")) b.classList.add("disabled");
    });
    renderSummary();
  }

  boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
      if (picksLeft <= 0 || box.classList.contains("opened")) return;

      picksLeft--;
      if (counterEl) counterEl.textContent = picksLeft;

      const item = shuffledPool[index % shuffledPool.length];
      userPicks.push(item);
      openedIndices.push(index);

      try {
        localStorage.setItem("riu_pick3_user_picks", JSON.stringify(userPicks));
        localStorage.setItem("riu_pick3_opened_indices", JSON.stringify(openedIndices));
      } catch (e) {}

      // Populate revealed face
      const iconEl = box.querySelector(".lgb-rev-icon");
      const titleEl = box.querySelector(".lgb-rev-title");
      const descEl = box.querySelector(".lgb-rev-desc");

      if (iconEl) iconEl.textContent = item.icon;
      if (titleEl) titleEl.textContent = item.title;
      if (descEl) descEl.textContent = item.desc;

      box.classList.add("opened");
      if (item.type === "empty") {
        box.classList.add("empty-box");
      }

      if (item.type === "reward") {
        try { SoundFX.victory(); } catch (e) {}
        try { SoundFX.kiss(); } catch (e) {}
      } else {
        try { SoundFX.click(); } catch (e) {}
      }

      // Sparkle burst
      try {
        const rect = box.getBoundingClientRect();
        for (let i = 0; i < 6; i++) {
          createParticle(rect.left + rect.width / 2, rect.top + rect.height / 2, ["💖", "✨", item.icon][i % 3]);
        }
      } catch (e) {}

      // If 3 picks used - Final! No retry!
      if (picksLeft === 0) {
        boxes.forEach((b) => {
          if (!b.classList.contains("opened")) {
            b.classList.add("disabled");
          }
        });

        renderSummary();

        setTimeout(() => {
          try { launchGrandConfetti(); } catch (e) {}
          if (summaryTray) {
            summaryTray.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }, 500);
      }
    });
  });

  if (btnClaim) {
    btnClaim.addEventListener("click", () => {
      try { SoundFX.victory(); } catch (e) {}
      try { SoundFX.kiss(); } catch (e) {}
      try { launchGrandConfetti(); } catch (e) {}
      alert("📸 Take a screenshot of this screen right now and send it to Ansh on WhatsApp! He will fulfill your rewards with all his love! 💕");
    });
  }
}

/**
 * Interactive Golden Scratch Foil Engine for Door 6 Mystery Box Quest
 */
let isDoor6ScratchRevealed = false;
function initDoor6Scratch() {
  const canvas = document.getElementById("door6-scratch-canvas");
  const btnReveal = document.getElementById("btn-reveal-door6-scratch");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;

  function drawGoldenFoil() {
    ctx.save();
    ctx.globalCompositeOperation = "source-over";

    // Luxury Royal Golden-Rose Gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#fde047");
    grad.addColorStop(0.25, "#f59e0b");
    grad.addColorStop(0.5, "#fb7185");
    grad.addColorStop(0.75, "#e11d48");
    grad.addColorStop(1, "#b91c1c");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Decorative Starlight & Foil Texture
    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    for (let i = 0; i < 45; i++) {
      const rx = (i * 97) % w;
      const ry = (i * 61) % h;
      const rs = (i % 4) + 1.5;
      ctx.beginPath();
      ctx.arc(rx, ry, rs, 0, Math.PI * 2);
      ctx.fill();
    }

    // Outer & Inner Gold Borders
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    ctx.strokeStyle = "rgba(253, 224, 71, 0.7)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(16, 16, w - 32, h - 32);

    // Crown & Gift Graphic
    ctx.font = "38px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("👑", w / 2, h * 0.25);

    // Header Text
    ctx.font = "bold 18px 'Courier New', monospace";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
    ctx.shadowBlur = 8;
    ctx.fillText("✨ THE TOMORROW MYSTERY BOX ✨", w / 2, h * 0.44);

    // Subtitle
    ctx.font = "bold 13px 'Courier New', monospace";
    ctx.fillStyle = "#fef08a";
    ctx.fillText("SCRATCH TO REVEAL YOUR QUEST", w / 2, h * 0.58);

    // Ribbon tag
    ctx.font = "italic 12px sans-serif";
    ctx.fillStyle = "#ffe4e6";
    ctx.fillText("— Rub with finger or cursor to unlock 🎁 —", w / 2, h * 0.74);

    ctx.restore();
  }

  drawGoldenFoil();

  let isDrawing = false;
  let scratchedPixels = 0;
  const totalPixels = w * h;
  const revealThreshold = 0.18; // 18% scratched -> auto reveal

  function triggerReveal() {
    if (isDoor6ScratchRevealed) return;
    isDoor6ScratchRevealed = true;

    canvas.style.transition = "opacity 0.6s ease-out";
    canvas.style.opacity = "0";
    setTimeout(() => {
      canvas.style.display = "none";
    }, 600);

    try { SoundFX.victory(); } catch (e) {}
    try { SoundFX.kiss(); } catch (e) {}
    try { launchGrandConfetti(); } catch (e) {}
  }

  function scratchAt(clientX, clientY) {
    if (isDoor6ScratchRevealed) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    scratchedPixels += Math.PI * 36 * 36 * 0.4;

    try { SoundFX.scratch(); } catch (e) {}

    // Spawn tiny golden flakes
    if (Math.random() < 0.4) {
      try {
        createParticle(clientX, clientY, ["✨", "💛", "🪙", "💖"][Math.floor(Math.random() * 4)]);
      } catch (e) {}
    }

    if (scratchedPixels / totalPixels >= revealThreshold) {
      triggerReveal();
    }
  }

  // Pointer Events (Mobile Touch + Mouse support)
  canvas.addEventListener("pointerdown", (e) => {
    isDrawing = true;
    try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
    scratchAt(e.clientX, e.clientY);
  });

  canvas.addEventListener("pointermove", (e) => {
    if (!isDrawing) return;
    scratchAt(e.clientX, e.clientY);
  });

  const stopDrawing = (e) => {
    if (!isDrawing) return;
    isDrawing = false;
    try { canvas.releasePointerCapture(e.pointerId); } catch (err) {}
  };

  canvas.addEventListener("pointerup", stopDrawing);
  canvas.addEventListener("pointercancel", stopDrawing);

  if (btnReveal) {
    btnReveal.addEventListener("click", () => {
      triggerReveal();
    });
  }
}

