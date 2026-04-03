# Sidebar Customization Guide

## Overview
The sidebar can now be fully customized by users through the Settings page. Users can reorder menu items, show/hide them, and reset to defaults.

## Features

### 1. **Reorder Menu Items**
- Drag and drop to reorder sidebar items
- Dashboard is always first (locked)
- Settings is always last (locked)
- Changes save automatically

### 2. **Show/Hide Items**
- Toggle visibility of any menu item
- Dashboard and Settings are always visible (cannot be hidden)
- Hidden items don't appear in the sidebar

### 3. **Visual Order Indicators**
- Each item shows its position number (#1, #2, etc.)
- Drag handle icon indicates draggable items
- Eye icon shows visibility status

### 4. **Persistence**
- All changes are saved to localStorage
- Settings persist across sessions
- Reset button restores default configuration

## How to Use

### Access Settings
1. Click **Settings** in the sidebar
2. Navigate to the **Sidebar** tab
3. You'll see the Sidebar Configuration panel

### Reorder Items
1. Click and hold the drag handle (≡ icon)
2. Drag the item up or down
3. Drop it in the desired position
4. Changes save automatically with a success toast

### Show/Hide Items
1. Find the item you want to show/hide
2. Click the switch on the right
3. Item will immediately appear/disappear from sidebar
4. Changes save automatically

### Reset to Default
1. Click the **Reset** button at the top-right
2. All items return to default order and visibility
3. Confirmation toast appears

## Default Configuration

```
1. Dashboard       (locked position, always visible)
2. Chemicals       (customizable)
3. MSDS           (customizable)
4. Waste          (customizable)
5. Water          (customizable)
6. Compliance & Audit (customizable)
7. Inventory      (customizable)
8. Alerts         (customizable)
9. Users          (customizable)
10. Safety        (customizable)
11. Sustainability (customizable)
12. Settings      (locked position, always visible)
```

## Technical Details

### Store Structure
```typescript
interface SidebarItem {
  id: string;           // Unique identifier
  name: string;         // Display name
  href: string;         // Route path
  icon: string;         // Lucide icon name
  visible: boolean;     // Show/hide state
  order: number;        // Position in sidebar
}
```

### Actions Available
- `reorderItems(newOrder)` - Reorder all items
- `toggleItemVisibility(id)` - Show/hide specific item
- `resetToDefault()` - Restore default configuration

### Persistence
- Uses Zustand with persist middleware
- Stored in localStorage as 'sidebar-storage'
- Automatically syncs across tabs

## User Benefits

✅ **Personalized Navigation** - Show only the modules you use
✅ **Efficient Workflow** - Put most-used items at the top
✅ **Clean Interface** - Hide unused modules for minimal UI
✅ **Quick Reset** - Restore defaults anytime
✅ **Persistent Settings** - Your preferences stay saved

## Example Use Cases

### Factory Manager
```
1. Dashboard
2. Compliance & Audit (moved up - high priority)
3. Safety (moved up - high priority)
4. Alerts
5. Users
[Other modules hidden]
```

### Quality Control
```
1. Dashboard
2. MSDS
3. Chemicals
4. Compliance & Audit
5. Waste
[Other modules hidden]
```

### Environmental Officer
```
1. Dashboard
2. Waste
3. Water
4. Sustainability
5. Compliance & Audit
[Other modules hidden]
```

## Tips

💡 **Start with defaults** - Use the system first, then customize based on your workflow
💡 **Keep it minimal** - Show only what you use daily for a cleaner interface
💡 **Try different orders** - Experiment to find the most efficient arrangement
💡 **Use reset freely** - You can always go back to defaults

## Support

If you need to restore factory defaults, simply:
1. Go to Settings → Sidebar
2. Click "Reset" button
3. All items return to original order and visibility
