import { useState } from "react";
import { useSidebarStore } from "../store";
import type { SidebarItem } from "../store/useSidebarStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { GripVertical, Eye, EyeOff, RotateCcw, Menu } from "lucide-react";
import * as Icons from "lucide-react";
import { toast } from "sonner";

export function SidebarCustomizer() {
  const { items, reorderItems, toggleItemVisibility, resetToDefault } = useSidebarStore();
  const [draggedItem, setDraggedItem] = useState<SidebarItem | null>(null);

  // Sort items by order
  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  const handleDragStart = (e: React.DragEvent, item: SidebarItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetItem: SidebarItem) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetItem.id) {
      setDraggedItem(null);
      return;
    }

    const newItems = [...sortedItems];
    const draggedIndex = newItems.findIndex(item => item.id === draggedItem.id);
    const targetIndex = newItems.findIndex(item => item.id === targetItem.id);

    // Remove dragged item and insert at target position
    newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);

    reorderItems(newItems);
    setDraggedItem(null);
    toast.success("Sidebar order updated");
  };

  const handleToggleVisibility = (id: string) => {
    toggleItemVisibility(id);
    const item = items.find(i => i.id === id);
    toast.success(`${item?.name} ${item?.visible ? 'hidden' : 'shown'}`);
  };

  const handleReset = () => {
    resetToDefault();
    toast.success("Sidebar reset to default");
  };

  const getIcon = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons] as Icons.LucideIcon;
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Menu className="w-5 h-5" />
              Sidebar Configuration
            </CardTitle>
            <CardDescription className="mt-2">
              Drag to reorder menu items, toggle visibility, or reset to default
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              draggable={item.id !== 'dashboard' && item.id !== 'settings'} // Don't allow dragging Dashboard and Settings
              onDragStart={(e) => handleDragStart(e, item)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item)}
              className={`
                flex items-center gap-3 p-3 rounded-lg border transition-all
                ${item.visible 
                  ? 'bg-background hover:bg-accent/50' 
                  : 'bg-muted/50 opacity-60'
                }
                ${draggedItem?.id === item.id ? 'opacity-50' : ''}
                ${item.id !== 'dashboard' && item.id !== 'settings' ? 'cursor-move' : 'cursor-default'}
              `}
            >
              {/* Drag Handle */}
              <div className={`${item.id !== 'dashboard' && item.id !== 'settings' ? 'text-muted-foreground' : 'text-transparent'}`}>
                <GripVertical className="w-5 h-5" />
              </div>

              {/* Icon */}
              <div className={`${item.visible ? 'text-foreground' : 'text-muted-foreground'}`}>
                {getIcon(item.icon)}
              </div>

              {/* Name */}
              <div className="flex-1">
                <span className={`text-sm font-medium ${item.visible ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {item.name}
                </span>
                {item.id === 'dashboard' && (
                  <span className="ml-2 text-xs text-muted-foreground">(Always first)</span>
                )}
                {item.id === 'settings' && (
                  <span className="ml-2 text-xs text-muted-foreground">(Always last)</span>
                )}
              </div>

              {/* Order Number */}
              <div className="text-xs text-muted-foreground font-mono px-2 py-1 bg-muted rounded">
                #{item.order + 1}
              </div>

              {/* Visibility Toggle */}
              <div className="flex items-center gap-2">
                {item.visible ? (
                  <Eye className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                )}
                <Switch
                  checked={item.visible}
                  onCheckedChange={() => handleToggleVisibility(item.id)}
                  disabled={item.id === 'dashboard' || item.id === 'settings'} // Always show Dashboard and Settings
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Tips:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Drag items to reorder (except Dashboard and Settings)</li>
            <li>• Toggle switch to show/hide menu items</li>
            <li>• Dashboard is always first, Settings is always last</li>
            <li>• Changes are saved automatically</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
