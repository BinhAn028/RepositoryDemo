import React, { useState, useRef, useEffect } from "react";

function CountValue({ start, running, onDone }: { start: number; running: boolean; onDone?: () => void }) {
  const [count, setCount] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running && start > 0) {
      setCount(start);
      timerRef.current = setInterval(() => {
        setCount((prev) => {
          if (prev && prev > 1) {
            return prev - 1;
          } else {
            clearInterval(timerRef.current!);
            if (onDone) onDone();
            return 0;
          }
        });
      }, 1000);
    } else if (!running) {
      setCount(null);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running, start, onDone]);

  console.log("CountValue render", count);
  return <div className="text-3xl font-mono text-center mt-6">{count !== null ? count : ""}</div>;
}

export default function CountdownDemo() {
  console.log("CountdownDemo render");
  const [input, setInput] = useState(10);
  const [running, setRunning] = useState(false);

  const startCountdown = () => {
    if (running || !input || input <= 0) return;
    setRunning(true);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(Number(e.target.value));
  };

  const handleDone = () => {
    setRunning(false);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Countdown Demo</h2>
      <div className="flex gap-4 mb-4 items-center">
        <input
          type="number"
          min={1}
          value={input}
          onChange={handleInput}
          className="border px-3 py-2 rounded w-24 text-center"
          disabled={running}
        />
        <button
          onClick={startCountdown}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          disabled={running || !input || input <= 0}
        >
          Start
        </button>
      </div>
      <CountValue start={input} running={running} onDone={handleDone} />
    </div>
  );
}
