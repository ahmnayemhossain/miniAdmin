import { useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <div className="container mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}