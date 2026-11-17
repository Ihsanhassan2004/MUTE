'use strict';
import { saveEmail } from './firebase.js';

// ── Mode tabs ──────────────────────────────────────────────────────────────────
const modes = {
  developer: [
    'DEVELOPERS',
    '<strong> Precision Focus Lock:</strong> Clinical L-Tyrosine + B-Vitamins lock your brain into 90 minutes of unbroken laser focus for complex logic, system architecture, and deep debugging.'
  ],
  founder: [
    'FOUNDERS',
    '<strong> Executive Focus Engine:</strong> Paired with L-Tyrosine + L-Theanine to drive relentless, tunnel-vision focus — keeping your brain locked into high-stakes execution and strategy for 90+ minutes straight.'
  ],
  creator: [
    'CREATORS',
    '<strong>Situational Pain Point</strong><br><strong>THE 3 AM EDITING BLOCK &amp; CREATIVE BURNOUT.</strong><br>Staring at a 4K timeline for 6 hours while sugary drinks spike your anxiety and kill your creative flow.'
  ],
  gamer: [
    'GAMERS',
    '<strong> All-Genre Deep Focus:</strong> Whether you are holding pixel-tight angles in competitive FPS or locking into hours of deep tactical focus across open-world, RPG, and strategy marathons — zero eye fatigue, zero crash.'
  ],
  student: [
    'STUDENTS',
    '<strong> Focus Lock:</strong> L-Theanine + L-Tyrosine sustains deep cognitive focus and faster concept absorption so your mind never wanders mid-chapter.'
  ]
};
const tabs = [...document.querySelectorAll('[role="tab"][data-mode]')];
function selectMode(tab) {
  tabs.forEach(t => { const active = t === tab; t.setAttribute('aria-selected', String(active)); t.tabIndex = active ? 0 : -1; });
  const [title, description] = modes[tab.dataset.mode];
  const numberEl = document.getElementById('mode-number');
  if (numberEl) numberEl.textContent = '';
  document.getElementById('mode-title').textContent = title;
  document.getElementById('mode-description').innerHTML = description;
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectMode(tab));
  tab.addEventListener('keydown', e => {
    let next = null;
    if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
    if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
    if (e.key === 'Home') next = tabs[0];
    if (e.key === 'End') next = tabs[tabs.length - 1];
    if (next) { e.preventDefault(); selectMode(next); next.focus(); }
  });
});

// ── Mobile nav ─────────────────────────────────────────────────────────────────
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileNav.hidden = !open;
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));

// ── Misc ───────────────────────────────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-placeholder]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  alert(`${a.dataset.placeholder} must be published before launch.`);
}));
const signup = document.getElementById('signup-form');
signup.addEventListener('submit', async e => {
  e.preventDefault();
  const input  = document.getElementById('email');
  const status = document.getElementById('signup-message');
  if (!input.validity.valid) { status.textContent = 'Enter a valid email address.'; input.focus(); return; }
  status.textContent = 'Saving…';
  const ok = await saveEmail(input.value, 'early_access');
  if (ok) {
    status.textContent = "You're on the list. We'll be in touch before Batch 001 drops.";
    input.value = '';
  } else {
    status.textContent = 'Something went wrong — please try again.';
  }
});

// ── Precision Physics Game ─────────────────────────────────────────────────────
(function initPrecisionGame() {
  const canvas = document.getElementById('precision-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const GOLD = '#C5A059';
  const TOTAL_SHOTS = 5;

  // Game state
  const game = {
    width: 0, height: 0,
    phase: 'ready', // 'ready' | 'aiming' | 'flying' | 'complete'
    orb: { x: 0, y: 0, vx: 0, vy: 0, age: 0 },
    targetY: 0, targetX: 0, targetClock: 0,
    anchor: { x: 0, y: 0 },
    drag: null, pointerId: null,
    trail: [], particles: [],
    lastTime: 0
  };
  let results = [null, null, null, null, null]; // null | true | false
  let difficultyLevel = 0;
  let round = 1;
  let raf = 0;

  // DOM refs
  const indicators = document.querySelectorAll('.precision-indicator');
  const scoreVal = document.getElementById('precision-score-val');
  const instructionEl = document.getElementById('precision-instruction');
  const backdrop = document.getElementById('precision-backdrop');
  const closeModalBtn = document.getElementById('precision-close-modal');
  const retryBtn = document.getElementById('precision-retry');
  const modalRetryBtn = document.getElementById('precision-modal-retry');
  const resultKicker = document.getElementById('precision-result-kicker');
  const modalLead = document.getElementById('precision-modal-lead');
  const modalCopy = document.getElementById('precision-modal-copy');
  const claimForm = document.getElementById('precision-claim-form');
  const claimBtn = document.getElementById('precision-claim-btn');
  const claimError = document.getElementById('precision-claim-error');
  const claimSuccess = document.getElementById('precision-claim-success');
  const retryWrap = document.getElementById('precision-retry-wrap');
  const privacyNote = document.getElementById('precision-privacy');
  const rewardEmailInput = document.getElementById('precision-reward-email');

  function countHits() { return results.filter(r => r === true).length; }

  function updateUI() {
    const hits = countHits();
    if (scoreVal) scoreVal.textContent = `${hits}/5`;
    indicators.forEach((el, i) => {
      el.classList.remove('is-hit', 'is-miss');
      if (results[i] === true) el.classList.add('is-hit');
      if (results[i] === false) el.classList.add('is-miss');
    });
  }

  function updateInstruction() {
    if (!instructionEl) return;
    if (game.phase === 'aiming') {
      instructionEl.textContent = 'PULL BACK TO SET YOUR ANGLE. RELEASE TO LAUNCH.';
    } else if (game.phase === 'flying') {
      instructionEl.textContent = 'HOLD YOUR FOCUS. SHOT IN PROGRESS.';
    } else if (game.phase === 'complete') {
      instructionEl.textContent = '';
    } else {
      instructionEl.textContent = 'DRAG & RELEASE THE ORB TO LAUNCH IT THROUGH THE TARGET RING.';
    }
  }

  function showResultModal() {
    const hits = countHits();
    const isWon = hits >= 3;
    if (resultKicker) resultKicker.textContent = isWon ? '⬡ REWARD UNLOCKED' : 'NOT QUITE';
    if (modalLead) modalLead.textContent = isWon ? (hits === 5 ? 'TOP 1% REFLEX CONTROL.' : 'YOUR FOCUS IS STEADY.') : 'AIM DRIFTED.';
    if (modalCopy) {
      if (isWon) {
        modalCopy.innerHTML = hits === 5
          ? "You've unlocked <strong>15% OFF</strong> your Batch 001 order."
          : "You've unlocked <strong>10% OFF</strong> your Batch 001 order.";
      } else {
        modalCopy.textContent = 'Your aim drifted. Take one deep breath and run the calibration one more time.';
      }
    }
    // Show/hide sections
    if (claimForm) claimForm.style.display = isWon ? 'flex' : 'none';
    if (retryWrap) retryWrap.style.display = isWon ? 'none' : 'flex';
    if (privacyNote) privacyNote.hidden = !isWon;
    if (claimSuccess) claimSuccess.hidden = true;
    if (claimError) claimError.hidden = true;
    if (claimBtn) claimBtn.textContent = `CLAIM ${hits === 5 ? '15%' : '10%'} OFFER ↗`;
    if (rewardEmailInput) rewardEmailInput.value = '';
    if (backdrop) backdrop.hidden = false;
  }

  function hideResultModal() {
    if (backdrop) backdrop.hidden = true;
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    const w = Math.max(1, bounds.width);
    const h = Math.max(1, bounds.height);
    const prevW = game.width, prevH = game.height;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (prevW && prevH) {
      const sx = w / prevW, sy = h / prevH;
      game.orb.x *= sx; game.orb.y *= sy;
      game.orb.vx *= sx; game.orb.vy *= sy;
      game.targetY *= sy;
      game.trail = game.trail.map(p => ({ x: p.x * sx, y: p.y * sy }));
    }
    game.width = w; game.height = h;
    game.targetX = w * 0.78;
    const anchorRatio = w < 500 ? 0.18 : w < 700 ? 0.16 : 0.14;
    game.anchor = { x: w * anchorRatio, y: h * 0.78 };
    if (game.phase !== 'flying') {
      game.orb.x = game.anchor.x;
      game.orb.y = game.anchor.y;
    }
    if (!game.targetY) game.targetY = h * 0.42;
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  function targetYAt(clock) {
    const hits = countHits();
    const speed = (1.25 + hits * 0.9 + difficultyLevel * 0.35);
    const range = game.height * 0.16;
    return game.height * 0.43 + Math.sin(clock * speed) * range;
  }

  const canImg = new Image();
  canImg.src = './images/mute-can.png';

  function drawOrb(x, y, radius) {
    const cw = radius * 1.8;   // can width
    const ch = radius * 3.8;   // can height

    if (canImg.complete && canImg.naturalWidth > 0) {
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.85)';
      ctx.shadowBlur = 14;
      ctx.drawImage(canImg, x - cw / 2, y - ch / 2, cw, ch);
      ctx.restore();
      return;
    }

    const cx = x - cw / 2;
    const cy = y - ch / 2;
    const r = cw * 0.18;       // corner radius for body

    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.9)';
    ctx.shadowBlur = 16;

    // ── Body gradient (matte black with subtle sheen) ──
    const bodyGrad = ctx.createLinearGradient(cx, cy, cx + cw, cy);
    bodyGrad.addColorStop(0,    '#050506');
    bodyGrad.addColorStop(0.12, '#2d3034');
    bodyGrad.addColorStop(0.28, '#0c0d0e');
    bodyGrad.addColorStop(0.55, '#141516');
    bodyGrad.addColorStop(0.82, '#333538');
    bodyGrad.addColorStop(1,    '#050506');

    ctx.beginPath();
    ctx.moveTo(cx + r, cy + r);
    ctx.lineTo(cx + cw - r, cy + r);
    ctx.quadraticCurveTo(cx + cw, cy + r, cx + cw, cy + r * 2);
    ctx.lineTo(cx + cw, cy + ch - r * 2);
    ctx.quadraticCurveTo(cx + cw, cy + ch, cx + cw - r, cy + ch);
    ctx.lineTo(cx + r, cy + ch);
    ctx.quadraticCurveTo(cx, cy + ch, cx, cy + ch - r * 2);
    ctx.lineTo(cx, cy + r * 2);
    ctx.quadraticCurveTo(cx, cy + r, cx + r, cy + r);
    ctx.closePath();
    ctx.fillStyle = bodyGrad;
    ctx.fill();

    // ── Specular highlight strip ──
    const shineGrad = ctx.createLinearGradient(cx + cw * 0.3, cy, cx + cw * 0.5, cy);
    shineGrad.addColorStop(0, 'rgba(255,255,255,0)');
    shineGrad.addColorStop(0.5, 'rgba(255,255,255,0.08)');
    shineGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.moveTo(cx + r, cy + r);
    ctx.lineTo(cx + cw - r, cy + r);
    ctx.quadraticCurveTo(cx + cw, cy + r, cx + cw, cy + r * 2);
    ctx.lineTo(cx + cw, cy + ch - r * 2);
    ctx.quadraticCurveTo(cx + cw, cy + ch, cx + cw - r, cy + ch);
    ctx.lineTo(cx + r, cy + ch);
    ctx.quadraticCurveTo(cx, cy + ch, cx, cy + ch - r * 2);
    ctx.lineTo(cx, cy + r * 2);
    ctx.quadraticCurveTo(cx, cy + r, cx + r, cy + r);
    ctx.closePath();
    ctx.fillStyle = shineGrad;
    ctx.fill();

    // ── Top rim ellipse ──
    const rimH = cw * 0.22;
    const rimGrad = ctx.createLinearGradient(cx, cy, cx, cy + rimH);
    rimGrad.addColorStop(0, '#8b8e91');
    rimGrad.addColorStop(0.6, '#1b1c1e');
    rimGrad.addColorStop(1, '#070809');
    ctx.beginPath();
    ctx.ellipse(x, cy + rimH * 0.5, cw / 2, rimH / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = rimGrad;
    ctx.fill();
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // ── Pull ring ──
    ctx.beginPath();
    ctx.arc(x + cw * 0.1, cy + rimH * 0.3, cw * 0.09, 0, Math.PI * 2);
    ctx.strokeStyle = '#777a7b';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // ── Bottom ellipse ──
    ctx.beginPath();
    ctx.ellipse(x, cy + ch, cw / 2, rimH / 2.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1a1b1c';
    ctx.fill();

    // ── "MUTE" text rotated 90° ──
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-Math.PI / 2);
    const fontSize = Math.max(5, cw * 0.38);
    ctx.font = `800 ${fontSize}px Montserrat, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(246,245,242,0.88)';
    ctx.shadowColor = 'transparent';
    ctx.fillText('MUTE', 0, 0);
    ctx.restore();

    ctx.restore();
  }

  function drawTarget(centerY, ringRadius) {
    const x = game.targetX;
    ctx.save();
    ctx.shadowColor = 'rgba(197,160,89,0.18)';
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.arc(x, centerY, ringRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(197,160,89,0.86)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
    ctx.beginPath();
    ctx.arc(x, centerY, ringRadius - 6, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(245,225,180,0.24)';
    ctx.lineWidth = 1;
    ctx.stroke();
    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI / 2) * i;
      const inner = ringRadius - 2, outer = ringRadius + 6;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(angle) * inner, centerY + Math.sin(angle) * inner);
      ctx.lineTo(x + Math.cos(angle) * outer, centerY + Math.sin(angle) * outer);
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(x, centerY, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(197,160,89,0.7)';
    ctx.fill();
  }

  function drawTrajectory(ballRadius, ringRadius) {
    if (game.phase !== 'aiming' || !game.drag) return;
    const scale = game.width / 700;
    const vx = (game.anchor.x - game.drag.x) * 6.5 * scale;
    const vy = (game.anchor.y - game.drag.y) * 6.5 * scale;
    const gravity = 820 * scale;
    const impactTime = vx > 0 ? (game.targetX - game.anchor.x) / vx : -1;
    ctx.save();
    for (let t = 0.08; t < 2; t += 0.11) {
      const px = game.anchor.x + vx * t;
      const py = game.anchor.y + vy * t + gravity * t * t * 0.5;
      if (px > game.width || py > game.height) break;
      const opacity = Math.max(0.12, 0.75 - t * 0.31);
      ctx.beginPath();
      ctx.arc(px, py, Math.max(1.3, 2.5 - t * 0.5), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(197,160,89,${opacity})`;
      ctx.fill();
    }
    if (vx > 0 && impactTime > 0 && impactTime < 3) {
      const predictedY = targetYAt(game.targetClock + impactTime);
      ctx.beginPath();
      ctx.arc(game.targetX, predictedY, ringRadius - ballRadius - 2, 0, Math.PI * 2);
      ctx.setLineDash([3, 5]);
      ctx.strokeStyle = 'rgba(197,160,89,0.42)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
    }
    const dist = Math.hypot(game.anchor.x - game.drag.x, game.anchor.y - game.drag.y);
    if (dist > 8) {
      ctx.beginPath();
      ctx.moveTo(game.anchor.x, game.anchor.y);
      ctx.lineTo(game.drag.x, game.drag.y);
      ctx.strokeStyle = 'rgba(197,160,89,0.32)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
    drawOrb(game.anchor.x, game.anchor.y, ballRadius);
  }

  function resolveShot(success) {
    const nextIndex = results.findIndex(r => r === null);
    if (nextIndex === -1) return;
    results[nextIndex] = success;
    updateUI();
    if (success) {
      // Particle burst
      for (let i = 0; i < 28; i++) {
        const angle = (Math.PI * 2 * i) / 28;
        const speed = 35 + Math.random() * 145;
        game.particles.push({
          x: game.targetX, y: game.targetY,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          life: 0.45 + Math.random() * 0.45
        });
      }
    }
    if (results.every(r => r !== null)) {
      game.phase = 'complete';
      updateInstruction();
      setTimeout(showResultModal, 500);
      return;
    }
    game.phase = 'ready';
    game.orb.x = game.anchor.x; game.orb.y = game.anchor.y;
    game.orb.vx = 0; game.orb.vy = 0; game.orb.age = 0;
    game.trail = [];
    updateInstruction();
  }

  function frame(timestamp) {
    const delta = game.lastTime ? Math.min((timestamp - game.lastTime) / 1000, 0.032) : 0;
    game.lastTime = timestamp;
    const { width, height } = game;
    const scale = width / 700;
    const ballRadius = Math.max(9, Math.min(14, width * 0.018));
    const ringRadius = Math.max(26, Math.min(42, width * 0.043)) - difficultyLevel * 1.6;
    const prevTargetY = game.targetY;
    const gravity = 820 * scale;
    game.targetClock += delta;
    game.targetY = targetYAt(game.targetClock);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, width, height);

    // Grid
    const gridSpacing = Math.max(28, 38 * scale);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(244,241,234,0.035)';
    for (let x = 0; x < width; x += gridSpacing) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
    for (let y = 0; y < height; y += gridSpacing) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(244,241,234,0.16)';
    ctx.strokeRect(12, 12, width - 24, height - 24);

    drawTarget(game.targetY, ringRadius);

    if (game.phase === 'aiming') {
      drawTrajectory(ballRadius, ringRadius);
    } else if (game.phase === 'flying') {
      game.orb.age += delta;
      game.orb.x += game.orb.vx * delta;
      game.orb.y += game.orb.vy * delta;
      game.orb.vy += gravity * delta;
      game.trail.push({ x: game.orb.x, y: game.orb.y });
      if (game.trail.length > 10) game.trail.shift();
      game.trail.forEach((p, i) => {
        const opacity = (i / game.trail.length) * 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, ballRadius * (i / game.trail.length) * 0.75, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244,241,234,${opacity})`;
        ctx.fill();
      });
      drawOrb(game.orb.x, game.orb.y, ballRadius);
      // Hit detection
      if (game.orb.vx > 0 && game.orb.x >= game.targetX && game.orb.x - game.orb.vx * delta < game.targetX) {
        const prevX = game.orb.x - game.orb.vx * delta;
        const prevY = game.orb.y - game.orb.vy * delta;
        const ratio = (game.targetX - prevX) / (game.orb.x - prevX);
        const crossY = prevY + (game.orb.y - prevY) * ratio;
        const crossTargetY = prevTargetY + (game.targetY - prevTargetY) * ratio;
        const success = Math.abs(crossY - crossTargetY) <= ringRadius - ballRadius - 2;
        resolveShot(success);
      } else if (game.orb.x > width + ballRadius || game.orb.y > height + ballRadius * 2 || game.orb.y < -ballRadius * 2 || game.orb.age > 3) {
        resolveShot(false);
      }
    } else {
      drawOrb(game.anchor.x, game.anchor.y, ballRadius);
      if (game.phase === 'ready') {
        ctx.beginPath();
        ctx.ellipse(game.anchor.x, game.anchor.y + ballRadius * 1.9, ballRadius * 1.2, ballRadius * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(197,160,89,0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Particles
    if (game.particles.length) {
      game.particles = game.particles.filter(p => p.life > 0);
      game.particles.forEach(p => {
        p.x += p.vx * delta; p.y += p.vy * delta;
        p.vy += gravity * delta * 0.16;
        p.life -= delta;
        ctx.globalAlpha = Math.min(1, p.life * 1.8);
        ctx.fillStyle = GOLD;
        ctx.fillRect(p.x, p.y, 2, 2);
      });
      ctx.globalAlpha = 1;
    }

    raf = requestAnimationFrame(frame);
  }

  raf = requestAnimationFrame(frame);

  // ── Pointer events ────────────────────────────────────────────────────────
  function getPoint(e) {
    const bounds = canvas.getBoundingClientRect();
    return { x: e.clientX - bounds.left, y: e.clientY - bounds.top };
  }

  canvas.addEventListener('pointerdown', e => {
    if (game.phase !== 'ready' || results.every(r => r !== null)) return;
    const pt = getPoint(e);
    const radius = Math.max(24, game.width * 0.055);
    if (Math.hypot(pt.x - game.anchor.x, pt.y - game.anchor.y) > radius) return;
    canvas.setPointerCapture(e.pointerId);
    game.pointerId = e.pointerId;
    game.drag = pt;
    game.phase = 'aiming';
    updateInstruction();
  });

  canvas.addEventListener('pointermove', e => {
    if (game.phase !== 'aiming' || game.pointerId !== e.pointerId) return;
    const pt = getPoint(e);
    const dx = game.anchor.x - pt.x, dy = game.anchor.y - pt.y;
    const maxDrag = Math.max(58, Math.min(180, Math.max(game.width * 0.28, game.height * 0.48)));
    const dist = Math.hypot(dx, dy);
    const factor = dist > maxDrag ? maxDrag / dist : 1;
    game.drag = { x: game.anchor.x - dx * factor, y: game.anchor.y - dy * factor };
  });

  function handleRelease(e) {
    if (game.phase !== 'aiming' || game.pointerId !== e.pointerId || !game.drag) return;
    const dist = Math.hypot(game.anchor.x - game.drag.x, game.anchor.y - game.drag.y);
    game.pointerId = null;
    if (dist < 8) { game.drag = null; game.phase = 'ready'; updateInstruction(); return; }
    const launchScale = game.width / 700;
    game.orb.vx = (game.anchor.x - game.drag.x) * 6.5 * launchScale;
    game.orb.vy = (game.anchor.y - game.drag.y) * 6.5 * launchScale;
    game.orb.x = game.anchor.x; game.orb.y = game.anchor.y; game.orb.age = 0;
    game.trail = []; game.drag = null;
    game.phase = 'flying';
    updateInstruction();
  }
  canvas.addEventListener('pointerup', handleRelease);
  canvas.addEventListener('pointercancel', handleRelease);

  // ── Retry ─────────────────────────────────────────────────────────────────
  function doRetry() {
    hideResultModal();
    const hits = countHits();
    if (hits < 3) difficultyLevel = Math.min(3, difficultyLevel + 1);
    results = [null, null, null, null, null];
    updateUI();
    game.phase = 'ready';
    game.particles = [];
    game.targetClock = 0;
    game.targetY = game.height * 0.42;
    game.orb.x = game.anchor.x; game.orb.y = game.anchor.y;
    game.trail = [];
    round++;
    updateInstruction();
  }

  if (retryBtn) retryBtn.addEventListener('click', doRetry);
  if (modalRetryBtn) modalRetryBtn.addEventListener('click', doRetry);
  if (closeModalBtn) closeModalBtn.addEventListener('click', hideResultModal);

  // ── Claim form ────────────────────────────────────────────────────────────
  if (claimForm) {
    claimForm.addEventListener('submit', async e => {
      e.preventDefault();
      const email = rewardEmailInput ? rewardEmailInput.value.trim() : '';
      if (!email || !email.includes('@')) {
        if (claimError) claimError.hidden = false;
        return;
      }
      if (claimError) claimError.hidden = true;
      if (claimBtn) { claimBtn.textContent = 'SAVING…'; claimBtn.disabled = true; }
      const hits = countHits();
      const rewardCode = hits === 5 ? 'MUTE15' : 'MUTE10';
      const ok = await saveEmail(email, 'game_reward', `${hits === 5 ? '15%' : '10%'} OFF — code ${rewardCode}`);
      if (ok) {
        if (claimForm) claimForm.style.display = 'none';
        if (claimSuccess) claimSuccess.hidden = false;
        if (privacyNote) privacyNote.hidden = true;
      } else {
        if (claimBtn) { claimBtn.textContent = `CLAIM ${hits === 5 ? '15%' : '10%'} OFFER ↗`; claimBtn.disabled = false; }
        if (claimError) { claimError.textContent = 'Could not save — please try again.'; claimError.hidden = false; }
      }
    });
  }

  updateInstruction();
})();

// ── Promo popup (shows after 8 seconds) ───────────────────────────────────────
(function initPromoPopup() {
  const backdrop = document.getElementById('promo-backdrop');
  const closeBtn = document.getElementById('promo-close');
  const ctaBtn   = document.getElementById('promo-cta');
  if (!backdrop) return;

  function closePopup() {
    backdrop.hidden = true;
  }

  // Show after 8 seconds
  setTimeout(() => {
    backdrop.hidden = false;
  }, 8000);

  // Close button
  if (closeBtn) closeBtn.addEventListener('click', closePopup);

  // Click outside the box closes it
  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closePopup();
  });

  // CTA: scroll to challenge section and close
  if (ctaBtn) {
    ctaBtn.addEventListener('click', e => {
      e.preventDefault();
      closePopup();
      const target = document.getElementById('challenge');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ESC key closes
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !backdrop.hidden) closePopup();
  });
})();
