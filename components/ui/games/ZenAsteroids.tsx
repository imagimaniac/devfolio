"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useZenMode } from "@/lib/ZenModeContext";

interface Ship {
  x: number;
  y: number;
  angle: number; // degrees
  vx: number;
  vy: number;
  thrusting: boolean;
  invincible: boolean;
}

interface Bullet {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

interface Asteroid {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: "large" | "medium" | "small";
  radius: number;
  iconSrc: string;
  iconAlt: string;
  rotation: number;
  rotationSpeed: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface ZenAsteroidsProps {
  techIcons: Array<{
    src: string;
    alt: string;
    position: { x: number; y: number };
    gamePosition: { x: number; y: number };
    velocity: { x: number; y: number };
  }>;
  onIconDestroy?: (iconSrc: string) => void;
  onResetGame?: () => void;
}

const SHIP_ROTATE_SPEED = 5;
const SHIP_THRUST = 0.06;
const SHIP_FRICTION = 0.99;
const SHIP_MAX_SPEED = 1.5;
const BULLET_SPEED = 2;
const BULLET_LIFE = 80;
const SHOOT_COOLDOWN = 8; // frames

const SIZE_CONFIG = {
  large: { radius: 4, score: 200, iconSize: "w-12 h-12 md:w-14 md:h-14" },
  medium: { radius: 2.5, score: 100, iconSize: "w-8 h-8 md:w-10 md:h-10" },
  small: { radius: 1.5, score: 50, iconSize: "w-5 h-5 md:w-6 md:h-6" },
};

const ZenAsteroids: React.FC<ZenAsteroidsProps> = ({ techIcons, onIconDestroy, onResetGame }) => {
  const { zenMode } = useZenMode();

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  // Render state
  const [renderShip, setRenderShip] = useState<Ship>({ x: 50, y: 50, angle: -90, vx: 0, vy: 0, thrusting: false, invincible: false });
  const [renderBullets, setRenderBullets] = useState<Bullet[]>([]);
  const [renderAsteroids, setRenderAsteroids] = useState<Asteroid[]>([]);
  const [renderParticles, setRenderParticles] = useState<Particle[]>([]);

  // Game refs
  const shipRef = useRef<Ship>({ x: 50, y: 50, angle: -90, vx: 0, vy: 0, thrusting: false, invincible: false });
  const bulletsRef = useRef<Bullet[]>([]);
  const asteroidsRef = useRef<Asteroid[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const keysRef = useRef<Set<string>>(new Set());
  const animationRef = useRef<number>();
  const bulletIdRef = useRef(0);
  const asteroidIdRef = useRef(0);
  const particleIdRef = useRef(0);
  const shootCooldownRef = useRef(0);
  const livesRef = useRef(3);
  const scoreRef = useRef(0);
  const gameOverRef = useRef(false);
  const invincibleTimerRef = useRef(0);

  // Get random icon
  const getRandomIcon = useCallback(() => {
    if (techIcons.length === 0) return { src: "", alt: "" };
    const icon = techIcons[Math.floor(Math.random() * techIcons.length)];
    return { src: icon.src, alt: icon.alt };
  }, [techIcons]);

  // Create initial asteroids from tech icons
  const createInitialAsteroids = useCallback((): Asteroid[] => {
    const asteroids: Asteroid[] = [];
    const count = Math.min(techIcons.length, 10);
    for (let i = 0; i < count; i++) {
      const icon = techIcons[i % techIcons.length];
      // Spawn away from center (where ship is)
      let x, y;
      do {
        x = Math.random() * 100;
        y = Math.random() * 100;
      } while (Math.abs(x - 50) < 15 && Math.abs(y - 50) < 15);

      asteroids.push({
        id: asteroidIdRef.current++,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: "large",
        radius: SIZE_CONFIG.large.radius,
        iconSrc: icon.src,
        iconAlt: icon.alt,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 3,
      });
    }
    return asteroids;
  }, [techIcons]);

  // Spawn particles
  const spawnParticles = useCallback((x: number, y: number, count: number) => {
    const colors = ["#64B5F6", "#00FFFF", "#39FF14", "#FFFFFF", "#FF8C00"];
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        vx: Math.cos(angle) * (0.5 + Math.random() * 1),
        vy: Math.sin(angle) * (0.5 + Math.random() * 1),
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    particlesRef.current = [...particlesRef.current, ...newParticles];
  }, []);

  // Split asteroid into smaller ones
  const splitAsteroid = useCallback(
    (asteroid: Asteroid): Asteroid[] => {
      if (asteroid.size === "small") return [];

      const nextSize = asteroid.size === "large" ? "medium" : "small";
      const pieces: Asteroid[] = [];
      for (let i = 0; i < 2; i++) {
        const icon = getRandomIcon();
        pieces.push({
          id: asteroidIdRef.current++,
          x: asteroid.x + (Math.random() - 0.5) * 3,
          y: asteroid.y + (Math.random() - 0.5) * 3,
          vx: (Math.random() - 0.5) * 0.8 + asteroid.vx * 0.5,
          vy: (Math.random() - 0.5) * 0.8 + asteroid.vy * 0.5,
          size: nextSize as "medium" | "small",
          radius: SIZE_CONFIG[nextSize as "medium" | "small"].radius,
          iconSrc: icon.src,
          iconAlt: icon.alt,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 5,
        });
      }
      return pieces;
    },
    [getRandomIcon]
  );

  // Reset game
  const resetGame = useCallback(() => {
    shipRef.current = { x: 50, y: 50, angle: -90, vx: 0, vy: 0, thrusting: false, invincible: true };
    bulletsRef.current = [];
    asteroidsRef.current = createInitialAsteroids();
    particlesRef.current = [];
    livesRef.current = 3;
    scoreRef.current = 0;
    gameOverRef.current = false;
    invincibleTimerRef.current = 120; // 2 seconds of invincibility
    shootCooldownRef.current = 0;
    setScore(0);
    setLives(3);
    setGameOver(false);
    setShowInstructions(true);
    onResetGame?.();
  }, [createInitialAsteroids, onResetGame]);

  // Initialize
  useEffect(() => {
    if (zenMode && techIcons.length > 0) {
      resetGame();
      setTimeout(() => setShowInstructions(false), 5000);
    }
  }, [zenMode, techIcons.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Expose reset
  useEffect(() => {
    if (zenMode && zenMode) {
      (window as any).resetZenGame = resetGame;
    }
    return () => {
      delete (window as any).resetZenGame;
    };
  }, [zenMode, resetGame]);

  // Keyboard
  useEffect(() => {
    if (!zenMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
      if (e.key === " ") {
        e.preventDefault();
        if (showInstructions) {
          setShowInstructions(false);
        }
        if (gameOverRef.current) {
          resetGame();
          setShowInstructions(false);
        }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [zenMode, showInstructions, resetGame]);

  // Main game loop
  useEffect(() => {
    if (!zenMode) return;

    const gameLoop = () => {
      if (showInstructions || gameOverRef.current) {
        // Still update render state for visual consistency
        setRenderShip({ ...shipRef.current });
        setRenderAsteroids([...asteroidsRef.current]);
        animationRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      const ship = shipRef.current;
      const keys = keysRef.current;

      // Rotate
      if (keys.has("ArrowLeft") || keys.has("a") || keys.has("A")) {
        ship.angle -= SHIP_ROTATE_SPEED;
      }
      if (keys.has("ArrowRight") || keys.has("d") || keys.has("D")) {
        ship.angle += SHIP_ROTATE_SPEED;
      }

      // Thrust
      ship.thrusting = keys.has("ArrowUp") || keys.has("w") || keys.has("W");
      if (ship.thrusting) {
        const rad = (ship.angle * Math.PI) / 180;
        ship.vx += Math.cos(rad) * SHIP_THRUST;
        ship.vy += Math.sin(rad) * SHIP_THRUST;

        // Clamp speed
        const speed = Math.sqrt(ship.vx * ship.vx + ship.vy * ship.vy);
        if (speed > SHIP_MAX_SPEED) {
          ship.vx = (ship.vx / speed) * SHIP_MAX_SPEED;
          ship.vy = (ship.vy / speed) * SHIP_MAX_SPEED;
        }
      }

      // Apply friction
      ship.vx *= SHIP_FRICTION;
      ship.vy *= SHIP_FRICTION;

      // Move ship
      ship.x += ship.vx;
      ship.y += ship.vy;

      // Screen wrap
      if (ship.x < -2) ship.x = 102;
      if (ship.x > 102) ship.x = -2;
      if (ship.y < -2) ship.y = 102;
      if (ship.y > 102) ship.y = -2;

      // Invincibility timer
      if (invincibleTimerRef.current > 0) {
        invincibleTimerRef.current--;
        ship.invincible = true;
      } else {
        ship.invincible = false;
      }

      // Shoot
      if (shootCooldownRef.current > 0) shootCooldownRef.current--;
      if (keys.has(" ") && shootCooldownRef.current <= 0 && !gameOverRef.current) {
        const rad = (ship.angle * Math.PI) / 180;
        bulletsRef.current.push({
          id: bulletIdRef.current++,
          x: ship.x + Math.cos(rad) * 2,
          y: ship.y + Math.sin(rad) * 2,
          vx: Math.cos(rad) * BULLET_SPEED + ship.vx * 0.3,
          vy: Math.sin(rad) * BULLET_SPEED + ship.vy * 0.3,
          life: BULLET_LIFE,
        });
        shootCooldownRef.current = SHOOT_COOLDOWN;
      }

      // Update bullets
      bulletsRef.current = bulletsRef.current
        .map((b) => ({
          ...b,
          x: b.x + b.vx,
          y: b.y + b.vy,
          life: b.life - 1,
        }))
        .filter((b) => b.life > 0 && b.x >= -5 && b.x <= 105 && b.y >= -5 && b.y <= 105);

      // Update asteroids
      asteroidsRef.current = asteroidsRef.current.map((a) => {
        let nx = a.x + a.vx;
        let ny = a.y + a.vy;
        // Screen wrap
        if (nx < -5) nx = 105;
        if (nx > 105) nx = -5;
        if (ny < -5) ny = 105;
        if (ny > 105) ny = -5;
        return { ...a, x: nx, y: ny, rotation: a.rotation + a.rotationSpeed };
      });

      // Bullet-Asteroid collisions
      const newAsteroids: Asteroid[] = [];
      const bulletHits = new Set<number>();
      const asteroidHits = new Set<number>();

      bulletsRef.current.forEach((bullet) => {
        asteroidsRef.current.forEach((asteroid) => {
          if (bulletHits.has(bullet.id) || asteroidHits.has(asteroid.id)) return;
          const dx = bullet.x - asteroid.x;
          const dy = bullet.y - asteroid.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < asteroid.radius + 0.5) {
            bulletHits.add(bullet.id);
            asteroidHits.add(asteroid.id);
            scoreRef.current += SIZE_CONFIG[asteroid.size].score;
            setScore(scoreRef.current);
            spawnParticles(asteroid.x, asteroid.y, asteroid.size === "large" ? 10 : asteroid.size === "medium" ? 7 : 4);
            onIconDestroy?.(asteroid.iconSrc);
            newAsteroids.push(...splitAsteroid(asteroid));
          }
        });
      });

      bulletsRef.current = bulletsRef.current.filter((b) => !bulletHits.has(b.id));
      asteroidsRef.current = [...asteroidsRef.current.filter((a) => !asteroidHits.has(a.id)), ...newAsteroids];

      // Ship-Asteroid collision
      if (!ship.invincible) {
        for (const asteroid of asteroidsRef.current) {
          const dx = ship.x - asteroid.x;
          const dy = ship.y - asteroid.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < asteroid.radius + 1.5) {
            livesRef.current--;
            setLives(livesRef.current);
            spawnParticles(ship.x, ship.y, 15);

            if (livesRef.current <= 0) {
              gameOverRef.current = true;
              setGameOver(true);
            } else {
              // Respawn ship at center with invincibility
              ship.x = 50;
              ship.y = 50;
              ship.vx = 0;
              ship.vy = 0;
              ship.angle = -90;
              invincibleTimerRef.current = 120;
            }
            break;
          }
        }
      }

      // Update particles
      particlesRef.current = particlesRef.current
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - 0.02,
        }))
        .filter((p) => p.life > 0);

      // Check if all asteroids destroyed — spawn new wave
      if (asteroidsRef.current.length === 0 && !gameOverRef.current) {
        const newWave = createInitialAsteroids();
        asteroidsRef.current = newWave;
      }

      // Update render state
      setRenderShip({ ...ship });
      setRenderBullets([...bulletsRef.current]);
      setRenderAsteroids([...asteroidsRef.current]);
      setRenderParticles([...particlesRef.current]);

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [zenMode, showInstructions, splitAsteroid, spawnParticles, createInitialAsteroids, onIconDestroy]);

  if (!zenMode) return null;

  const shipRad = (renderShip.angle * Math.PI) / 180;

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Score & Lives */}
      <div className="absolute top-4 left-4 font-mono text-lg pointer-events-none z-50 flex gap-4">
        <div className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded text-electricBlue">
          Score: {score}
        </div>
        <div className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded text-circuitGreen">
          {"❤️".repeat(lives)}
        </div>
      </div>

      {/* Instructions */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-auto"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-black/90 backdrop-blur-sm border border-purple-400/50 rounded-lg p-6 text-center"
            >
              <div className="text-purple-400 text-2xl font-mono mb-4">GALAXY</div>
              <div className="text-white/80 font-mono space-y-2 mb-6">
                <div>←/→: Rotate Ship</div>
                <div>↑: Thrust</div>
                <div>SPACE: Shoot</div>
                <div className="text-purple-400">Destroy all floating tech icons!</div>
                <div className="text-white/50 text-xs">Large icons split into smaller ones</div>
              </div>
              <button
                onClick={() => setShowInstructions(false)}
                className="bg-purple-500 text-white px-6 py-2 rounded font-mono font-semibold hover:bg-purple-400 transition-colors"
              >
                PRESS SPACE TO START
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over */}
      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-auto"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-black/90 backdrop-blur-sm border border-red-400/50 rounded-lg p-8 text-center"
            >
              <div className="text-red-400 text-3xl font-mono mb-4">GAME OVER</div>
              <div className="text-electricBlue text-xl font-mono mb-6">Score: {score}</div>
              <button
                onClick={() => {
                  resetGame();
                  setShowInstructions(false);
                }}
                className="bg-purple-500 text-white px-6 py-2 rounded font-mono font-semibold hover:bg-purple-400 transition-colors"
              >
                PRESS SPACE TO RESTART
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ship */}
      {!gameOver && (
        <div
          className="absolute pointer-events-none z-40"
          style={{
            left: `${renderShip.x}vw`,
            top: `${renderShip.y}vh`,
            transform: `translate(-50%, -50%)`,
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="-20 -20 40 40"
            style={{
              transform: `rotate(${renderShip.angle + 90}deg)`,
              filter: renderShip.invincible ? "drop-shadow(0 0 8px rgba(255,255,255,0.8))" : "drop-shadow(0 0 10px rgba(100,181,246,0.6))",
              opacity: renderShip.invincible ? (Math.floor(Date.now() / 100) % 2 === 0 ? 0.4 : 1) : 1,
            }}
          >
            <defs>
              <linearGradient id="astShipBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#64B5F6" />
                <stop offset="100%" stopColor="#1E88E5" />
              </linearGradient>
            </defs>
            {/* Ship body */}
            <polygon
              points="0,-15 12,12 0,6 -12,12"
              fill="url(#astShipBody)"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            {/* Cockpit */}
            <circle cx="0" cy="-4" r="3" fill="#00FFFF" opacity="0.8" />
            {/* Thrust flame */}
            {renderShip.thrusting && (
              <polygon
                points="-5,10 0,22 5,10"
                fill="#FF8C00"
                opacity={0.6 + Math.random() * 0.4}
              >
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="0.15s" repeatCount="indefinite" />
              </polygon>
            )}
          </svg>
        </div>
      )}

      {/* Bullets */}
      {renderBullets.map((bullet) => (
        <div
          key={bullet.id}
          className="absolute pointer-events-none"
          style={{
            left: `${bullet.x}vw`,
            top: `${bullet.y}vh`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: "#00FFFF",
              boxShadow: "0 0 6px rgba(0,255,255,0.8), 0 0 12px rgba(0,255,255,0.4)",
            }}
          />
        </div>
      ))}

      {/* Asteroids (tech icons) */}
      {renderAsteroids.map((asteroid) => (
        <div
          key={asteroid.id}
          className="absolute pointer-events-none"
          style={{
            left: `${asteroid.x}vw`,
            top: `${asteroid.y}vh`,
            transform: `translate(-50%, -50%) rotate(${asteroid.rotation}deg)`,
          }}
        >
          <div
            className={`relative ${SIZE_CONFIG[asteroid.size].iconSize} flex items-center justify-center`}
          >
            {asteroid.iconSrc && (
              <Image
                src={asteroid.iconSrc}
                alt={asteroid.iconAlt}
                width={56}
                height={56}
                className="w-full h-full opacity-80 drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]"
                priority={false}
              />
            )}
            {/* Subtle ring around asteroid */}
            <div
              className="absolute inset-[-4px] rounded-full border border-white/10"
              style={{
                boxShadow: asteroid.size === "large" ? "0 0 12px rgba(100,181,246,0.2)" : "none",
              }}
            />
          </div>
        </div>
      ))}

      {/* Particles */}
      {renderParticles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            width: "4px",
            height: "4px",
            backgroundColor: p.color,
            opacity: p.life,
            boxShadow: `0 0 4px ${p.color}`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
};

export default ZenAsteroids;
