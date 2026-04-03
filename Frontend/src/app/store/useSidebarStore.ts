import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LucideIcon } from 'lucide-react';

export interface SidebarItem {
  id: string;
  name: string;
  href: string;
  icon: string; // icon name as string
  visible: boolean;
  order: number;
}

interface SidebarState {
  items: SidebarItem[];
  
  // Actions
  reorderItems: (newOrder: SidebarItem[]) => void;
  toggleItemVisibility: (id: string) => void;
  resetToDefault: () => void;
}

const defaultSidebarItems: SidebarItem[] = [
  { id: 'dashboard', name: 'Dashboard', href: '/', icon: 'LayoutDashboard', visible: true, order: 0 },
  { id: 'chemicals', name: 'Chemicals', href: '/chemicals', icon: 'FlaskConical', visible: true, order: 1 },
  { id: 'msds', name: 'MSDS', href: '/msds', icon: 'FileText', visible: true, order: 2 },
  { id: 'waste', name: 'Waste', href: '/waste', icon: 'Trash2', visible: true, order: 3 },
  { id: 'water', name: 'Water', href: '/water', icon: 'Droplets', visible: true, order: 4 },
  { id: 'compliance', name: 'Compliance & Audit', href: '/compliance', icon: 'Award', visible: true, order: 5 },
  { id: 'inventory', name: 'Inventory', href: '/inventory', icon: 'Package', visible: true, order: 6 },
  { id: 'alerts', name: 'Alerts', href: '/alerts', icon: 'Bell', visible: true, order: 7 },
  { id: 'users', name: 'Users', href: '/users', icon: 'Users', visible: true, order: 8 },
  { id: 'safety', name: 'Safety', href: '/safety', icon: 'Shield', visible: true, order: 9 },
  { id: 'sustainability', name: 'Sustainability', href: '/sustainability', icon: 'Leaf', visible: true, order: 10 },
  { id: 'settings', name: 'Settings', href: '/settings', icon: 'Settings', visible: true, order: 11 },
];

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      items: defaultSidebarItems,

      reorderItems: (newOrder) => set({ 
        items: newOrder.map((item, index) => ({ ...item, order: index })) 
      }),

      toggleItemVisibility: (id) => set((state) => ({
        items: state.items.map(item =>
          item.id === id ? { ...item, visible: !item.visible } : item
        ),
      })),

      resetToDefault: () => set({ items: defaultSidebarItems }),
    }),
    {
      name: 'sidebar-storage',
    }
  )
);
