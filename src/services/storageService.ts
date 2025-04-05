import { MMKV } from 'react-native-mmkv';
import { User } from '@/types/user';

// Initialize MMKV instance
export const storage = new MMKV({
  id: 'user-storage',
  encryptionKey: 'user-management-key',
});

// Storage keys
const STORAGE_KEYS = {
  USERS: 'users',
};

// User storage operations
export const storageService = {
  // Save users to storage
  saveUsers: (users: User[]): void => {
    try {
      storage.set(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users to storage:', error);
    }
  },

  // Get users from storage
  getUsers: (): User[] => {
    try {
      const usersString = storage.getString(STORAGE_KEYS.USERS);
      return usersString ? JSON.parse(usersString) : [];
    } catch (error) {
      console.error('Error getting users from storage:', error);
      return [];
    }
  },

  // Delete all users from storage
  deleteAllUsers: (): void => {
    try {
      storage.delete(STORAGE_KEYS.USERS);
    } catch (error) {
      console.error('Error deleting users from storage:', error);
    }
  },
}; 