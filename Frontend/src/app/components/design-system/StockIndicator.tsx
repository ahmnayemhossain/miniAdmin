import { Progress } from "../ui/progress";
import { cn } from "../ui/utils";

interface StockIndicatorProps {
  current: number;
  max: number;
  unit?: string;
  showLabel?: boolean;
  className?: string;
}

export function StockIndicator({ 
  current, 
  max, 
  unit = "L", 
  showLabel = true, 
  className 
}: StockIndicatorProps) {
  const percentage = (current / max) * 100;
  
  const getColorClass = () => {
    if (percentage <= 20) return "bg-red-500 dark:bg-red-600";
    if (percentage <= 50) return "bg-amber-500 dark:bg-amber-600";
    return "bg-green-500 dark:bg-green-600";
  };

  return (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Stock Level</span>
          <span className="font-medium text-foreground">
            {current} / {max} {unit}
          </span>
        </div>
      )}
      <div className="relative">
        <Progress value={percentage} className="h-2" />
        <div 
          className={cn("absolute top-0 left-0 h-2 rounded-full transition-all", getColorClass())}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}