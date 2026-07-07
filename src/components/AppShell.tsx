import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, Sparkles, FileText, KanbanSquare,
  Receipt, Bell, Settings, Search, Command, Menu, MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const nav = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/clients", label: "Clients", icon: Users },
  { to: "/matches", label: "Eligibility Matches", icon: Sparkles },
  { to: "/applications", label: "Applications", icon: FileText },
  { to: "/tracker", label: "Status Tracker", icon: KanbanSquare },
  { to: "/billing", label: "Success Fee", icon: Receipt },
  { to: "/chat", label: "Chat", icon: MessageSquare },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Firm Settings", icon: Settings },
] as const;

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 bg-background/85 backdrop-blur border-b border-border">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6 h-14">
            <div className="flex items-center gap-2 min-w-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    aria-label="Open menu"
                    className="h-9 w-9 grid place-items-center rounded-md hover:bg-muted border border-border"
                  >
                    <Menu className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" sideOffset={8} className="w-[calc(100vw-2rem)] sm:w-64 max-h-[80vh] overflow-y-auto">
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-md grid place-items-center bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold">
                        S
                      </div>
                      <div className="leading-tight">
                        <div className="text-sm font-semibold">SubsidyDesk</div>
                        <div className="text-[10px] text-muted-foreground font-normal">CA workspace · v1</div>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {nav.map((item) => {
                    const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.to} asChild>
                        <Link
                          to={item.to}
                          className={cn(
                            "flex items-center gap-3 cursor-pointer rounded-sm transition-colors duration-200 hover:bg-muted/60",
                            active && "bg-primary/20 text-primary font-medium hover:bg-primary/25",
                          )}
                        >
                          <Icon className={cn("h-4 w-4", active && "text-primary")} />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                  <DropdownMenuSeparator />
                  <div className="px-2 py-2 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent grid place-items-center text-xs font-medium">
                      PN
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">Priya Nair, CA</div>
                      <div className="text-xs text-muted-foreground truncate">Nair & Associates · Pune</div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link to="/" className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-md grid place-items-center bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold">
                  S
                </div>
                <span className="text-sm font-semibold hidden sm:inline">SubsidyDesk</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Ask AI or search clients, schemes, applications…"
                  className="w-full h-9 pl-9 pr-16 rounded-md border border-input bg-muted/40 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:bg-card"
                />
                <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-[10px] text-muted-foreground bg-background border border-border rounded px-1.5 py-0.5">
                  <Command className="h-3 w-3" /> K
                </kbd>
              </div>
              <Link
                to="/notifications"
                className="relative h-9 w-9 grid place-items-center rounded-md hover:bg-muted shrink-0"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-primary" />
              </Link>
            </div>
            <div />
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}