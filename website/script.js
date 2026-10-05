/**
 * LOVE-WEB: Interactive Romantic Experience Engine
 * Includes: Cosmic Canvas, Web Audio Ambient Synthesizer, 3D Envelope,
 * Reasons Card Deck, Redeemable Coupons, Constellation Canvas, and Personalization.
 */

// ==========================================================================
// 1. DEFAULT DATA & CONFIGURATION
// ==========================================================================
const DEFAULT_CONFIG = {
  herName: "My Beautiful Girl",
  yourName: "Your Favorite Person",
  startDate: "2023-10-04T00:00:00", // Default anniversary
  letterGreeting: "Dearest One,",
  letterText: `I wanted to build something as unique and radiant as the feeling you give me every single day. Thank you for being my favorite person, my safest shelter, and my happiest thought.\n\nFrom our silly inside jokes to the quiet moments where we don't even need words, every single heartbeat with you is a gift I never take for granted.\n\nNo matter where life takes us or what the stars have written, my heart belongs to you today, tomorrow, and forever.`,
  reasons: [
    "The way your entire face lights up whenever you laugh from your soul.",
    "How safe and peaceful the world feels the moment you hold my hand.",
    "Your adorable sleepy voice whenever you first wake up.",
    "How you remember the tiny details about me that everyone else misses.",
    "Your boundless kindness and empathy toward every living thing.",
    "The way you look at me across a crowded room like no one else exists.",
    "Your goofy dance moves whenever your favorite snack arrives.",
    "How you inspire me to be a better version of myself every single day.",
    "The cute way your nose scrunches when you're playfully mad at me.",
    "How you make even boring grocery runs feel like the best date ever.",
    "Your warm hugs that can effortlessly heal any hard day.",
    "The sweet notes and random texts that always make me smile at my screen.",
    "The passion and curiosity in your voice when you talk about your dreams.",
    "How beautiful you look in oversized hoodies with messy hair.",
    "That no matter how many times I look at you, my heart still skips a beat.",
    "The sound of your voice—it's my favorite melody in the world.",
    "How patient and understanding you are, even when I'm being stubborn.",
    "The unforgettable memories we've already made and the thousand more to come."
  ],
  redeemedCoupons: []
};

// Load saved config or initialize with defaults
let appConfig = JSON.parse(localStorage.getItem("love_web_config")) || { ...DEFAULT_CONFIG };

// Ensure reasons array is preserved if existing config lacks new additions
if (!appConfig.reasons || appConfig.reasons.length === 0) {
  appConfig.reasons = [...DEFAULT_CONFIG.reasons];
}
if (!appConfig.redeemedCoupons) {
  appConfig.redeemedCoupons = [];
}

function saveConfig() {
  localStorage.setItem("love_web_config", JSON.stringify(appConfig));
}

// ==========================================================================
// 2. DOM ELEMENTS & INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initCosmicCanvas();
  initAudioSynthesizer();
  initRomanceCounter();
  initEnvelopeExperience();
  initReasonsDeck();
  initLoveCoupons();
  initConstellationCanvas();
  initSettingsModal();
  applyPersonalization();
});

// Apply personalization to the UI
function applyPersonalization() {
  const herName = appConfig.herName || "My Beautiful Girl";
  const yourName = appConfig.yourName || "Your Favorite Person";

  document.getElementById("her-display-name").textContent = herName;
  document.getElementById("footer-her-name").textContent = herName;
  document.getElementById("nav-couple-names").textContent = `${herName} & ${yourName}`;
  document.title = `For ${herName} ✨ Infinite Love`;

  const letterGreetingEl = document.getElementById("letter-greeting");
  if (letterGreetingEl) {
    letterGreetingEl.textContent = `Dearest ${herName},`;
  }

  const letterSignatureEl = document.getElementById("letter-signature");
  if (letterSignatureEl) {
    letterSignatureEl.textContent = `${yourName} ❤️`;
  }

  const letterBodyEl = document.getElementById("letter-body-text");
  if (letterBodyEl && appConfig.letterText) {
    letterBodyEl.innerHTML = appConfig.letterText
      .split("\n\n")
      .map(para => `<p>${escapeHtml(para)}</p>`)
      .join("");
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ==========================================================================
// 3. COSMIC CANVAS (STARFIELD & DRIFTING ROSE PETALS)
// ==========================================================================
function initCosmicCanvas() {
  const canvas = document.getElementById("cosmic-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createStars();
    createPetals();
  });

  // Mouse coords for subtle interactive drift
  let mouse = { x: width / 2, y: height / 2, active: false };
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  // Starfield
  let stars = [];
  const STAR_COUNT = Math.min(120, Math.floor((width * height) / 10000));

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        glowColor: Math.random() > 0.3 ? "#ffb3c1" : "#fcd34d"
      });
    }
  }
  createStars();

  // Floating Rose Petals / Hearts
  let petals = [];
  const PETAL_COUNT = 24;

  function createPetals() {
    petals = [];
    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedX: Math.random() * 0.8 - 0.4,
        speedY: Math.random() * 0.9 + 0.4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        alpha: Math.random() * 0.6 + 0.3,
        color: Math.random() > 0.5 ? "rgba(255, 77, 121," : "rgba(255, 117, 140,"
      });
    }
  }
  createPetals();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Render twinkling stars
    stars.forEach(s => {
      s.alpha += s.speed;
      if (s.alpha > 1 || s.alpha < 0.2) s.speed = -s.speed;

      ctx.save();
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = s.glowColor;
      ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
      ctx.shadowBlur = 8;
      ctx.shadowColor = s.glowColor;
      ctx.fill();
      ctx.restore();
    });

    // Render floating rose petals
    petals.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      // Mouse influence
      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= (dx / dist) * 1.2;
          p.y -= (dy / dist) * 1.2;
        }
      }

      // Recycle petals at screen boundaries
      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.beginPath();
      // Draw organic petal silhouette
      ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color} ${p.alpha})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "#ff4d79";
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

// ==========================================================================
// 4. AMBIENT ROMANTIC AUDIO SYNTHESIZER (WEB AUDIO API)
// ==========================================================================
let audioCtx = null;
let isAudioPlaying = false;
let audioTimer = null;

function initAudioSynthesizer() {
  const musicBtn = document.getElementById("music-toggle-btn");
  const musicStatus = document.getElementById("music-status");
  const musicIcon = document.getElementById("music-icon");
  const soundWave = document.getElementById("sound-wave");

  if (!musicBtn) return;

  musicBtn.addEventListener("click", () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    isAudioPlaying = !isAudioPlaying;

    if (isAudioPlaying) {
      musicStatus.textContent = "Soft Melody";
      musicIcon.textContent = "💖";
      soundWave.classList.add("playing");
      startRomanticMelody();
    } else {
      musicStatus.textContent = "Play Melody";
      musicIcon.textContent = "🎵";
      soundWave.classList.remove("playing");
      stopRomanticMelody();
    }
  });
}

// Romantic chord progression chords (Hz)
const ROMANTIC_CHORDS = [
  // Cmaj7: C4, E4, G4, B4, D5
  [261.63, 329.63, 392.00, 493.88, 587.33],
  // Am7: A3, C4, E4, G4, C5
  [220.00, 261.63, 329.63, 392.00, 523.25],
  // Fmaj7: F3, A3, C4, E4, A4
  [174.61, 220.00, 261.63, 329.63, 440.00],
  // Gsus4 / G: G3, C4, D4, G4, B4
  [196.00, 261.63, 293.66, 392.00, 493.88]
];

let chordIndex = 0;
let noteIndex = 0;

function playCelestaTone(freq, time, duration = 2.4) {
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  // Ethereal sine/triangle blend
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, time);

  // Soft lowpass filter for gentle warmth
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1400, time);
  filter.frequency.exponentialRampToValueAtTime(600, time + duration);

  // Smooth attack & long romantic decay envelope
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.linearRampToValueAtTime(0.09, time + 0.15);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(time);
  osc.stop(time + duration);
}

function startRomanticMelody() {
  function step() {
    if (!isAudioPlaying || !audioCtx) return;

    const currentChord = ROMANTIC_CHORDS[chordIndex];
    const freq = currentChord[noteIndex % currentChord.length];

    playCelestaTone(freq, audioCtx.currentTime, 2.5);

    // Add gentle soft bass tone at start of each bar
    if (noteIndex === 0) {
      playCelestaTone(currentChord[0] / 2, audioCtx.currentTime, 3.8);
    }

    noteIndex++;
    if (noteIndex >= currentChord.length) {
      noteIndex = 0;
      chordIndex = (chordIndex + 1) % ROMANTIC_CHORDS.length;
    }

    // Playful gentle timing (every 550ms)
    audioTimer = setTimeout(step, 550);
  }

  step();
}

function stopRomanticMelody() {
  if (audioTimer) {
    clearTimeout(audioTimer);
    audioTimer = null;
  }
}

// Gentle pleasant chime effect for interactions
function playHeartChime() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  const now = audioCtx.currentTime;
  playCelestaTone(523.25, now, 1.2);       // C5
  playCelestaTone(659.25, now + 0.1, 1.4); // E5
  playCelestaTone(783.99, now + 0.2, 1.8); // G5
  playCelestaTone(1046.5, now + 0.3, 2.0); // C6
}

// ==========================================================================
// 5. LIVE ROMANCE COUNTER
// ==========================================================================
function initRomanceCounter() {
  const daysEl = document.getElementById("count-days");
  const hoursEl = document.getElementById("count-hours");
  const minsEl = document.getElementById("count-minutes");
  const secsEl = document.getElementById("count-seconds");
  const subtextEl = document.getElementById("counter-date-caption");

  function updateCounter() {
    const start = new Date(appConfig.startDate || DEFAULT_CONFIG.startDate);
    const now = new Date();
    const diff = Math.max(0, now - start);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.textContent = days.toLocaleString();
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minsEl) minsEl.textContent = String(mins).padStart(2, "0");
    if (secsEl) secsEl.textContent = String(secs).padStart(2, "0");

    if (subtextEl) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      subtextEl.textContent = `Together since ${start.toLocaleDateString(undefined, options)} • And forever more`;
    }
  }

  updateCounter();
  setInterval(updateCounter, 1000);
}

// ==========================================================================
// 6. INTERACTIVE 3D WAX SEAL & LOVE LETTER
// ==========================================================================
function initEnvelopeExperience() {
  const envelope = document.getElementById("envelope");
  const waxSeal = document.getElementById("wax-seal");
  const closeBtn = document.getElementById("close-letter-btn");
  const controls = document.getElementById("envelope-controls");
  const editInlineBtn = document.getElementById("edit-letter-inline-btn");

  if (!waxSeal || !envelope) return;

  waxSeal.addEventListener("click", () => {
    envelope.classList.add("open");
    if (controls) controls.style.display = "block";
    playHeartChime();
    triggerHeartConfetti(window.innerWidth / 2, window.innerHeight * 0.6);
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      envelope.classList.remove("open");
      if (controls) controls.style.display = "none";
    });
  }

  if (editInlineBtn) {
    editInlineBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openSettings();
    });
  }
}

// ==========================================================================
// 7. INFINITE REASONS CARD DECK
// ==========================================================================
function initReasonsDeck() {
  const reasonCard = document.getElementById("reason-card");
  const reasonText = document.getElementById("reason-text");
  const reasonBadge = document.getElementById("reason-badge");
  const nextBtn = document.getElementById("next-reason-btn");
  const addBtn = document.getElementById("add-reason-btn");

  let currentIndex = 0;

  function showReason(index) {
    if (!reasonCard || !reasonText) return;
    const reasons = appConfig.reasons;
    if (reasons.length === 0) return;

    reasonCard.classList.add("animating");

    setTimeout(() => {
      const actualIndex = index % reasons.length;
      reasonText.textContent = `"${reasons[actualIndex]}"`;
      if (reasonBadge) {
        reasonBadge.textContent = `Reason #${actualIndex + 1} of ${reasons.length}`;
      }
      reasonCard.classList.remove("animating");
    }, 200);
  }

  showReason(0);

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex++;
      showReason(currentIndex);
      playHeartChime();
      const rect = nextBtn.getBoundingClientRect();
      triggerHeartConfetti(rect.left + rect.width / 2, rect.top);
    });
  }

  // Add reason modal logic
  const addModal = document.getElementById("add-reason-modal");
  const closeAddModalBtn = document.getElementById("close-reason-modal-btn");
  const addForm = document.getElementById("add-reason-form");
  const newReasonInput = document.getElementById("input-new-reason");

  if (addBtn && addModal) {
    addBtn.addEventListener("click", () => {
      addModal.style.display = "flex";
      if (newReasonInput) newReasonInput.focus();
    });
  }

  if (closeAddModalBtn && addModal) {
    closeAddModalBtn.addEventListener("click", () => {
      addModal.style.display = "none";
    });
  }

  if (addForm) {
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = newReasonInput.value.trim();
      if (val) {
        appConfig.reasons.push(val);
        saveConfig();
        addModal.style.display = "none";
        newReasonInput.value = "";
        currentIndex = appConfig.reasons.length - 1;
        showReason(currentIndex);
        playHeartChime();
      }
    });
  }
}

// ==========================================================================
// 8. ROMANTIC LOVE COUPONS REDEMPTION
// ==========================================================================
function initLoveCoupons() {
  const coupons = document.querySelectorAll(".coupon-card");

  // Restore already redeemed state
  coupons.forEach(card => {
    const id = card.getAttribute("data-coupon-id");
    if (appConfig.redeemedCoupons.includes(id)) {
      markCouponRedeemed(card);
    }

    const btn = card.querySelector(".coupon-btn");
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!appConfig.redeemedCoupons.includes(id)) {
          appConfig.redeemedCoupons.push(id);
          saveConfig();
          markCouponRedeemed(card);
          playHeartChime();
          const rect = card.getBoundingClientRect();
          triggerHeartConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
      });
    }
  });
}

function markCouponRedeemed(card) {
  card.classList.add("redeemed");
  const btn = card.querySelector(".coupon-btn");
  if (btn) {
    btn.textContent = "Redeemed ✨";
    btn.disabled = true;
  }
}

// ==========================================================================
// 9. INTERACTIVE STARLIGHT CONSTELLATION CANVAS
// ==========================================================================
function initConstellationCanvas() {
  const canvas = document.getElementById("interactive-star-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    render();
  }
  window.addEventListener("resize", resize);
  setTimeout(resize, 100);

  let userStars = [];

  function addStar(x, y) {
    userStars.push({ x, y, radius: Math.random() * 2 + 3 });
    render();
    playHeartChime();
  }

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    addStar(x, y);
  });

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background faint grid dots
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    for (let x = 30; x < canvas.width; x += 60) {
      for (let y = 30; y < canvas.height; y += 60) {
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }

    if (userStars.length === 0) {
      ctx.fillStyle = "rgba(255, 182, 193, 0.6)";
      ctx.font = "italic 16px 'Playfair Display', serif";
      ctx.textAlign = "center";
      ctx.fillText("Click anywhere to place stars & build a constellation ✨", canvas.width / 2, canvas.height / 2);
      return;
    }

    // Draw constellation lines
    ctx.strokeStyle = "rgba(255, 117, 140, 0.65)";
    ctx.lineWidth = 2;
    ctx.shadowBlur = 12;
    ctx.shadowColor = "#ff4d79";

    ctx.beginPath();
    userStars.forEach((star, index) => {
      if (index === 0) {
        ctx.moveTo(star.x, star.y);
      } else {
        ctx.lineTo(star.x, star.y);
      }
    });
    ctx.stroke();

    // Draw stars
    userStars.forEach((star) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.shadowBlur = 16;
      ctx.shadowColor = "#ff758c";
      ctx.fill();

      // Outer golden glow ring
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius + 3, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(252, 211, 77, 0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    });
  }

  // Clear button
  const clearBtn = document.getElementById("clear-stars-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      userStars = [];
      render();
    });
  }

  // Generate Heart Constellation button
  const heartBtn = document.getElementById("heart-constellation-btn");
  if (heartBtn) {
    heartBtn.addEventListener("click", () => {
      userStars = [];
      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + 10;
      const scale = Math.min(canvas.width, canvas.height) / 38;

      // Mathematical heart curve:
      // x = 16 * sin^3(t)
      // y = -(13 * cos(t) - 5 * cos(2t) - 2 * cos(3t) - cos(4t))
      const points = 24;
      for (let i = 0; i <= points; i++) {
        const t = (i / points) * Math.PI * 2;
        const x = cx + (16 * Math.pow(Math.sin(t), 3)) * scale;
        const y = cy - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale;
        userStars.push({ x, y, radius: 3.5 });
      }
      render();
      playHeartChime();
      triggerHeartConfetti(cx, cy);
    });
  }
}

// ==========================================================================
// 10. HEART CONFETTI BURST PARTICLE EFFECT
// ==========================================================================
function triggerHeartConfetti(originX, originY) {
  const container = document.body;
  const count = 18;
  const hearts = ["❤️", "💖", "✨", "💕", "🌸"];

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.position = "fixed";
    el.style.left = `${originX}px`;
    el.style.top = `${originY}px`;
    el.style.fontSize = `${Math.random() * 16 + 14}px`;
    el.style.pointerEvents = "none";
    el.style.zIndex = "9999";
    el.style.transition = "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease";

    container.appendChild(el);

    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
    const velocity = Math.random() * 120 + 60;
    const destX = Math.cos(angle) * velocity;
    const destY = Math.sin(angle) * velocity - 40;

    requestAnimationFrame(() => {
      el.style.transform = `translate(${destX}px, ${destY}px) scale(${Math.random() * 0.8 + 0.6}) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = "0";
    });

    setTimeout(() => {
      el.remove();
    }, 1300);
  }
}

// ==========================================================================
// 11. PERSONALIZATION SETTINGS MODAL
// ==========================================================================
function initSettingsModal() {
  const modal = document.getElementById("settings-modal");
  const openBtn = document.getElementById("open-settings-btn");
  const closeBtn = document.getElementById("close-settings-btn");
  const form = document.getElementById("settings-form");
  const resetBtn = document.getElementById("reset-defaults-btn");

  const herInput = document.getElementById("input-her-name");
  const yourInput = document.getElementById("input-your-name");
  const dateInput = document.getElementById("input-start-date");
  const letterInput = document.getElementById("input-letter-text");

  function openSettings() {
    herInput.value = appConfig.herName || "";
    yourInput.value = appConfig.yourName || "";

    if (appConfig.startDate) {
      dateInput.value = appConfig.startDate.split("T")[0];
    }
    letterInput.value = appConfig.letterText || "";
    modal.style.display = "flex";
  }
  window.openSettings = openSettings;

  if (openBtn) openBtn.addEventListener("click", openSettings);
  if (closeBtn) closeBtn.addEventListener("click", () => (modal.style.display = "none"));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      appConfig.herName = herInput.value.trim() || DEFAULT_CONFIG.herName;
      appConfig.yourName = yourInput.value.trim() || DEFAULT_CONFIG.yourName;

      if (dateInput.value) {
        appConfig.startDate = `${dateInput.value}T00:00:00`;
      }
      if (letterInput.value.trim()) {
        appConfig.letterText = letterInput.value.trim();
      }

      saveConfig();
      applyPersonalization();
      initRomanceCounter();
      modal.style.display = "none";
      playHeartChime();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset all customizations back to initial defaults?")) {
        appConfig = { ...DEFAULT_CONFIG };
        saveConfig();
        applyPersonalization();
        initRomanceCounter();
        modal.style.display = "none";
      }
    });
  }
}
