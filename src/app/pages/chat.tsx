import { useState } from "react";
import { MessageSquare, Send, Sparkles } from "lucide-react";
import { PageHeader } from "../components/ui-bits";
import { GlowCard } from "../components/glow-card";

type Msg = { role: "user" | "assistant"; text: string };

export function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Hi! I'm your SubsidyDesk AI agent. Ask me about schemes, eligibility, client documents or draft applications. (AI integration coming soon.)" },
  ]);
  const [input, setInput] = useState("");

  function send() {
    const v = input.trim();
    if (!v) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: v },
      { role: "assistant", text: "AI agent not yet connected. Your message has been queued for the upcoming integration." },
    ]);
    setInput("");
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <PageHeader
        eyebrow="AI Chat"
        title="Ask the agent"
        subtitle="Query schemes, check eligibility, draft application sections."
      />

      <GlowCard className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={m.role === "user" ? "flex justify-end" : "flex justify-start items-start gap-3"}
            >
              {m.role === "assistant" && (
                <div
                  className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #8f9fed, #5a4386)",
                    boxShadow: "0 0 14px rgba(143,159,237,0.35)",
                  }}
                >
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              )}
              <div
                className="max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                style={m.role === "user" ? {
                  background: "linear-gradient(135deg, #8f9fed, #5a4386)",
                  color: "#ffffff",
                } : {
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#cbd5e1",
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div
          className="p-3 flex items-center gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <MessageSquare className="h-4 w-4 ml-2 shrink-0" style={{ color: "#475569" }} />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Ask about schemes, clients, or eligibility…"
            className="flex-1 h-10 text-sm focus:outline-none placeholder:text-slate-700 text-slate-200"
            style={{ background: "transparent" }}
          />
          <button
            onClick={send}
            className="h-9 px-4 rounded-full flex items-center gap-2 text-sm text-white transition"
            style={{
              background: "linear-gradient(135deg, #8f9fed, #5a4386)",
              fontWeight: 500,
              boxShadow: "0 0 14px rgba(143,159,237,0.3)",
            }}
          >
            <Send className="h-4 w-4" /> Send
          </button>
        </div>
      </GlowCard>
    </div>
  );
}
