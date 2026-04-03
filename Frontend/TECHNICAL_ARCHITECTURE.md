# Mini Admin - Technical Architecture

## ✅ Technology Stack

### **TypeScript** - 100% Coverage
- All components use `.tsx` extension
- Strict type checking with proper interfaces
- No `any` types (removed all instances)
- Type-safe props and state management
- Full IntelliSense support

### **React 18.3.1** - Modern Patterns
- Functional components with Hooks
- `useState`, `useEffect`, `useContext`
- Custom hooks (useTheme, useMobile)
- React Router v7 for navigation
- Proper component composition

### **Tailwind CSS v4** - Complete Styling
- 100% Tailwind classes (no inline styles except CSS variables)
- Custom theme with CSS variables
- Dark mode support with variants
- Responsive design with breakpoints
- ClickUp-inspired color palette

## 📁 Project Structure

```
/src
├── /app
│   ├── App.tsx                      # Root component with ThemeProvider
│   ├── routes.tsx                   # React Router configuration
│   │
│   ├── /components
│   │   ├── /design-system           # Reusable design components
│   │   │   ├── HazardIcon.tsx       # Typed hazard icons
│   │   │   ├── KPICard.tsx          # Dashboard KPI cards
│   │   │   ├── StatusBadge.tsx      # Status indicators
│   │   │   └── StockIndicator.tsx   # Progress indicators
│   │   │
│   │   ├── /layout                  # Layout components
│   │   │   ├── Layout.tsx           # Main layout wrapper
│   │   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   │   ├── Topbar.tsx           # Top navigation bar
│   │   │   └── PageHeader.tsx       # Page title component
│   │   │
│   │   ├── /ui                      # Radix UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   └── ... (40+ components)
│   │   │
│   │   └── theme-provider.tsx       # Dark/Light theme context
│   │
│   └── /pages                       # 12 Module pages
│       ├── Dashboard.tsx
│       ├── ChemicalManagement.tsx
│       ├── MSDSManagement.tsx
│       ├── WasteManagement.tsx
│       ├── WaterManagement.tsx
│       ├── ComplianceAudit.tsx
│       ├── Inventory.tsx
│       ├── Alerts.tsx
│       ├── UserManagement.tsx
│       ├── Safety.tsx
│       ├── Sustainability.tsx
│       └── Settings.tsx
│
└── /styles
    ├── index.css                    # Main CSS entry
    ├── tailwind.css                 # Tailwind imports
    ├── theme.css                    # CSS variables & theme
    └── fonts.css                    # Font imports

```

## 🎨 Design System

### **Color Palette** (ClickUp-Inspired)
```typescript
// Light Mode
Primary: #7b68ee (Purple)
Background: #ffffff
Muted: #f7f8f9
Border: #e5e7eb

// Dark Mode
Primary: #9d8df1 (Brighter Purple)
Background: #0f0f10
Muted: #27272a
Border: #27272a
```

### **Component Types**

All components have proper TypeScript interfaces:

```typescript
// Example: KPICard
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

// Example: StatusBadge
interface StatusBadgeProps {
  status: "safe" | "warning" | "critical" | "info" | "compliant" | "pending" | "failed";
  children: React.ReactNode;
  className?: string;
}
```

## 🔧 Key Features

### **1. Theme System**
- ThemeProvider with localStorage persistence
- Dark/Light mode toggle in Topbar
- CSS variables for dynamic theming
- All components support both themes

### **2. Type Safety**
- All data structures typed with interfaces
- No `any` types used
- Proper prop typing for all components
- Type-safe routing with React Router

### **3. Responsive Design**
- Mobile-first approach
- Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Collapsible sidebar
- Responsive grids and tables

### **4. Modern React Patterns**
- Hooks-based architecture
- Context API for theme
- Custom hooks for reusability
- Component composition over inheritance

## 📦 Dependencies

### **Core**
- React 18.3.1
- React Router 7.13.0
- TypeScript (via Vite)
- Tailwind CSS 4.1.12

### **UI Components**
- @radix-ui/* (40+ primitive components)
- lucide-react (Icons)
- recharts (Charts)
- sonner (Toasts)

### **Utilities**
- class-variance-authority (CVA)
- clsx & tailwind-merge (Class management)
- date-fns (Date utilities)
- react-hook-form (Forms)

## 🎯 Code Quality Standards

### **TypeScript Best Practices**
✅ All props have defined interfaces
✅ No implicit `any` types
✅ Proper event typing
✅ Type guards where needed
✅ Exported types for reusability

### **React Best Practices**
✅ Functional components only
✅ Hooks follow rules of hooks
✅ Proper dependency arrays
✅ Keys in lists
✅ Memoization where appropriate

### **Tailwind Best Practices**
✅ No inline styles (except CSS variables)
✅ Semantic color classes
✅ Responsive modifiers
✅ Dark mode variants
✅ Custom theme tokens

## 🚀 Performance Optimizations

- **Code Splitting**: React Router lazy loading
- **Tree Shaking**: ES modules for optimal bundling
- **CSS Purging**: Tailwind removes unused styles
- **Component Reusability**: DRY principle throughout
- **Proper Keys**: Optimized list rendering

## 📝 Naming Conventions

- **Components**: PascalCase (`KPICard`, `StatusBadge`)
- **Files**: PascalCase for components (`Dashboard.tsx`)
- **Interfaces**: PascalCase with descriptive names
- **Props**: camelCase (`isActive`, `onToggle`)
- **CSS Classes**: Tailwind utility classes
- **Functions**: camelCase (`handleClick`, `formatDate`)

## 🔐 Type Safety Examples

### Data Structures
```typescript
interface MSDS {
  id: number;
  chemicalName: string;
  documentNumber: string;
  supplier: string;
  hazardType: "flammable" | "toxic" | "corrosive" | "explosive";
  version: string;
  lastUpdated: string;
  status: "current" | "expiring" | "expired";
  fileSize: string;
}

interface Chemical {
  id: number;
  name: string;
  casNumber: string;
  hazardType: "flammable" | "toxic" | "corrosive" | "explosive";
  stockCurrent: number;
  stockMax: number;
  unit: string;
  location: string;
  status: "safe" | "warning" | "critical";
  supplier: string;
  lastUpdated: string;
}
```

### Event Handlers
```typescript
const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  // Properly typed file handling
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // Form submission
};
```

## 🎨 Tailwind Usage

### Semantic Classes
```tsx
// Instead of: text-gray-600
// Use: text-muted-foreground

// Instead of: bg-white
// Use: bg-background

// Instead of: border-gray-200
// Use: border-border
```

### Dark Mode
```tsx
// Automatic dark mode support
<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-gray-100">Content</p>
</div>
```

### Responsive Design
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Responsive grid */}
</div>
```

## ✅ Verification Checklist

- [x] All files use TypeScript (.tsx, .ts)
- [x] All components have proper type definitions
- [x] No `any` types used in application code
- [x] All styling uses Tailwind CSS
- [x] Dark mode support throughout
- [x] Responsive design implemented
- [x] React Hooks used correctly
- [x] Component composition follows best practices
- [x] Type-safe routing with React Router
- [x] Proper error handling
- [x] Accessibility considerations (ARIA labels)
- [x] Performance optimized

---

**Status**: ✅ **Production Ready**

The entire application is built with TypeScript, React, and Tailwind CSS following modern best practices and ClickUp design principles.
