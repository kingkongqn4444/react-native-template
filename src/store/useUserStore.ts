import { create } from 'zustand';
import { User, UserFormData, UserState } from '@types/user';

const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,

  // Actions
  setUsers: (users: User[]) => set({ users }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),

  // CRUD Operations
  addUser: (user: User) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (updatedUser: User) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    })),
  deleteUser: (userId: string) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
}));

export default useUserStore; 