import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";

interface StatusBadgeProps {
  status: "safe" | "warning" | "critical" | "info" | "compliant" | "pending" | "failed";
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  const variants = {
    safe: "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800",
    warning: "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800",
    critical: "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800",
    info: "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800",
    compliant: "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800",
    pending: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700",
    failed: "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800",
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(variants[status], "border", className)}
    >
      {children}
    </Badge>
  );
}