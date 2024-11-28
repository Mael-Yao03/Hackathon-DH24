import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    pharmacyName: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    // Simulate API call
    if (email === 'demo@pharmacy.com' && password === 'demo123') {
      set({
        isAuthenticated: true,
        user: {
          id: '1',
          name: 'John Doe',
          pharmacyName: 'Central Pharmacy'
        }
      });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  }
}));