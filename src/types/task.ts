export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface UpdateTaskRequest {
  id: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
}