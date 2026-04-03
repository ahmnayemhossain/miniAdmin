import { AlertTriangle, Flame, Skull, Droplet, Leaf } from "lucide-react";
import { cn } from "../ui/utils";

interface HazardIconProps {
  type: "flammable" | "toxic" | "corrosive" | "explosive" | "biohazard" | "environmental";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function HazardIcon({ type, size = "md", className }: HazardIconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const icons = {
    flammable: <Flame className={cn(sizeClasses[size], "text-orange-600 dark:text-orange-400")} />,
    toxic: <Skull className={cn(sizeClasses[size], "text-red-600 dark:text-red-400")} />,
    corrosive: <Droplet className={cn(sizeClasses[size], "text-yellow-600 dark:text-yellow-400")} />,
    explosive: <AlertTriangle className={cn(sizeClasses[size], "text-red-700 dark:text-red-400")} />,
    biohazard: <AlertTriangle className={cn(sizeClasses[size], "text-purple-600 dark:text-purple-400")} />,
    environmental: <Leaf className={cn(sizeClasses[size], "text-green-600 dark:text-green-400")} />,
  };

  return <span className={cn("inline-flex items-center justify-center", className)}>{icons[type]}</span>;
}