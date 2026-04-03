import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppSettings } from './types';

interface SettingsState {
  settings: AppSettings;
  isDirty: boolean;
  
  // Actions
  updateSettings: (updates: Partial<AppSettings>) => void;
  updateNotifications: (updates: Partial<AppSettings['notifications']>) => void;
  updateAlerts: (updates: Partial<AppSettings['alerts']>) => void;
  updateDisplay: (updates: Partial<AppSettings['display']>) => void;
  resetSettings: () => void;
  saveSettings: () => void;
}

const defaultSettings: AppSettings = {
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  alerts: {
    lowStock: true,
    complianceDue: true,
    safetyIncidents: true,
  },
  display: {
    language: 'en',
    timezone: 'America/Los_Angeles',
    dateFormat: 'MM/DD/YYYY',
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      isDirty: false,

      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates },
        isDirty: true,
      })),

      updateNotifications: (updates) => set((state) => ({
        settings: {
          ...state.settings,
          notifications: { ...state.settings.notifications, ...updates },
        },
        isDirty: true,
      })),

      updateAlerts: (updates) => set((state) => ({
        settings: {
          ...state.settings,
          alerts: { ...state.settings.alerts, ...updates },
        },
        isDirty: true,
      })),

      updateDisplay: (updates) => set((state) => ({
        settings: {
          ...state.settings,
          display: { ...state.settings.display, ...updates },
        },
        isDirty: true,
      })),

      resetSettings: () => set({
        settings: defaultSettings,
        isDirty: false,
      }),

      saveSettings: () => set({ isDirty: false }),
    }),
    {
      name: 'settings-storage',
    }
  )
);
