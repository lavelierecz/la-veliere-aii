"use client";

import { useState } from "react";

export default function ObjevRutinu() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Vítej. Ráda ti pomohu najít ideální péči o pleť. Jak ti mohu pomoci?" }
  ]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
  }

  return (
    <main style={{ maxWidth: 600, margin: "60px auto", fontFamily: "sans-serif" }}>
      <h1>Objev svou ideální rutinu</h1>

      <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <strong>{m.role === "user" ? "Ty" : "La Velière"}:</strong> {m.content}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <input
          style={{ width: "100%", padding: 10 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Napiš svou otázku…"
        />
        <button
          onClick={sendMessage}
          style={{ marginTop: 10, padding: 10, width: "100%" }}
        >
          Odeslat
        </button>
      </div>
    </main>
  );
}
