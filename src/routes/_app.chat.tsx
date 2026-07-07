import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageSquare, Send, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/_app/chat")({
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; text: string };

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hi! I'm your SubsidyDesk AI agent. Ask me about schemes, eligibility, client documents or draft applications. (AI integration coming soon.)",
    },
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
        title="AI Chat"
        subtitle="Chat with the SubsidyDesk agent about schemes, clients and applications."
      />
      <div className="flex-1 rounded-xl border border-border bg-card shadow-[var(--shadow-card)] card-hover animate-card-in flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "flex justify-end"
                  : "flex justify-start items-start gap-2"
              }
            >
              {m.role === "assistant" && (
                <div className="h-8 w-8 rounded-full grid place-items-center bg-primary/15 text-primary shrink-0">
                  <Sparkles className="h-4 w-4" />
                </div>
              )}
              <div
                className={
                  m.role === "user"
                    ? "max-w-[75%] rounded-2xl px-4 py-2 bg-primary text-primary-foreground text-sm"
                    : "max-w-[75%] rounded-2xl px-4 py-2 bg-muted text-foreground text-sm"
                }
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-border p-3 flex items-center gap-2 bg-background/40">
          <MessageSquare className="h-4 w-4 text-muted-foreground ml-2" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask the AI agent…"
            className="flex-1 h-10 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={send}
            className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Send className="h-4 w-4" /> Send
          </button>
        </div>
      </div>
    </div>
  );
}