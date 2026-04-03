import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  children?: React.ReactNode;
}

export function PageHeader({ title, description, action, children }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          {description && <p className="mt-1 text-muted-foreground">{description}</p>}
        </div>
        {action && (
          <Button onClick={action.onClick} className="gap-2">
            {action.icon && <action.icon className="w-4 h-4" />}
            {action.label}
          </Button>
        )}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}