import React, { useState, useEffect, useCallback, useRef } from "react";

// Adjusted grid size to fit beautifully on both mobile and desktop screens
const WIDTH = 20;
const HEIGHT = 20;
const FPS = 30;
const FRAME_RATE_MS = Math.floor(1000 / FPS);

export default function PlaneShooter({ onExit }) {
    const gameState = useRef({
        playerX: Math.floor(WIDTH / 100),
        bullets: [],
        enemies: [],
        score: 0,
        gameOver: false,
        lastShot: 0,
        // Track continuous key/button presses for smooth movement
        keys: { left: false, right: false, shoot: false },
    });

    const [, setTick] = useState(0);

    // The 30 FPS Engine
    useEffect(() => {
        if (gameState.current.gameOver) return;

        const gameLoop = setInterval(() => {
            const state = gameState.current;
            if (state.gameOver) {
                clearInterval(gameLoop);
                return;
            }

            // --- PROGRESSIVE DIFFICULTY MATH ---
            // 1. Calculate Difficulty: +1 every 100 points, max capped at 10
            const difficulty = Math.min(10, 1 + Math.floor(state.score / 100));

            // 2. Scaling factor: Scales from 0 (at diff 1) to 2 (at diff 10)
            const difficultyScale = (difficulty - 1) * (2 / 9);

            // 3. Apply to Speed and Max Enemies
            const enemySpeed = 0.15 + difficultyScale;
            const maxEnemies = 4 + Math.round(difficultyScale);
            const spawnRate = 0.05 + (difficulty * 0.01);
            // -----------------------------------

            // Smooth continuous movement based on input state
            if (state.keys.left) state.playerX = Math.max(0, state.playerX - 0.6);
            if (state.keys.right) state.playerX = Math.min(WIDTH - 1, state.playerX + 0.6);

            // Auto-fire capability
            if (state.keys.shoot) {
                const now = Date.now();
                if (now - state.lastShot > 200) {
                    state.bullets.push({ x: Math.floor(state.playerX), y: HEIGHT - 2 });
                    state.lastShot = now;
                }
            }

            // Move Bullets (THIS WAS MISSING!)
            state.bullets = state.bullets
                .map((b) => ({ ...b, y: b.y - 1.0 }))
                .filter((b) => b.y > -1);

            // Move Enemies (Tracker enemies drift towards player)
            state.enemies = state.enemies
                .map((e) => {
                    let nextX = e.x;
                    if (e.isTracker) {
                        if (nextX < state.playerX) nextX += 0.1;
                        if (nextX > state.playerX) nextX -= 0.1;
                    }
                    return { ...e, x: nextX, y: e.y + enemySpeed };
                })
                .filter((e) => e.y < HEIGHT);

            // Random Enemy Spawning (1 in 20 chance to be a tracker)
            if (state.enemies.length < maxEnemies && Math.random() < spawnRate) {
                state.enemies.push({
                    x: Math.floor(Math.random() * WIDTH),
                    y: 0,
                    isTracker: Math.random() < 0.05
                });
            }

            // Collision Detection
            const survivingBullets = [];
            state.bullets.forEach((bullet) => {
                const hitIndex = state.enemies.findIndex(
                    (enemy) =>
                        Math.floor(bullet.x) === Math.floor(enemy.x) &&
                        Math.abs(bullet.y - enemy.y) < (1.0 + enemySpeed)
                );

                if (hitIndex !== -1) {
                    state.enemies.splice(hitIndex, 1);
                    state.score += 10;
                } else {
                    survivingBullets.push(bullet);
                }
            });
            state.bullets = survivingBullets;

            // Game Over Detection
            const playerHit = state.enemies.some(
                (enemy) =>
                    Math.floor(enemy.x) === Math.floor(state.playerX) && Math.floor(enemy.y) >= HEIGHT - 1
            );

            if (playerHit) {
                state.gameOver = true;
            }

            setTick((t) => t + 1);
        }, FRAME_RATE_MS);

        return () => clearInterval(gameLoop);
    }, []);

    // Desktop Keyboard Controls
    const handleKeyDown = useCallback((e) => {
        const state = gameState.current;
        if (e.key.toLowerCase() === "q") {
            onExit(state.score);
            return;
        }
        if (e.key === "ArrowLeft") state.keys.left = true;
        if (e.key === "ArrowRight") state.keys.right = true;
        if (e.key === " ") state.keys.shoot = true;
    }, [onExit]);

    const handleKeyUp = useCallback((e) => {
        const state = gameState.current;
        if (e.key === "ArrowLeft") state.keys.left = false;
        if (e.key === "ArrowRight") state.keys.right = false;
        if (e.key === " ") state.keys.shoot = false;
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    // Mobile Touch Controls
    const setKey = (k, val) => {
        if (!gameState.current.gameOver) gameState.current.keys[k] = val;
    };

    const { playerX, bullets, enemies, score, gameOver } = gameState.current;

    // Build the Screen
    let screen = Array(HEIGHT).fill().map(() => Array(WIDTH).fill(" "));

    enemies.forEach((e) => {
        const renderY = Math.floor(e.y);
        const renderX = Math.floor(e.x);
        if (renderY >= 0 && renderY < HEIGHT && renderX >= 0 && renderX < WIDTH) {
            screen[renderY][renderX] = e.isTracker ? "T" : "V";
        }
    });

    bullets.forEach((b) => {
        const renderY = Math.floor(b.y);
        const renderX = Math.floor(b.x);
        if (renderY >= 0 && renderY < HEIGHT && renderX >= 0 && renderX < WIDTH)
            screen[renderY][renderX] = "|";
    });

    if (!gameOver) screen[HEIGHT - 1][Math.floor(playerX)] = "A";

    return (
        <div className="flex flex-col h-full w-full items-center justify-center text-green-400 p-2 sm:p-4 overflow-hidden select-none">

            {/* Top Header */}
            <div className="mb-2 flex justify-between w-full max-w-md px-2">
                <span className="font-bold text-yellow-400">
                    SCORE: {score} <span className="text-gray-400 text-xs ml-2">LVL {Math.min(10, 1 + Math.floor(score / 100))}</span>
                </span>
                <span className="text-xs text-green-600 hidden sm:block">
                    [<span className="text-white">←</span>/
                    <span className="text-white">→</span>] Move &nbsp; [
                    <span className="text-white">SPACE</span>] Shoot &nbsp; [
                    <span className="text-white">Q</span>] Quit
                </span>
                <button
                    onClick={() => onExit(score)}
                    className="sm:hidden text-xs text-red-500 border border-red-500 px-2 rounded hover:bg-red-900/30"
                >
                    QUIT
                </button>
            </div>

            {/* Main Game Screen */}
            <div className="flex-1 w-full max-w-md flex items-center justify-center border border-green-800 bg-black/80 rounded relative">
                <div className="text-center pb-2">
                    {screen.map((row, i) => (
                        <div key={i} className="flex justify-center">
                            {row.map((cell, j) => (
                                // Adjusted cell sizing so it fits neatly on small portrait phones
                                <span key={j} className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center whitespace-pre font-bold">
                                    {cell === "V" ? <span className="text-red-500">V</span> : cell === "T" ? <span className="text-orange-500">T</span> : cell}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Game Over Overlay */}
                {gameOver && (
                    <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-10">
                        <div className="text-red-500 font-bold text-2xl blink">GAME OVER</div>
                        <button
                            onClick={() => onExit(score)}
                            className="mt-6 px-6 py-3 border border-green-500 text-green-500 rounded font-bold hover:bg-green-900 active:bg-green-700"
                        >
                            Return to Terminal
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Gamepad Controls */}
            <div className="mt-4 grid grid-cols-3 gap-4 w-full max-w-md sm:hidden pb-2 touch-manipulation">
                <button
                    className="bg-green-900/30 border border-green-700 h-16 rounded-xl active:bg-green-700 flex items-center justify-center text-3xl touch-manipulation"
                    onPointerDown={(e) => { e.preventDefault(); setKey("left", true); }}
                    onPointerUp={(e) => { e.preventDefault(); setKey("left", false); }}
                    onPointerLeave={() => setKey("left", false)}
                >
                    ←
                </button>
                <button
                    className="bg-red-900/20 border border-red-700 h-16 rounded-xl active:bg-red-700 flex items-center justify-center text-xl font-bold text-red-500 touch-manipulation"
                    onPointerDown={(e) => { e.preventDefault(); setKey("shoot", true); }}
                    onPointerUp={(e) => { e.preventDefault(); setKey("shoot", false); }}
                    onPointerLeave={() => setKey("shoot", false)}
                >
                    FIRE
                </button>
                <button
                    className="bg-green-900/30 border border-green-700 h-16 rounded-xl active:bg-green-700 flex items-center justify-center text-3xl touch-manipulation"
                    onPointerDown={(e) => { e.preventDefault(); setKey("right", true); }}
                    onPointerUp={(e) => { e.preventDefault(); setKey("right", false); }}
                    onPointerLeave={() => setKey("right", false)}
                >
                    →
                </button>
            </div>
        </div>
    );
}