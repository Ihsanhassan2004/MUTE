import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, RotateCcw, X } from 'lucide-react';
import { MUTE_PRODUCT } from '../../data/product';
import { subscriberService } from '../../services/subscriberService';
import './PrecisionChallenge.css';

type ShotResult = boolean;
type GamePhase = 'ready' | 'aiming' | 'flying' | 'complete';

interface Point {
  x: number;
  y: number;
}

interface Particle extends Point {
  vx: number;
  vy: number;
  life: number;
}

interface GameState {
  width: number;
  height: number;
  phase: GamePhase;
  orb: Point & { vx: number; vy: number; age: number };
  targetY: number;
  targetX: number;
  targetClock: number;
  anchor: Point;
  drag: Point | null;
  pointerId: number | null;
  trail: Point[];
  particles: Particle[];
  lastTime: number;
}

const GOLD = '#C5A059';
const EMPTY_RESULTS: (ShotResult | null)[] = [null, null, null, null, null];

export const PrecisionChallenge: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canImageRef = useRef<HTMLImageElement | null>(null);
  const gameRef = useRef<GameState>({
    width: 0,
    height: 0,
    phase: 'ready',
    orb: { x: 0, y: 0, vx: 0, vy: 0, age: 0 },
    targetY: 0,
    targetX: 0,
    targetClock: 0,
    anchor: { x: 0, y: 0 },
    drag: null,
    pointerId: null,
    trail: [],
    particles: [],
    lastTime: 0,
  });
  const resultsRef = useRef<(ShotResult | null)[]>(EMPTY_RESULTS);
  const difficultyRef = useRef(0);
  const [results, setResults] = useState<(ShotResult | null)[]>(EMPTY_RESULTS);
  const [phase, setPhase] = useState<GamePhase>('ready');
  const [canvasUnavailable, setCanvasUnavailable] = useState(false);
  const [round, setRound] = useState(1);
  const [difficulty, setDifficulty] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [rewardEmail, setRewardEmail] = useState('');
  const [claimState, setClaimState] = useState<'idle' | 'success' | 'error'>('idle');
  const hits = results.filter((result) => result === true).length;
  const attempts = results.filter((result) => result !== null).length;
  const isWon = phase === 'complete' && hits >= 3;
  const rewardCode = hits === 5 ? 'MUTE15' : 'MUTE10';

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      canImageRef.current = image;
    };
    image.src = MUTE_PRODUCT.images.hero;
    return () => {
      image.onload = null;
    };
  }, []);

  const playTone = useCallback((_success: boolean) => {
    // Sound disabled
  }, []);

  const resolveShot = useCallback((success: boolean) => {
    const game = gameRef.current;
    const nextResults = [...resultsRef.current];
    const nextIndex = nextResults.findIndex((result) => result === null);
    if (nextIndex === -1) return;
    nextResults[nextIndex] = success;
    resultsRef.current = nextResults;
    setResults(nextResults);
    playTone(success);

    if (success && !reducedMotion) {
      for (let index = 0; index < 28; index += 1) {
        const angle = (Math.PI * 2 * index) / 28;
        const speed = 35 + Math.random() * 145;
        game.particles.push({
          x: game.targetX,
          y: game.targetY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0.45 + Math.random() * 0.45,
        });
      }
    }

    if (nextResults.every((result) => result !== null)) {
      game.phase = 'complete';
      setPhase('complete');
      setRewardEmail('');
      setClaimState('idle');
      setResultModalOpen(true);
      return;
    }

    game.phase = 'ready';
    game.orb.x = game.anchor.x;
    game.orb.y = game.anchor.y;
    game.orb.vx = 0;
    game.orb.vy = 0;
    game.orb.age = 0;
    game.trail = [];
    setPhase('ready');
  }, [playTone, reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) {
      setCanvasUnavailable(true);
      return;
    }

    const game = gameRef.current;
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);
      const previousWidth = game.width;
      const previousHeight = game.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      if (previousWidth && previousHeight) {
        const xScale = width / previousWidth;
        const yScale = height / previousHeight;
        game.orb.x *= xScale;
        game.orb.y *= yScale;
        game.orb.vx *= xScale;
        game.orb.vy *= yScale;
        game.targetY *= yScale;
        game.trail = game.trail.map((point) => ({ x: point.x * xScale, y: point.y * yScale }));
      }

      game.width = width;
      game.height = height;
      game.targetX = width * 0.8;
      const anchorRatio = width < 500 ? 0.24 : width < 700 ? 0.22 : 0.16;
      game.anchor = { x: width * anchorRatio, y: height * 0.8 };
      if (game.phase !== 'flying') {
        game.orb.x = game.anchor.x;
        game.orb.y = game.anchor.y;
      }
      if (!game.targetY) {
        game.targetY = height * 0.42;
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const targetYAt = (clock: number) => {
      const successfulShots = resultsRef.current.filter(Boolean).length;
      const targetSpeed = (reducedMotion ? 0.65 : 1.25) + successfulShots * 0.9 + difficultyRef.current * 0.35;
      const targetRange = game.height * (reducedMotion ? 0.1 : 0.16);
      return game.height * 0.43 + Math.sin(clock * targetSpeed) * targetRange;
    };

    const drawOrb = (x: number, y: number, radius: number, rotation = 0) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.shadowColor = 'rgba(0, 0, 0, 0.8)';
      context.shadowBlur = 12;
      const canImage = canImageRef.current;
      if (canImage?.complete && canImage.naturalWidth > 0) {
        const sourceX = canImage.naturalWidth * 0.32;
        const sourceY = canImage.naturalHeight * 0.17;
        const sourceWidth = canImage.naturalWidth * 0.36;
        const sourceHeight = canImage.naturalHeight * 0.68;
        const canWidth = radius * 2.3;
        const canHeight = radius * 4.4;
        context.drawImage(
          canImage,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          -canWidth / 2,
          -canHeight / 2,
          canWidth,
          canHeight
        );
      } else {
        context.beginPath();
        context.arc(0, 0, radius, 0, Math.PI * 2);
        context.fillStyle = '#777';
        context.fill();
      }
      context.restore();
    };

    const drawTarget = (centerY: number, ringRadius: number) => {
      const x = game.targetX;
      context.save();
      context.shadowColor = 'rgba(197, 160, 89, 0.18)';
      context.shadowBlur = 24;
      context.beginPath();
      context.arc(x, centerY, ringRadius, 0, Math.PI * 2);
      context.strokeStyle = 'rgba(197, 160, 89, 0.86)';
      context.lineWidth = 3;
      context.stroke();
      context.restore();
      context.beginPath();
      context.arc(x, centerY, ringRadius - 6, 0, Math.PI * 2);
      context.strokeStyle = 'rgba(245, 225, 180, 0.24)';
      context.lineWidth = 1;
      context.stroke();

      for (let index = 0; index < 4; index += 1) {
        const angle = (Math.PI / 2) * index;
        const inner = ringRadius - 2;
        const outer = ringRadius + 6;
        context.beginPath();
        context.moveTo(x + Math.cos(angle) * inner, centerY + Math.sin(angle) * inner);
        context.lineTo(x + Math.cos(angle) * outer, centerY + Math.sin(angle) * outer);
        context.strokeStyle = GOLD;
        context.lineWidth = 2;
        context.stroke();
      }

      context.beginPath();
      context.arc(x, centerY, 2, 0, Math.PI * 2);
      context.fillStyle = 'rgba(197,160,89,0.7)';
      context.fill();
    };

    const drawTrajectory = (ballRadius: number, ringRadius: number) => {
      if (game.phase !== 'aiming' || !game.drag) return;
      const velocityX = (game.anchor.x - game.drag.x) * 6.5 * (game.width / 700);
      const velocityY = (game.anchor.y - game.drag.y) * 6.5 * (game.width / 700);
      const gravity = 820 * (game.width / 700);
      const impactTime = (game.targetX - game.anchor.x) / velocityX;
      context.save();
      for (let time = 0.08; time < 2; time += 0.11) {
        const x = game.anchor.x + velocityX * time;
        const y = game.anchor.y + velocityY * time + gravity * time * time * 0.5;
        if (x > game.width || y > game.height) break;
        const opacity = Math.max(0.12, 0.75 - time * 0.31);
        context.beginPath();
        context.arc(x, y, Math.max(1.3, 2.5 - time * 0.5), 0, Math.PI * 2);
        context.fillStyle = `rgba(197, 160, 89, ${opacity})`;
        context.fill();
      }
      if (velocityX > 0 && impactTime > 0 && impactTime < 3) {
        const predictedTargetY = targetYAt(game.targetClock + impactTime);
        context.beginPath();
        context.arc(game.targetX, predictedTargetY, ringRadius - ballRadius - 2, 0, Math.PI * 2);
        context.setLineDash([3, 5]);
        context.strokeStyle = 'rgba(197,160,89,0.42)';
        context.lineWidth = 1;
        context.stroke();
        context.setLineDash([]);
      }
      const dragDistance = Math.hypot(game.anchor.x - game.drag.x, game.anchor.y - game.drag.y);
      if (dragDistance > 8) {
        context.beginPath();
        context.moveTo(game.anchor.x, game.anchor.y);
        context.lineTo(game.drag.x, game.drag.y);
        context.strokeStyle = 'rgba(197,160,89,0.32)';
        context.lineWidth = 1;
        context.stroke();
      }
      context.restore();
      drawOrb(game.anchor.x, game.anchor.y, ballRadius);
    };

    let animationFrame = 0;
    const frame = (timestamp: number) => {
      const delta = game.lastTime ? Math.min((timestamp - game.lastTime) / 1000, 0.032) : 0;
      game.lastTime = timestamp;
      const { width, height } = game;
      const scale = width / 700;
      const ballRadius = Math.max(9, Math.min(14, width * 0.018));
      const ringRadius = Math.max(26, Math.min(42, width * 0.043)) - difficultyRef.current * 1.6;
      const previousTargetY = game.targetY;
      const gravity = 820 * scale;

      game.targetClock += delta;
      game.targetY = targetYAt(game.targetClock);

      context.clearRect(0, 0, width, height);
      context.fillStyle = '#0A0A0A';
      context.fillRect(0, 0, width, height);

      const gridSpacing = Math.max(28, 38 * scale);
      context.lineWidth = 1;
      for (let x = 0; x < width; x += gridSpacing) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.strokeStyle = 'rgba(244, 241, 234, 0.035)';
        context.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.strokeStyle = 'rgba(244, 241, 234, 0.035)';
        context.stroke();
      }

      context.strokeStyle = 'rgba(244, 241, 234, 0.16)';
      context.strokeRect(12, 12, width - 24, height - 24);
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

        for (let index = 0; index < game.trail.length; index += 1) {
          const point = game.trail[index];
          const opacity = (index / game.trail.length) * 0.35;
          context.beginPath();
          context.arc(point.x, point.y, ballRadius * (index / game.trail.length) * 0.75, 0, Math.PI * 2);
          context.fillStyle = `rgba(244,241,234,${opacity})`;
          context.fill();
        }
        drawOrb(game.orb.x, game.orb.y, ballRadius, Math.atan2(game.orb.vy, game.orb.vx) + Math.PI / 2);

        if (game.orb.vx > 0 && game.orb.x >= game.targetX && game.orb.x - game.orb.vx * delta < game.targetX) {
          const previousX = game.orb.x - game.orb.vx * delta;
          const previousY = game.orb.y - game.orb.vy * delta;
          const crossingRatio = (game.targetX - previousX) / (game.orb.x - previousX);
          const crossingY = previousY + (game.orb.y - previousY) * crossingRatio;
          const crossingTargetY = previousTargetY + (game.targetY - previousTargetY) * crossingRatio;
          const success = Math.abs(crossingY - crossingTargetY) <= ringRadius - ballRadius - 2;
          resolveShot(success);
        } else if (
          game.orb.x > width + ballRadius ||
          game.orb.y > height + ballRadius * 2 ||
          game.orb.y < -ballRadius * 2 ||
          game.orb.age > 3
        ) {
          resolveShot(false);
        }
      } else {
        const dragRotation = game.drag
          ? Math.atan2(game.anchor.y - game.drag.y, game.anchor.x - game.drag.x) + Math.PI / 2
          : 0;
        drawOrb(game.anchor.x, game.anchor.y, ballRadius, dragRotation);
      }

      if (game.particles.length) {
        game.particles = game.particles.filter((particle) => particle.life > 0);
        game.particles.forEach((particle) => {
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;
          particle.vy += gravity * delta * 0.16;
          particle.life -= delta;
          context.globalAlpha = Math.min(1, particle.life * 1.8);
          context.fillStyle = GOLD;
          context.fillRect(particle.x, particle.y, 2, 2);
        });
        context.globalAlpha = 1;
      }

      if (game.phase === 'ready') {
        context.beginPath();
        context.arc(game.anchor.x, game.anchor.y, ballRadius + 8, 0, Math.PI * 2);
        context.strokeStyle = 'rgba(197,160,89,0.2)';
        context.lineWidth = 1;
        context.stroke();
      }
      animationFrame = window.requestAnimationFrame(frame);
    };

    animationFrame = window.requestAnimationFrame(frame);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [reducedMotion, resolveShot]);

  const getCanvasPoint = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const game = gameRef.current;
    if (game.phase !== 'ready' || resultsRef.current.every((result) => result !== null)) return;
    const point = getCanvasPoint(event);
    const radius = Math.max(24, game.width * 0.055);
    if (Math.hypot(point.x - game.anchor.x, point.y - game.anchor.y) > radius) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    game.pointerId = event.pointerId;
    game.drag = point;
    game.phase = 'aiming';
    setPhase('aiming');
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const game = gameRef.current;
    if (game.phase !== 'aiming' || game.pointerId !== event.pointerId) return;
    const point = getCanvasPoint(event);
    const dx = game.anchor.x - point.x;
    const dy = game.anchor.y - point.y;
    const maximumDrag = Math.max(58, Math.min(180, Math.max(game.width * 0.28, game.height * 0.48)));
    const distance = Math.hypot(dx, dy);
    const factor = distance > maximumDrag ? maximumDrag / distance : 1;
    game.drag = { x: game.anchor.x - dx * factor, y: game.anchor.y - dy * factor };
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const game = gameRef.current;
    if (game.phase !== 'aiming' || game.pointerId !== event.pointerId || !game.drag) return;
    const dragDistance = Math.hypot(game.anchor.x - game.drag.x, game.anchor.y - game.drag.y);
    game.pointerId = null;
    if (dragDistance < 8) {
      game.drag = null;
      game.phase = 'ready';
      setPhase('ready');
      return;
    }
    const launchScale = game.width / 700;
    game.orb.vx = (game.anchor.x - game.drag.x) * 6.5 * launchScale;
    game.orb.vy = (game.anchor.y - game.drag.y) * 6.5 * launchScale;
    game.orb.x = game.anchor.x;
    game.orb.y = game.anchor.y;
    game.orb.age = 0;
    game.trail = [];
    game.drag = null;
    game.phase = 'flying';
    setPhase('flying');
  };

  const retry = () => {
    setResultModalOpen(false);
    setRewardEmail('');
    setClaimState('idle');
    if (hits < 3) {
      difficultyRef.current = Math.min(3, difficultyRef.current + 1);
      setDifficulty(difficultyRef.current);
    }
    resultsRef.current = [...EMPTY_RESULTS];
    setResults([...EMPTY_RESULTS]);
    gameRef.current.phase = 'ready';
    gameRef.current.particles = [];
    gameRef.current.targetClock = 0;
    gameRef.current.targetY = gameRef.current.height * 0.42;
    gameRef.current.orb.x = gameRef.current.anchor.x;
    gameRef.current.orb.y = gameRef.current.anchor.y;
    setRound((previous) => previous + 1);
    setPhase('ready');
  };

  const handleClaimOffer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subscriber = subscriberService.addSubscriber(
      rewardEmail,
      'precision_challenge',
      `${hits === 5 ? '15%' : '10%'} off reward claimed — code ${rewardCode}`
    );
    if (!subscriber) {
      setClaimState('error');
      return;
    }
    setClaimState('success');
  };

  return (
    <section
      id="shutdown-system"
      className="precision-challenge relative overflow-hidden border-y border-[#1D1A14] bg-[#0A0A0A] py-20 text-[#F4F1EA] sm:py-28"
    >
      <div className="precision-ambient" aria-hidden="true" />
      <div className="precision-shell relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <header className="precision-heading mb-8 text-center sm:mb-10">
          <p className="precision-kicker mb-4"></p>
          <h2 className="precision-title">KILL THE NOISE.</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm font-light text-[#8D8D8D]">
            Your day doesn’t need another notification.
          </p>
          <button
            type="button"
            className="precision-scroll mt-5 inline-flex items-center gap-2 text-[10px] tracking-[0.18em] text-[#C5A059]"
            onClick={() => document.getElementById('precision-game')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })}
          >
            PLAY THE GAME GET THE MUTE OFFER<ArrowDown size={12} />
          </button>
        </header>

        <div id="precision-game" className="precision-panel">
          <div className="precision-scorebar">
            <div className="precision-trials">
              <span className="precision-label">TRIALS</span>
              <div className="precision-indicators" aria-label={`${attempts} of 5 shots taken`}>
                {results.map((result, index) => (
                  <span
                    key={index}
                    className={`precision-indicator ${result === true ? 'is-hit' : result === false ? 'is-miss' : ''}`}
                    aria-label={`Shot ${index + 1}: ${result === null ? 'remaining' : result ? 'hit' : 'miss'}`}
                  />
                ))}
              </div>
            </div>
            <div className="precision-score">
              <span className="precision-label">SCORE</span>
              <strong>{hits}/5</strong>
            </div>
            <p className="precision-target-copy">
              <span className="precision-label">TARGET</span>
              <strong>3 HITS = 10% OFF <i>|</i> 5 HITS = 15% OFF</strong>
            </p>
          </div>

          <div className="precision-arena">
            <canvas
              ref={canvasRef}
              className="precision-canvas"
              aria-label="Physics challenge. Drag the MUTE can backwards, then release to launch it into the target ring."
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            />

            {canvasUnavailable && (
              <p className="precision-canvas-error" role="alert">Canvas is unavailable in this browser.</p>
            )}
          </div>

          {phase !== 'complete' && (
            <>
              <div className="precision-instruction">
                {phase === 'aiming'
                  ? 'PULL BACK TO SET YOUR ANGLE. RELEASE TO LAUNCH.'
                  : phase === 'flying'
                    ? 'HOLD YOUR FOCUS. SHOT IN PROGRESS.'
                    : 'DRAG & RELEASE TO LAUNCH THE MUTE CAN THROUGH THE TARGET RING.'}
              </div>
              <p className="precision-hint">
                {difficulty > 0
                  ? `ROUND ${round} // RING SLIGHTLY TIGHTER · TARGET MOVEMENT INCREASED`
                  : 'PULL THE CAN BACKWARD TO AIM · FIVE SHOTS · NO TIME LIMIT'}
              </p>
            </>
          )}

          <div className="precision-footer-action">
            <button
              type="button"
              className="precision-mini-retry"
              onClick={retry}
              title="Reset and retry calibration"
            >
              <RotateCcw size={10} />
              <span>RETRY</span>
            </button>
          </div>
        </div>

        {resultModalOpen && phase === 'complete' && (
          <div className="precision-reward-backdrop" role="presentation">
            <div
              className="precision-reward-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="precision-result-title"
              aria-describedby="precision-result-description"
            >
              <button
                type="button"
                className="precision-reward-close"
                onClick={() => setResultModalOpen(false)}
                aria-label="Close result popup"
              >
                <X size={17} />
              </button>
              <p className="precision-kicker">
                {isWon ? ' REWARD UNLOCKED' : 'YOU LOSE THE GAME '}
              </p>

              {isWon && claimState === 'success' ? (
                <div className="precision-claim-success" role="status">
                  <p id="precision-result-description">Your reward is claimed. you get notification to your email.</p>


                </div>
              ) : isWon ? (
                <>
                  <p className="precision-modal-lead">
                    {hits === 5 ? 'TOP 1% REFLEX CONTROL.' : 'YOUR FOCUS IS STEADY.'}
                  </p>
                  <p id="precision-result-description" className="precision-modal-copy">
                    {hits === 5
                      ? <>You&apos;ve unlocked <strong>15% OFF </strong></>
                      : <>You&apos;ve unlocked <strong>10% OFF</strong></>}
                  </p>
                  <form className="precision-claim-form" onSubmit={handleClaimOffer}>
                    <label htmlFor="precision-reward-email">EMAIL ADDRESS</label>
                    <input
                      id="precision-reward-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={rewardEmail}
                      onChange={(event) => {
                        setRewardEmail(event.target.value);
                        if (claimState === 'error') setClaimState('idle');
                      }}
                      placeholder="YOU@EXAMPLE.COM"
                    />
                    {claimState === 'error' && (
                      <p className="precision-claim-error" role="alert">We couldn&apos;t save your email. Please check it and try again.</p>
                    )}
                    <button type="submit" className="precision-primary-button">
                      CLAIM {hits === 5 ? '15%' : '10%'} OFFER <ArrowRight size={14} />
                    </button>
                  </form>
                  <p className="precision-claim-privacy">Your email is used to save your offer and send MUTE updates.</p>
                </>
              ) : (
                <>
                  <p id="precision-result-description" className="precision-modal-copy">
                    Your aim drifted. Take one deep breath and run the calibration one more time.
                  </p>
                  <div className="precision-modal-actions">
                    <button type="button" className="precision-retry-button" onClick={retry}>
                      <RotateCcw size={13} /> RETRY
                    </button>
                  </div>
                </>
              )}

            </div>
          </div>
        )}
      </div>
    </section>
  );
};
