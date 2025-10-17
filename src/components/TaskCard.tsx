import React, { useState } from 'react';
import { Edit, Trash2, Calendar } from 'lucide-react';
import { useAppDispatch } from '../hooks/redux';
import { deleteTask } from '../store/tasksSlice';
import { TaskStatus } from '../types/task';
import type { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await dispatch(deleteTask(task.id)).unwrap();
      } catch (error) {
        console.error('Failed to delete task:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case TaskStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case TaskStatus.COMPLETED:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusText = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return 'To Do';
      case TaskStatus.IN_PROGRESS:
        return 'In Progress';
      case TaskStatus.COMPLETED:
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="card p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-3">
              {task.description}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
            title="Edit task"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
            title="Delete task"
          >
            {isDeleting ? (
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {getStatusText(task.status)}
        </span>
        
        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(task.updatedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;