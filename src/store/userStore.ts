import { create } from 'zustand';
import { User } from '@/types/user';
import { storageService } from '@/services/storageService';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addUser: (user: User) => void;
  updateUser: (updatedUser: User) => void;
  deleteUser: (userId: string) => void;
  deleteAllUsers: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,
  
  setUsers: (users) => {
    set({ users });
    storageService.saveUsers(users);
  },
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  addUser: (user) => {
    set((state) => {
      const newUsers = [...state.users, user];
      storageService.saveUsers(newUsers);
      return { users: newUsers };
    });
  },
  
  updateUser: (updatedUser) => {
    set((state) => {
      const newUsers = state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      storageService.saveUsers(newUsers);
      return { users: newUsers };
    });
  },
  
  deleteUser: (userId) => {
    set((state) => {
      const newUsers = state.users.filter((user) => user.id !== userId);
      storageService.saveUsers(newUsers);
      return { users: newUsers };
    });
  },
  
  deleteAllUsers: () => {
    set({ users: [] });
    storageService.deleteAllUsers();
  },
}));

// ... existing code ... 