import { useState } from "react";
import {
  LayoutDashboard, Users, Sparkles, FileText, KanbanSquare,
  Receipt, Bell, Settings, Search, MessageSquare, Zap,
  PanelLeft, ChevronRight, Menu, X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NavContext, type Page } from "../lib/nav";
import { Overview } from "../pages/overview";
import { ClientsList } from "../pages/clients-list";
import { ClientDetail } from "../pages/client-detail";
import { MatchesPage } from "../pages/matches";
import { Applications } from "../pages/applications";
import { Tracker } from "../pages/tracker";
import { Billing } from "../pages/billing";
import { ChatPage } from "../pages/chat";
import { NotificationsPage } from "../pages/notifications";
import { SettingsPage } from "../pages/settings";

const nav: { key: Page["name"]; label: string; icon: LucideIcon }[] = [
  { key: "overview",      label: "Overview",           icon: LayoutDashboard },
  { key: "clients",       label: "Clients",             icon: Users },
  { key: "matches",       label: "Eligibility Matches", icon: Sparkles },
  { key: "applications",  label: "Applications",        icon: FileText },
  { key: "tracker",       label: "Status Tracker",      icon: KanbanSquare },
  { key: "billing",       label: "Success Fee",         icon: Receipt },
  { key: "chat",          label: "AI Chat",             icon: MessageSquare },
  { key: "notifications", label: "Notifications",       icon: Bell },
  { key: "settings",      label: "Firm Settings",       icon: Settings },
];

function renderPage(page: Page) {
  switch (page.name) {
    case "overview":      return <Overview />;
    case "clients":       return <ClientsList />;
    case "client-detail": return <ClientDetail id={page.id} />;
    case "matches":       return <MatchesPage />;
    case "applications":  return <Applications />;
    case "tracker":       return <Tracker />;
    case "billing":       return <Billing />;
    case "chat":          return <ChatPage />;
    case "notifications": return <NotificationsPage />;
    case "settings":      return <SettingsPage />;
  }
}

const COLLAPSED = 52;
const EXPANDED  = 240;

export function AppShell() {
  const [page, go]   = useState<Page>({ name: "overview" });
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeName =
    page.name === "client-detail"
      ? "Clients"
      : (nav.find(n => n.key === page.name)?.label ?? "");

  function navigate(p: Page) { go(p); setMobileMenuOpen(false); }

  const isExpanded = mobileMenuOpen || open;

  return (
    <NavContext.Provider value={{ page, go }}>
      <div
        className="dark min-h-screen flex"
        style={{ background: "#050507", color: "#f1f5f9" }}
      >
        {/* Mobile Backdrop */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* ── SIDEBAR ── */}
        <aside
          className={`md:flex ${mobileMenuOpen ? 'flex fixed inset-y-0 left-0' : 'hidden'}`}
          style={{
            width: mobileMenuOpen ? EXPANDED : (open ? EXPANDED : COLLAPSED),
            minWidth: mobileMenuOpen ? EXPANDED : (open ? EXPANDED : COLLAPSED),
            transition: "width 0.22s cubic-bezier(0.4,0,0.2,1), min-width 0.22s cubic-bezier(0.4,0,0.2,1)",
            background: "#090b0f",
            borderRight: "1px solid rgba(255,255,255,0.10)",
            flexDirection: "column",
            overflow: "hidden",
            flexShrink: 0,
            zIndex: 50,
          }}
        >
          {/* Logo + toggle row */}
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
              gap: 8,
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              flexShrink: 0,
            }}
          >
            {/* Logo mark */}
            <button
              onClick={() => window.location.href = '/'}
              title="SubsidySetu"
              style={{
                height: 32, width: 32, minWidth: 32,
                borderRadius: 4,
                overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", border: "none",
              }}
            >
              <img src="/logo.jpg" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </button>

            {/* Wordmark — only visible when expanded */}
            {isExpanded && (
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
                  Subsidy<span style={{ color: '#888888' }}>Setu</span>
                </div>
                <div style={{ color: "#475569", fontSize: 10, whiteSpace: "nowrap" }}>CA workspace · v1</div>
              </div>
            )}

            {/* Toggle */}
            <button
              onClick={() => {
                if (mobileMenuOpen) {
                  setMobileMenuOpen(false);
                } else {
                  setOpen(v => !v);
                }
              }}
              title={isExpanded ? "Collapse" : "Expand"}
              style={{
                height: 32, width: 32, minWidth: 32,
                borderRadius: 8,
                background: isExpanded ? "rgba(143,159,237,0.15)" : "transparent",
                border: isExpanded ? "1px solid rgba(143,159,237,0.25)" : "1px solid transparent",
                color: isExpanded ? "#ffc0da" : "#94a3b8",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = isExpanded ? "rgba(143,159,237,0.15)" : "transparent";
                (e.currentTarget as HTMLElement).style.color = isExpanded ? "#ffc0da" : "#94a3b8";
              }}
            >
              {mobileMenuOpen ? <X style={{ width: 15, height: 15 }} /> : <PanelLeft style={{ width: 15, height: 15 }} />}
            </button>
          </div>

          {/* Nav items */}
          <nav style={{ flex: 1, padding: "8px 6px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto", overflowX: "hidden" }}>
            {!isExpanded && (
              <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "4px 6px 6px" }} />
            )}
            {nav.map(({ key, label, icon: Icon }) => {
              const active = page.name === key || (key === "clients" && page.name === "client-detail");
              return (
                <button
                  key={key}
                  onClick={() => navigate({ name: key } as Page)}
                  title={!isExpanded ? label : undefined}
                  style={{
                    height: 36,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: isExpanded ? "0 10px" : "0",
                    justifyContent: isExpanded ? "flex-start" : "center",
                    borderRadius: 10,
                    cursor: "pointer",
                    border: active ? "1px solid rgba(143,159,237,0.22)" : "1px solid transparent",
                    background: active ? "rgba(143,159,237,0.13)" : "transparent",
                    color: active ? "#ffc0da" : "#94a3b8",
                    fontWeight: active ? 500 : 400,
                    fontSize: 13,
                    transition: "all 0.15s",
                    position: "relative",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textAlign: "left",
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  {/* Active left bar */}
                  {active && (
                    <span style={{
                      position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                      width: 2, height: 18, borderRadius: 2,
                      background: "linear-gradient(180deg,#8f9fed,#5a4386)",
                    }} />
                  )}
                  <Icon style={{ width: 16, height: 16, flexShrink: 0 }} />
                  {isExpanded && <span style={{ flex: 1 }}>{label}</span>}
                  {key === "notifications" && (
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: "#8f9fed", boxShadow: "0 0 5px #8f9fed",
                      flexShrink: 0,
                      marginLeft: isExpanded ? "auto" : 0,
                    }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* User card */}
          <div style={{ padding: 8, borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
            <div style={{
              padding: isExpanded ? "10px 10px" : "6px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              overflow: "hidden",
            }}>
              <div style={{
                height: 30, width: 30, minWidth: 30,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#8f9fed,#5a4386)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, color: "#fff",
                boxShadow: "0 0 10px rgba(143,159,237,0.4)",
              }}>
                PN
              </div>
              {isExpanded && (
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Priya Nair, CA
                  </div>
                  <div style={{ fontSize: 10, color: "#475569", whiteSpace: "nowrap" }}>Nair & Associates</div>
                </div>
              )}
              {isExpanded && (
                <span style={{
                  fontSize: 10, padding: "2px 8px", borderRadius: 99,
                  background: "rgba(143,159,237,0.15)", border: "1px solid rgba(143,159,237,0.25)",
                  color: "#bfcbff", fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0,
                }}>
                  Growth
                </span>
              )}
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

          {/* Navbar */}
          <header style={{
            height: 64, display: "flex", alignItems: "center", padding: "0 20px", gap: 12,
            position: "sticky", top: 0, zIndex: 10,
            background: "rgba(7,8,15,0.88)",
            backdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            flexShrink: 0,
          }}>
            {/* Hamburger menu for mobile */}
            <button 
              className="md:hidden flex items-center justify-center text-[#94a3b8] hover:text-white mr-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>

            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center gap-1.5 text-[13px] whitespace-nowrap">
              <span style={{ color: "#475569" }}>SubsidyDesk</span>
              <ChevronRight style={{ width: 13, height: 13, color: "#334155" }} />
              <span style={{ color: "#fff", fontWeight: 500 }}>{activeName}</span>
            </div>

            {/* Centred search */}
            <div style={{
              position: "absolute", left: "50%", transform: "translateX(-50%)",
              width: "min(320px, 35vw)",
            }}>
              <div style={{ position: "relative" }}>
                <Search style={{
                  position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                  width: 14, height: 14, color: "#475569",
                }} />
                <input
                  placeholder="Search clients, schemes…"
                  style={{
                    width: "100%", height: 36,
                    paddingLeft: 36, paddingRight: 48,
                    borderRadius: 99, fontSize: 13,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#f1f5f9", outline: "none",
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = "rgba(143,159,237,0.5)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(143,159,237,0.12)";
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <kbd style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  fontSize: 10, padding: "2px 6px", borderRadius: 4, color: "#475569",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                }}>⌘K</kbd>
              </div>
            </div>

            {/* Right */}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              <button
                onClick={() => navigate({ name: "notifications" })}
                style={{
                  height: 36, width: 36, borderRadius: 10,
                  background: "transparent", border: "none",
                  color: "#94a3b8", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
              >
                <Bell style={{ width: 16, height: 16 }} />
                <span style={{
                  position: "absolute", top: 8, right: 8,
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#8f9fed", boxShadow: "0 0 6px #8f9fed",
                }} />
              </button>

              <button
                onClick={() => navigate({ name: "settings" })}
                style={{
                  height: 32, width: 32, borderRadius: "50%",
                  background: "linear-gradient(135deg,#8f9fed,#5a4386)",
                  border: "none", cursor: "pointer",
                  color: "#fff", fontSize: 11, fontWeight: 700,
                  boxShadow: "0 0 14px rgba(143,159,237,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                PN
              </button>
            </div>
          </header>

          {/* Page content */}
          <main style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
            {renderPage(page)}
          </main>
        </div>
      </div>
    </NavContext.Provider>
  );
}
