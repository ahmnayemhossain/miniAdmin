import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { subMonths } from 'date-fns';

export interface DateRange {
  from: Date;
  to: Date;
  label: string;
}

interface DateFilterState {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  resetDateRange: () => void;
}

const defaultDateRange: DateRange = {
  from: subMonths(new Date(), 1),
  to: new Date(),
  label: "Last 1 Month",
};

export const useDateFilterStore = create<DateFilterState>()(
  persist(
    (set, get) => ({
      dateRange: defaultDateRange,
      
      setDateRange: (range) => {
        console.log('📅 Zustand Store: Setting date range');
        console.log('  - From:', range.from);
        console.log('  - To:', range.to);
        console.log('  - Label:', range.label);
        
        set({ dateRange: range });
        
        console.log('✅ Zustand Store: Date range updated');
        console.log('  - Current state:', get().dateRange);
      },
      
      resetDateRange: () => {
        console.log('🔄 Zustand Store: Resetting to default');
        set({ dateRange: defaultDateRange });
      },
    }),
    {
      name: 'date-filter-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        const serialized = {
          dateRange: {
            from: state.dateRange.from.toISOString(),
            to: state.dateRange.to.toISOString(),
            label: state.dateRange.label,
          },
        };
        console.log('💾 Saving to localStorage:', serialized);
        return serialized;
      },
      merge: (persistedState: any, currentState) => {
        try {
          if (persistedState?.dateRange) {
            const merged = {
              ...currentState,
              dateRange: {
                from: new Date(persistedState.dateRange.from),
                to: new Date(persistedState.dateRange.to),
                label: persistedState.dateRange.label,
              },
            };
            console.log('📂 Loaded from localStorage:', merged.dateRange);
            return merged;
          }
        } catch (error) {
          console.error('❌ Error loading persisted date range:', error);
        }
        console.log('📂 Using default date range');
        return currentState;
      },
    }
  )
);
