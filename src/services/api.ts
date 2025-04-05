import {mockUsers} from '../mocks/users';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

class ApiService {
  private static instance: ApiService;
  private baseUrl = 'https://api.example.com';

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public async getUsers(): Promise<ApiResponse<User[]>> {
    // Simulate API delay
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    return {
      data: mockUsers,
      status: 200,
      message: 'Success',
    };
  }

  public async getUserById(id: string): Promise<ApiResponse<User>> {
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    const user = mockUsers.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      data: user,
      status: 200,
      message: 'Success',
    };
  }

  public async createUser(
    user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ApiResponse<User>> {
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    const newUser: User = {
      ...user,
      id: (mockUsers.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    return {
      data: newUser,
      status: 201,
      message: 'User created successfully',
    };
  }

  public async updateUser(
    id: string,
    user: Partial<User>,
  ): Promise<ApiResponse<User>> {
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...mockUsers[index],
      ...user,
      updatedAt: new Date().toISOString(),
    };

    mockUsers[index] = updatedUser;

    return {
      data: updatedUser,
      status: 200,
      message: 'User updated successfully',
    };
  }

  public async deleteUser(id: string): Promise<ApiResponse<null>> {
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }

    mockUsers.splice(index, 1);

    return {
      data: null,
      status: 200,
      message: 'User deleted successfully',
    };
  }
}

export const apiService = ApiService.getInstance();
