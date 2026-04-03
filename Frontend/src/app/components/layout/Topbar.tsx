import { useState } from "react";
import { Search, Bell, Building2, User, Sun, Moon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { useTheme } from "../theme-provider";
import { useAuthStore, useAlertStore } from "../../store";

export function Topbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  
  // Global state
  const { user, currentFactory, factories, switchFactory } = useAuthStore();
  const { alerts, unreadCount, acknowledgeAlert } = useAlertStore();
  
  // Get only unread alerts for notification dropdown
  const unreadAlerts = alerts.filter(a => !a.acknowledged).slice(0, 3);

  const handleFactorySwitch = (factoryId: string) => {
    switchFactory(factoryId);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search chemicals, MSDS, alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 ml-4">
          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Factory Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Building2 className="w-4 h-4" />
                <span className="hidden sm:inline">{currentFactory?.name || 'Select Plant'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Switch Factory</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {factories.map((factory) => (
                <DropdownMenuItem 
                  key={factory.id}
                  onClick={() => handleFactorySwitch(factory.id)}
                  disabled={!factory.active}
                >
                  {factory.name} {currentFactory?.id === factory.id && '(Current)'}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications ({unreadCount})</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {unreadAlerts.length > 0 ? (
                unreadAlerts.map((alert) => (
                  <DropdownMenuItem 
                    key={alert.id} 
                    className="flex flex-col items-start py-3"
                    onClick={() => acknowledgeAlert(alert.id)}
                  >
                    <div className="font-medium">{alert.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {alert.description}
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No new notifications
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{user?.name || 'User'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}