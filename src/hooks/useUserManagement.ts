import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import { User, UserFormData } from '@/types/user';
import { useUserStore } from '@/store/userStore';

export const useUserManagement = () => {
  const queryClient = useQueryClient();
  const { setUsers, setLoading, setError } = useUserStore();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: (userData: UserFormData) => userService.createUser(userData),
    onSuccess: (newUser: User) => {
      queryClient.setQueryData<User[]>(['users'], (oldData = []) => [
        ...oldData,
        newUser,
      ]);
    },
    onError: (error: Error) => {
      setError('Failed to create user');
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: ({ userId, userData }: { userId: string; userData: UserFormData }) =>
      userService.updateUser(userId, userData),
    onSuccess: (updatedUser: User) => {
      queryClient.setQueryData<User[]>(['users'], (oldData = []) =>
        oldData.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    },
    onError: (error: Error) => {
      setError('Failed to update user');
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => userService.deleteUser(userId),
    onSuccess: (_: void, userId: string) => {
      queryClient.setQueryData<User[]>(['users'], (oldData = []) =>
        oldData.filter((user) => user.id !== userId)
      );
    },
    onError: (error: Error) => {
      setError('Failed to delete user');
    },
  });

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return {
    users,
    isLoading,
    searchTerm,
    handleSearch,
    createUser: createUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
  };
}; 