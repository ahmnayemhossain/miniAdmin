import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MSDS } from './types';

interface MSDSState {
  documents: MSDS[];
  filteredDocuments: MSDS[];
  searchQuery: string;
  filterStatus: string;
  isUploading: boolean;
  
  // Actions
  setDocuments: (documents: MSDS[]) => void;
  addDocument: (document: MSDS) => void;
  updateDocument: (id: number, updates: Partial<MSDS>) => void;
  deleteDocument: (id: number) => void;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: string) => void;
  setUploading: (uploading: boolean) => void;
  getDocumentById: (id: number) => MSDS | undefined;
  getExpiringDocuments: () => MSDS[];
}

// Mock data
const mockDocuments: MSDS[] = [
  {
    id: 1,
    chemicalName: "Sulfuric Acid",
    documentNumber: "MSDS-2024-001",
    supplier: "ChemCorp Industries",
    hazardType: "corrosive",
    version: "3.2",
    lastUpdated: "Jan 15, 2024",
    status: "current",
    fileSize: "2.4 MB",
  },
  {
    id: 2,
    chemicalName: "Hydrochloric Acid",
    documentNumber: "MSDS-2024-002",
    supplier: "ChemCorp Industries",
    hazardType: "corrosive",
    version: "2.8",
    lastUpdated: "Feb 10, 2024",
    status: "current",
    fileSize: "1.8 MB",
  },
  {
    id: 3,
    chemicalName: "Acetone",
    documentNumber: "MSDS-2023-045",
    supplier: "Solvent Solutions Ltd",
    hazardType: "flammable",
    version: "4.1",
    lastUpdated: "Nov 5, 2023",
    status: "expiring",
    fileSize: "3.1 MB",
  },
  {
    id: 4,
    chemicalName: "Ethanol",
    documentNumber: "MSDS-2022-089",
    supplier: "Alcohol Distillers Co",
    hazardType: "flammable",
    version: "2.3",
    lastUpdated: "Aug 20, 2022",
    status: "expired",
    fileSize: "1.5 MB",
  },
];

export const useMSDSStore = create<MSDSState>()(
  persist(
    (set, get) => ({
      documents: mockDocuments,
      filteredDocuments: mockDocuments,
      searchQuery: '',
      filterStatus: 'all',
      isUploading: false,

      setDocuments: (documents) => set({
        documents,
        filteredDocuments: documents,
      }),

      addDocument: (document) => set((state) => {
        const newDocuments = [...state.documents, document];
        return {
          documents: newDocuments,
          filteredDocuments: newDocuments,
        };
      }),

      updateDocument: (id, updates) => set((state) => {
        const documents = state.documents.map(d =>
          d.id === id ? { ...d, ...updates } : d
        );
        return {
          documents,
          filteredDocuments: documents,
        };
      }),

      deleteDocument: (id) => set((state) => {
        const documents = state.documents.filter(d => d.id !== id);
        return {
          documents,
          filteredDocuments: documents,
        };
      }),

      setSearchQuery: (query) => set((state) => {
        const filtered = state.documents.filter(d =>
          d.chemicalName.toLowerCase().includes(query.toLowerCase()) ||
          d.documentNumber.toLowerCase().includes(query.toLowerCase())
        );
        return { searchQuery: query, filteredDocuments: filtered };
      }),

      setFilterStatus: (status) => set((state) => {
        const filtered = status === 'all'
          ? state.documents
          : state.documents.filter(d => d.status === status);
        return { filterStatus: status, filteredDocuments: filtered };
      }),

      setUploading: (uploading) => set({ isUploading: uploading }),

      getDocumentById: (id) => {
        return get().documents.find(d => d.id === id);
      },

      getExpiringDocuments: () => {
        return get().documents.filter(d => d.status === 'expiring' || d.status === 'expired');
      },
    }),
    {
      name: 'msds-storage',
    }
  )
);
