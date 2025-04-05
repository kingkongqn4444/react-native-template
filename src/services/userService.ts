import { apiService } from './api';
import { User, UserFormData } from '@/types/user';
import { storageService } from './storageService';

export const userService = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    try {
      // First try to get from API
      const response = await apiService.getUsers();
      const users = response.data;
      
      // Save to MMKV storage
      storageService.saveUsers(users);
      
      return users;
    } catch (error) {
      // If API fails, try to get from storage
      console.log('API failed, getting users from storage');
      return storageService.getUsers();
    }
  },

  // Create a new user
  createUser: async (userData: UserFormData): Promise<User> => {
    try {
      const response = await apiService.createUser(userData);
      const newUser = response.data;
      
      // Update storage
      const currentUsers = storageService.getUsers();
      storageService.saveUsers([...currentUsers, newUser]);
      
      return newUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  },

  // Update a user
  updateUser: async (userId: string, userData: UserFormData): Promise<User> => {
    try {
      const response = await apiService.updateUser(userId, userData);
      const updatedUser = response.data;
      
      // Update storage
      const currentUsers = storageService.getUsers();
      const updatedUsers = currentUsers.map(user => 
        user.id === userId ? updatedUser : user
      );
      storageService.saveUsers(updatedUsers);
      
      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  },

  // Delete a user
  deleteUser: async (userId: string): Promise<void> => {
    try {
      await apiService.deleteUser(userId);
      
      // Update storage
      const currentUsers = storageService.getUsers();
      const updatedUsers = currentUsers.filter(user => user.id !== userId);
      storageService.saveUsers(updatedUsers);
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  },
}; 