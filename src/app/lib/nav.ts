import { createContext, useContext } from "react";

export type Page =
  | { name: "overview" }
  | { name: "clients" }
  | { name: "client-detail"; id: string }
  | { name: "matches" }
  | { name: "applications" }
  | { name: "tracker" }
  | { name: "billing" }
  | { name: "chat" }
  | { name: "notifications" }
  | { name: "settings" };

export type NavCtx = {
  page: Page;
  go: (p: Page) => void;
};

export const NavContext = createContext<NavCtx>({ page: { name: "overview" }, go: () => {} });
export const useNav = () => useContext(NavContext);
