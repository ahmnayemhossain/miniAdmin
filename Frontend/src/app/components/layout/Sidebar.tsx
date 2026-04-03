import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  FlaskConical, 
  FileText, 
  Trash2, 
  Droplets, 
  ClipboardCheck, 
  Package, 
  Bell, 
  Users, 
  Shield, 
  Leaf, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Award
} from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useSidebarStore } from "../../store";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const { items } = useSidebarStore();

  // Get icon component from icon name string
  const getIcon = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons] as typeof LayoutDashboard;
    return Icon || LayoutDashboard;
  };

  // Filter visible items and sort by order
  const visibleItems = items
    .filter(item => item.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className={cn(
      "bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg text-sidebar-foreground">Mini Admin</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle}
          className="hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="space-y-1">
          {visibleItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = getIcon(item.icon);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sidebar-foreground",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
                  collapsed && "justify-center"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            <p>Factory: Plant A</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        )}
      </div>
    </div>
  );
}