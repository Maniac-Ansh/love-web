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
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

const SoundFX = {
  // Error buzzer sound for wrong password
  buzzer: () => {
    if (!GameState.soundEnabled) return;
    const ctx = getAudioContext();
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
  },

  // Angelic harp fanfare for Pink Theme Transformation
  angelicReveal: () => {
    if (!GameState.soundEnabled) return;
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98]; // C5, E5, G5, C6, E6, G6
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
  },

  // Zipper opening sound
  zipperOpen: () => {
    if (!GameState.soundEnabled) return;
    const ctx = getAudioContext();
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
  },

  // Playful dodge sound when NO button flees
  dodge: () => {
    if (!GameState.soundEnabled) return;
    const ctx = getAudioContext();
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
  },

  // Click chime
  click: () => {
    if (!GameState.soundEnabled) return;
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(659.25, now); // E5
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  },

  // Star catch sound (high bell chime)
  // Perfect match chime (sweet ascending arpeggio)
  matchSuccess: () => {
    if (!GameState.soundEnabled) return;
    const ctx = getAudioContext();
    const notes = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6
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
  },

  // Gentle differ chime (warm soft double tone)
  differGentle: () => {
    if (!GameState.soundEnabled) return;
    const ctx = getAudioContext();
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
  },

  // Victory fanfare for Level Complete
  levelComplete: () => {
    if (!GameState.soundEnabled) return;
    const ctx = getAudioContext();
    const notes = [
      { f: 523.25, t: 0.0, d: 0.15 }, // C5
      { f: 659.25, t: 0.12, d: 0.15 }, // E5
      { f: 783.99, t: 0.24, d: 0.18 }, // G5
      { f: 1046.5, t: 0.36, d: 0.6 }   // C6
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
  },

  // Victory fanfare for YES button
  victory: () => {
    if (!GameState.soundEnabled) return;
    const ctx = getAudioContext();
    const notes = [
      { f: 523.25, t: 0.0, d: 0.15 }, // C5
      { f: 659.25, t: 0.12, d: 0.15 }, // E5
      { f: 783.99, t: 0.24, d: 0.18 }, // G5
      { f: 1046.5, t: 0.36, d: 0.55 }, // C6
      { f: 1318.5, t: 0.50, d: 0.70 }  // E6
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
  initCustomizationModal();
});

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
  const btnStartDoor4 = document.getElementById("btn-start-door-4");
  const btnBackToDoor3 = document.getElementById("btn-back-to-door-3");

  let isBagOpened = false;

  if (passwordForm) {
    passwordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const entered = passwordInput.value.trim().toLowerCase();

      // Check for 'five feets apart' or 'five feet apart'
      if (entered === "five feets apart" || entered === "five feet apart") {
        SoundFX.angelicReveal();
        SoundFX.victory();

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

        launchGrandConfetti();
      } else {
        // Wrong password
        SoundFX.buzzer();
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

  // Handle click on the school bag
  if (coupleBagContainer) {
    coupleBagContainer.addEventListener("click", () => {
      if (isBagOpened) return;
      isBagOpened = true;

      // Play zipper & magical chime sound
      SoundFX.zipperOpen();
      SoundFX.angelicReveal();

      // Add bag opened class
      if (backpack) backpack.classList.add("bag-opened");

      // Animate couple walking together (0 distance)
      const coupleWrap = document.getElementById("couple-animation-wrap");
      if (coupleWrap) {
        coupleWrap.style.gap = "0px";
      }

      // Hide hint pill
      const hintPill = document.getElementById("walk-hint-pill");
      if (hintPill) hintPill.style.display = "none";

      // Launch the fullscreen Sea of Hearts animation from bag
      const bagRect = coupleBagContainer.getBoundingClientRect();
      startSeaOfHeartsAnimation(bagRect.left + bagRect.width / 2, bagRect.top + bagRect.height / 2);

      // Launch multiple confetti bursts
      launchGrandConfetti();

      // Reveal the "I want to stay 0 feet apart from you..." card
      setTimeout(() => {
        if (zeroFeetCard) {
          zeroFeetCard.style.display = "block";
          zeroFeetCard.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        SoundFX.victory();
        launchGrandConfetti();
      }, 1200);
    });
  }

  if (btnStartDoor4) {
    btnStartDoor4.addEventListener("click", () => {
      SoundFX.click();
      document.getElementById("screen-door-3").style.display = "none";
      document.getElementById("level-4").style.display = "block";
      document.getElementById("hud-quest-name").textContent = "Door 4: Coming Soon ✨";
    });
  }

  if (btnBackToDoor3) {
    btnBackToDoor3.addEventListener("click", () => {
      SoundFX.click();
      document.getElementById("level-4").style.display = "none";
      document.getElementById("screen-door-3").style.display = "block";
      document.getElementById("hud-quest-name").textContent = "Door 3: The Sacred Bond";
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

    requestAnimationFrame(render);
  }
  render();
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
