import React, { useEffect, useRef, useState } from "react";
import BlinkingCursor from "./BlinkingCursor";
import { parseCommand, AUTOCOMPLETE_LIST } from "../core/CommandParser";
import PlaneShooter from "./games/PlaneShooter";

const STORAGE_KEY = "porto_terminal_history_v1";

export default function TerminalShell({ onShutdown }) {
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const hasTypedWelcome = useRef(false);

  const [input, setInput] = useState("");
  const [displayLines, setDisplayLines] = useState([]);
  const [history, setHistory] = useState(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
  );
  const [histIndex, setHistIndex] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [awaitingShutdownConfirm, setAwaitingShutdownConfirm] = useState(false);
  const [activeGame, setActiveGame] = useState(null);

  useEffect(() => {
    // Prevent double-rendering of the typing effect in React 18 Strict Mode
    if (hasTypedWelcome.current) return;
    hasTypedWelcome.current = true;

    const welcome = [
      { text: "Welcome to Porto-jim shell — type 'help' for commands", type: "info" },
      {
        text: "Tip: try `about`, `work`, `projects`, `skills`, `contact`, `education`, `cv`, `joke`, `stack`, `jim`, `game`",
        type: "hint",
      },
    ];
    typeLinesSequentially(welcome, 30);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  // Auto scroll to bottom on new output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayLines, activeGame]);

  const typeLinesSequentially = async (lines, delay) => {
    for (let l of lines) {
      await typeLine(l.text, l.type, delay);
    }
  };

  const typeLine = (text, type = "stdout", delay = 20) =>
    new Promise((res) => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayLines((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (!last || last.meta !== "typing") {
            copy.push({ text: text.slice(0, i + 1), type, meta: "typing" });
          } else {
            copy[copy.length - 1] = { text: text.slice(0, i + 1), type, meta: "typing" };
          }
          return copy;
        });
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDisplayLines((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { text, type };
            return copy;
          });
          setTimeout(res, 100);
        }
      }, delay);
    });

  const pushOutput = (lines) => {
    setDisplayLines((prev) => [...prev, ...lines]);
  };

  const handleCommand = async (raw) => {
    const cmd = raw.trim();
    if (!cmd) {
      pushOutput([{ text: "", type: "stdout" }]);
      return;
    }

    if (awaitingShutdownConfirm) {
      if (["y", "yes"].includes(cmd.toLowerCase())) {
        pushOutput([{ text: "Shutting down console...", type: "hint" }]);
        setTimeout(() => onShutdown && onShutdown(), 800);
      } else {
        pushOutput([{ text: "Shutdown cancelled.", type: "hint" }]);
      }
      setAwaitingShutdownConfirm(false);
      return;
    }

    setHistory((h) => [...h, cmd]);
    setHistIndex(null);
    pushOutput([{ text: `jim@porto:~$ ${cmd}`, type: "command" }]);

    if (cmd === "shutdown") {
      pushOutput([
        {
          text: "You are about to shutdown the terminal and return to main portfolio.",
          type: "hint",
        },
        { text: "Are you sure? (y/n)", type: "stdout" },
      ]);
      setAwaitingShutdownConfirm(true);
      return;
    }

    if (cmd === "shutdown -y") {
      pushOutput([{ text: "Shutting down console...", type: "hint" }]);
      setTimeout(() => onShutdown && onShutdown(), 800);
      return;
    }

    const result = await parseCommand(cmd, {
      setThemeClass: applyTheme,
      startGame: (gameName) => setActiveGame(gameName)
    });

    if (Array.isArray(result) && result.some((r) => r.type === "clear")) {
      setDisplayLines([]);
      return;
    }

    if (Array.isArray(result)) pushOutput(result);
    else pushOutput([{ text: result, type: "stdout" }]);
  };

  const applyTheme = (theme) => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme !== "light");
  };

  const handleExitGame = (finalScore) => {
    setActiveGame(null);
    pushOutput([
      { text: `Game exited. Final score: ${finalScore}`, type: "info" }
    ]);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const onKeyDown = (e) => {
    // Ctrl + C (Cancel current command)
    if (e.ctrlKey && e.key.toLowerCase() === "c") {
      if (window.getSelection().toString()) return;
      e.preventDefault();
      pushOutput([{ text: `jim@porto:~$ ${input}^C`, type: "command" }]);
      setInput("");
      setSuggestion("");
      setAwaitingShutdownConfirm(false);
      return;
    }

    // Ctrl + L (Clear screen)
    if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setDisplayLines([]);
      return;
    }

    // Ctrl + U (Clear current line input)
    if (e.ctrlKey && e.key.toLowerCase() === "u") {
      e.preventDefault();
      setInput("");
      setSuggestion("");
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(input);
      setInput("");
      setSuggestion("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = histIndex === null ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setInput(history[next] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0) return;
      if (histIndex === null) {
        setInput("");
      } else {
        const next = Math.min(history.length - 1, histIndex + 1);
        setHistIndex(next);
        setInput(history[next] || "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = AUTOCOMPLETE_LIST.find((a) => a.startsWith(input));
      if (match) {
        setInput(match);
        setSuggestion("");
      }
    }
  };

  useEffect(() => {
    if (!input) {
      setSuggestion("");
      return;
    }
    const first = AUTOCOMPLETE_LIST.find((a) => a.startsWith(input));
    setSuggestion(first && first !== input ? first.slice(input.length) : "");
  }, [input]);

  return (
    <div
      className="h-screen w-full bg-black text-green-500 font-mono text-sm flex flex-col p-6 overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col flex-1">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-600" />
            <div className="w-3 h-3 rounded-full bg-green-700" />
            <div className="w-3 h-3 rounded-full bg-green-800" />
            <div className="ml-4 text-green-400">Porto-jim — shell</div>
          </div>
          <div className="text-xs text-green-400 opacity-70">
            type <span className="font-semibold">help</span> for commands
          </div>
        </div>

        {/* Output Area */}
        <div
          className="flex-1 border border-green-900 bg-black/70 rounded-md overflow-hidden flex flex-col"
          style={{ backdropFilter: "blur(8px)", minHeight: "400px", maxHeight: "70vh" }}
        >
          {activeGame === "plane" ? (
            // === FULLSCREEN GAME MODE ===
            <PlaneShooter onExit={handleExitGame} />
          ) : (
            // === NORMAL TERMINAL MODE ===
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 flex flex-col w-full h-full"
            >
              <div>
                {displayLines.map((line, idx) => (
                  <div
                    key={idx}
                    className={`${line.type === "command" ? "text-green-300" : ""} ${line.type === "hint" ? "text-green-400 italic" : ""
                      }`}
                  >
                    {line.type === "link" ? (
                      <a href={line.href} target="_blank" rel="noreferrer" className="hover:text-green-300 underline">
                        {line.text}
                      </a>
                    ) : (
                      <pre className="whitespace-pre-wrap font-mono">{line.text}</pre>
                    )}
                  </div>
                ))}
              </div>

              {/* Input Line */}
              <div className="flex items-center gap-3 mt-2">
                <div className="text-green-300">jim@porto:~$</div>
                <div className="flex-1 flex items-center">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="bg-transparent outline-none flex-1 text-green-400 placeholder:text-green-800"
                    placeholder="type command..."
                    autoFocus
                    spellCheck={false}
                  />
                  <BlinkingCursor />
                </div>
              </div>

              {suggestion && (
                <div className="text-xs text-green-700 mt-1">
                  Suggestion:{" "}
                  <span className="text-green-400">
                    {input}
                    <span className="text-green-200">{suggestion}</span>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 text-xs text-green-500 flex flex-col md:flex-row justify-between gap-2">
          <div className="flex gap-4">
            <span>↑/↓ history</span>
            <span>Tab autocomplete</span>
            <span>Ctrl+C cancel</span>
            <span>Ctrl+L clear</span>
          </div>
          <div className="opacity-70">Click anywhere to focus</div>
        </div>
      </div>
    </div>
  );
}