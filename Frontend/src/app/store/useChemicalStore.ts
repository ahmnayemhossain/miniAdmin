import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Chemical } from './types';

interface ChemicalState {
  chemicals: Chemical[];
  filteredChemicals: Chemical[];
  searchQuery: string;
  filterStatus: string;
  isLoading: boolean;
  
  // Actions
  setChemicals: (chemicals: Chemical[]) => void;
  addChemical: (chemical: Chemical) => void;
  updateChemical: (id: number, updates: Partial<Chemical>) => void;
  deleteChemical: (id: number) => void;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: string) => void;
  updateStock: (id: number, newStock: number) => void;
  getChemicalById: (id: number) => Chemical | undefined;
}

// Mock data
const mockChemicals: Chemical[] = [
  {
    id: 1,
    name: "Sulfuric Acid",
    casNumber: "7664-93-9",
    hazardType: "corrosive",
    stockCurrent: 850,
    stockMax: 1000,
    unit: "L",
    location: "Storage A-12",
    status: "safe",
    supplier: "ChemCorp Industries",
    lastUpdated: "Apr 1, 2026",
    description: "Concentrated sulfuric acid 98%"
  },
  {
    id: 2,
    name: "Hydrochloric Acid",
    casNumber: "7647-01-0",
    hazardType: "corrosive",
    stockCurrent: 450,
    stockMax: 800,
    unit: "L",
    location: "Storage A-14",
    status: "warning",
    supplier: "ChemCorp Industries",
    lastUpdated: "Apr 2, 2026",
  },
  {
    id: 3,
    name: "Acetone",
    casNumber: "67-64-1",
    hazardType: "flammable",
    stockCurrent: 120,
    stockMax: 1000,
    unit: "L",
    location: "Storage B-08",
    status: "critical",
    supplier: "Solvent Solutions Ltd",
    lastUpdated: "Mar 28, 2026",
  },
  {
    id: 4,
    name: "Sodium Hydroxide",
    casNumber: "1310-73-2",
    hazardType: "corrosive",
    stockCurrent: 2400,
    stockMax: 3000,
    unit: "kg",
    location: "Storage A-18",
    status: "safe",
    supplier: "Base Chemicals Inc",
    lastUpdated: "Apr 3, 2026",
  },
];

export const useChemicalStore = create<ChemicalState>()(
  persist(
    (set, get) => ({
      chemicals: mockChemicals,
      filteredChemicals: mockChemicals,
      searchQuery: '',
      filterStatus: 'all',
      isLoading: false,

      setChemicals: (chemicals) => set({ 
        chemicals,
        filteredChemicals: chemicals 
      }),

      addChemical: (chemical) => set((state) => {
        const maxId = state.chemicals.length > 0 
          ? Math.max(...state.chemicals.map(c => c.id))
          : 0;
        const newChemical = { ...chemical, id: maxId + 1 };
        const newChemicals = [...state.chemicals, newChemical];
        
        // Apply current filters
        const query = state.searchQuery;
        const filtered = query
          ? newChemicals.filter(c =>
              c.name.toLowerCase().includes(query.toLowerCase()) ||
              c.casNumber.toLowerCase().includes(query.toLowerCase())
            )
          : newChemicals;
        
        return {
          chemicals: newChemicals,
          filteredChemicals: filtered,
        };
      }),

      updateChemical: (id, updates) => set((state) => {
        const chemicals = state.chemicals.map(c => 
          c.id === id ? { ...c, ...updates } : c
        );
        return {
          chemicals,
          filteredChemicals: chemicals,
        };
      }),

      deleteChemical: (id) => set((state) => {
        const chemicals = state.chemicals.filter(c => c.id !== id);
        return {
          chemicals,
          filteredChemicals: chemicals,
        };
      }),

      setSearchQuery: (query) => set((state) => {
        const filtered = state.chemicals.filter(c =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.casNumber.toLowerCase().includes(query.toLowerCase())
        );
        return { searchQuery: query, filteredChemicals: filtered };
      }),

      setFilterStatus: (status) => set((state) => {
        const filtered = status === 'all' 
          ? state.chemicals 
          : state.chemicals.filter(c => c.status === status);
        return { filterStatus: status, filteredChemicals: filtered };
      }),

      updateStock: (id, newStock) => set((state) => {
        const chemicals = state.chemicals.map(c => {
          if (c.id === id) {
            const percentage = (newStock / c.stockMax) * 100;
            const status = percentage <= 20 ? 'critical' : percentage <= 50 ? 'warning' : 'safe';
            return { ...c, stockCurrent: newStock, status };
          }
          return c;
        });
        return {
          chemicals,
          filteredChemicals: chemicals,
        };
      }),

      getChemicalById: (id) => {
        return get().chemicals.find(c => c.id === id);
      },
    }),
    {
      name: 'chemical-storage',
    }
  )
);