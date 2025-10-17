import { http, HttpResponse } from 'msw';
import type { AuthResponse, LoginCredentials, User } from '../types/auth';
import type { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/task';
import { TaskStatus } from '../types/task';

// Mock data
const mockUser: User = {
  id: '1',
  username: 'test',
  email: 'test@example.com',
};

const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTE2MjM5MDIyfQ.testtoken';

// Initial mock tasks
let mockTasks: Task[] = [
  {
    id: '1',
    title: 'Welcome to the Task Manager',
    description: 'This is your first task. You can edit or delete it!',
    status: TaskStatus.TODO,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: '1',
  },
  {
    id: '2',
    title: 'Complete the onboarding',
    description: 'Learn how to use all the features of this task management application.',
    status: TaskStatus.IN_PROGRESS,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: '1',
  },
];

// Load tasks from localStorage if available
const storedTasks = localStorage.getItem('mockTasks');
if (storedTasks) {
  try {
    mockTasks = JSON.parse(storedTasks);
  } catch (error) {
    console.warn('Failed to parse stored tasks, using defaults');
  }
}

// Helper function to save tasks to localStorage
const saveTasks = () => {
  localStorage.setItem('mockTasks', JSON.stringify(mockTasks));
};

export const handlers = [
  // Authentication endpoints
  http.post('/api/login', async ({ request }) => {
    const credentials = await request.json() as LoginCredentials;
    console.log('🔶 MSW: Received login request:', credentials);
    console.log('🔍 MSW: Username received:', `"${credentials.username}"` + ` (length: ${credentials.username?.length})`);
    console.log('🔍 MSW: Password received:', `"${credentials.password}"` + ` (length: ${credentials.password?.length})`);
    console.log('🔍 MSW: Expected username:', `"test" (length: 4)`);
    console.log('🔍 MSW: Expected password:', `"test123" (length: 7)`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (credentials.username === 'test' && credentials.password === 'test123') {
      const response: AuthResponse = {
        user: mockUser,
        token: mockToken,
      };
      console.log('✅ MSW: Login successful, returning:', response);
      return HttpResponse.json(response);
    }
    
    console.log('❌ MSW: Invalid credentials - comparison failed');
    console.log('🔍 MSW: Username match:', credentials.username === 'test');
    console.log('🔍 MSW: Password match:', credentials.password === 'test123');
    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  http.post('/api/logout', async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return HttpResponse.json({ message: 'Logged out successfully' });
  }),

  // Task endpoints
  http.get('/api/tasks', async ({ request }) => {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return HttpResponse.json(mockTasks);
  }),

  http.post('/api/tasks', async ({ request }) => {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const taskData = await request.json() as CreateTaskRequest;
    
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: '1',
    };
    
    mockTasks.push(newTask);
    saveTasks();
    
    await new Promise(resolve => setTimeout(resolve, 600));
    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.put('/api/tasks/:id', async ({ request, params }) => {
    const { id } = params;
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const updateData = await request.json() as UpdateTaskRequest;
    const taskIndex = mockTasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return HttpResponse.json(
        { message: 'Task not found' },
        { status: 404 }
      );
    }
    
    mockTasks[taskIndex] = {
      ...mockTasks[taskIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    
    saveTasks();
    
    await new Promise(resolve => setTimeout(resolve, 400));
    return HttpResponse.json(mockTasks[taskIndex]);
  }),

  http.delete('/api/tasks/:id', async ({ request, params }) => {
    const { id } = params;
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const taskIndex = mockTasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return HttpResponse.json(
        { message: 'Task not found' },
        { status: 404 }
      );
    }
    
    mockTasks.splice(taskIndex, 1);
    saveTasks();
    
    await new Promise(resolve => setTimeout(resolve, 300));
    return HttpResponse.json({ message: 'Task deleted successfully' });
  }),
];