import { Card } from "../ui/card";
import { cn } from "../ui/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: "safe" | "warning" | "critical";
  className?: string;
}

export function KPICard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  status = "safe",
  className 
}: KPICardProps) {
  const statusColors = {
    safe: "border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-950/30",
    warning: "border-amber-500 dark:border-amber-600 bg-amber-50 dark:bg-amber-950/30",
    critical: "border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-950/30",
  };

  return (
    <Card className={cn("p-6 border-l-4", statusColors[status], className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {Icon && (
          <div className="p-3 bg-background dark:bg-muted rounded-lg shadow-sm">
            <Icon className="w-6 h-6 text-foreground" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-1">
          <span className={cn(
            "text-sm font-medium",
            trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          )}>
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
          <span className="text-sm text-muted-foreground">vs last month</span>
        </div>
      )}
    </Card>
  );
}