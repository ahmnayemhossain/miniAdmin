import { create } from 'zustand';
import type { Alert } from './types';

interface AlertState {
  alerts: Alert[];
  unreadCount: number;
  filter: string;
  
  // Actions
  addAlert: (alert: Omit<Alert, 'id'>) => void;
  acknowledgeAlert: (id: number) => void;
  dismissAlert: (id: number) => void;
  clearAll: () => void;
  setFilter: (filter: string) => void;
  getUnreadAlerts: () => Alert[];
  getAlertsByPriority: (priority: Alert['priority']) => Alert[];
}

// Mock alerts
const mockAlerts: Alert[] = [
  {
    id: 1,
    title: "Low stock: Sulfuric Acid",
    description: "Stock level below 20% threshold",
    status: "warning",
    priority: "high",
    category: "stock",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    acknowledged: false,
  },
  {
    id: 2,
    title: "Compliance check due",
    description: "Monthly audit due in 2 days",
    status: "info",
    priority: "medium",
    category: "compliance",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    acknowledged: false,
  },
  {
    id: 3,
    title: "High water usage detected",
    description: "Water consumption exceeded normal threshold by 25%",
    status: "critical",
    priority: "critical",
    category: "system",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    acknowledged: false,
  },
  {
    id: 4,
    title: "MSDS update available",
    description: "3 documents require review and approval",
    status: "info",
    priority: "low",
    category: "compliance",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    acknowledged: true,
  },
];

export const useAlertStore = create<AlertState>((set, get) => ({
  alerts: mockAlerts,
  unreadCount: mockAlerts.filter(a => !a.acknowledged).length,
  filter: 'all',

  addAlert: (alert) => set((state) => {
    const newAlert: Alert = {
      ...alert,
      id: Math.max(...state.alerts.map(a => a.id), 0) + 1,
    };
    return {
      alerts: [newAlert, ...state.alerts],
      unreadCount: state.unreadCount + 1,
    };
  }),

  acknowledgeAlert: (id) => set((state) => {
    const alerts = state.alerts.map(a =>
      a.id === id ? { ...a, acknowledged: true } : a
    );
    return {
      alerts,
      unreadCount: alerts.filter(a => !a.acknowledged).length,
    };
  }),

  dismissAlert: (id) => set((state) => {
    const alerts = state.alerts.filter(a => a.id !== id);
    return {
      alerts,
      unreadCount: alerts.filter(a => !a.acknowledged).length,
    };
  }),

  clearAll: () => set({
    alerts: [],
    unreadCount: 0,
  }),

  setFilter: (filter) => set({ filter }),

  getUnreadAlerts: () => {
    return get().alerts.filter(a => !a.acknowledged);
  },

  getAlertsByPriority: (priority) => {
    return get().alerts.filter(a => a.priority === priority);
  },
}));
