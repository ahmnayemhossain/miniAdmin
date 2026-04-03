import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Factory } from './types';

interface AuthState {
  user: User | null;
  currentFactory: Factory | null;
  factories: Factory[];
  isAuthenticated: boolean;
  
  // Actions
  login: (user: User) => void;
  logout: () => void;
  switchFactory: (factoryId: string) => void;
  updateUser: (updates: Partial<User>) => void;
}

// Mock factories data
const mockFactories: Factory[] = [
  { id: '1', name: 'Plant A', location: 'California, USA', active: true },
  { id: '2', name: 'Plant B', location: 'Texas, USA', active: true },
  { id: '3', name: 'Plant C', location: 'Illinois, USA', active: false },
];

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@miniadmin.com',
  role: 'admin',
  factory: 'Plant A',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: mockUser,
      currentFactory: mockFactories[0],
      factories: mockFactories,
      isAuthenticated: true,

      login: (user) => set({ user, isAuthenticated: true }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        currentFactory: null 
      }),
      
      switchFactory: (factoryId) => set((state) => {
        const factory = state.factories.find(f => f.id === factoryId);
        if (factory && state.user) {
          return {
            currentFactory: factory,
            user: { ...state.user, factory: factory.name }
          };
        }
        return state;
      }),
      
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
    }),
    {
      name: 'auth-storage',
    }
  )
);
