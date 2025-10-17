import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import { TaskStatus } from '../types/task';
import type { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onCreateTask: () => void;
  onEditTask: (task: Task) => void;
}

type FilterType = 'all' | TaskStatus;

const TaskList: React.FC<TaskListProps> = ({ tasks, isLoading, onCreateTask, onEditTask }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Ensure tasks is always an array
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const filteredTasks = safeTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || task.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getFilterLabel = (filterType: FilterType) => {
    switch (filterType) {
      case 'all':
        return 'All Tasks';
      case TaskStatus.TODO:
        return 'To Do';
      case TaskStatus.IN_PROGRESS:
        return 'In Progress';
      case TaskStatus.COMPLETED:
        return 'Completed';
      default:
        return 'All Tasks';
    }
  };

  const getTaskCountByStatus = (status: TaskStatus) => {
    return safeTasks.filter(task => task.status === status).length;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading tasks...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              {getFilterLabel(filter)}
            </button>
            
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                <div className="py-1">
                  {['all', TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED].map((filterOption) => (
                    <button
                      key={filterOption}
                      onClick={() => {
                        setFilter(filterOption as FilterType);
                        setShowFilters(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between ${
                        filter === filterOption ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span>{getFilterLabel(filterOption as FilterType)}</span>
                      {filterOption !== 'all' && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {getTaskCountByStatus(filterOption as TaskStatus)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={onCreateTask}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </button>
        </div>
      </div>

      {/* Task statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {getTaskCountByStatus(TaskStatus.TODO)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">To Do</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {getTaskCountByStatus(TaskStatus.IN_PROGRESS)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {getTaskCountByStatus(TaskStatus.COMPLETED)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </div>
      </div>

      {/* Task list */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            {searchTerm || filter !== 'all' ? 'No tasks found' : 'No tasks yet'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm || filter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by creating your first task'
            }
          </p>
          {(!searchTerm && filter === 'all') && (
            <button
              onClick={onCreateTask}
              className="btn-primary"
            >
              Create Your First Task
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;