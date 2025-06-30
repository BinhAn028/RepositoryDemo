import React, { useEffect, useState } from "react";

export default function SseDemo() {
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const url = "/api/sse-demo"; // Đổi endpoint này nếu backend bạn khác
    const eventSource = new EventSource(url);
    setConnected(true);

    eventSource.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
    eventSource.onerror = () => {
      setConnected(false);
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">SSE Demo</h2>
      <div className="mb-2">Status: {connected ? "🟢 Connected" : "🔴 Disconnected"}</div>
      <div className="border rounded p-4 h-64 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-gray-400">No messages yet...</div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="mb-1 text-sm">{msg}</div>
          ))
        )}
      </div>
    </div>
  );
}
