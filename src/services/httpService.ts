import axios from 'axios';
import { apiService, User, ApiResponse } from './api';

const API_URL = process.env.API_URL || 'https://api.example.com';

class HttpService {
  private static instance: HttpService;
  private axiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  private async handleRequest<T>(
    axiosRequest: () => Promise<{ data: T }>,
    fallbackRequest: () => Promise<ApiResponse<T>>
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axiosRequest();
      return {
        data: response.data,
        status: 200,
        message: 'Success'
      };
    } catch (error) {
      console.warn('API request failed, falling back to mock data:', error);
      return fallbackRequest();
    }
  }

  public async getUsers(): Promise<ApiResponse<User[]>> {
    return this.handleRequest(
      () => this.axiosInstance.get('/users'),
      () => apiService.getUsers()
    );
  }

  public async getUserById(id: string): Promise<ApiResponse<User>> {
    return this.handleRequest(
      () => this.axiosInstance.get(`/users/${id}`),
      () => apiService.getUserById(id)
    );
  }

  public async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<User>> {
    return this.handleRequest(
      () => this.axiosInstance.post('/users', user),
      () => apiService.createUser(user)
    );
  }

  public async updateUser(id: string, user: Partial<User>): Promise<ApiResponse<User>> {
    return this.handleRequest(
      () => this.axiosInstance.put(`/users/${id}`, user),
      () => apiService.updateUser(id, user)
    );
  }

  public async deleteUser(id: string): Promise<ApiResponse<null>> {
    return this.handleRequest(
      () => this.axiosInstance.delete(`/users/${id}`),
      () => apiService.deleteUser(id)
    );
  }
}

export const httpService = HttpService.getInstance(); 