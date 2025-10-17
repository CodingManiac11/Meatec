import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import ErrorBoundary from '../components/ErrorBoundary';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchTasks } from '../store/tasksSlice';
import type { Task } from '../types/task';

const DashboardPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  
  const dispatch = useAppDispatch();
  const { tasks, isLoading, error } = useAppSelector((state) => state.tasks || { tasks: [], isLoading: false, error: null });

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    // Fetch tasks when component mounts
    dispatch(fetchTasks());
  }, [dispatch]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setShowTaskForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}
        
        <ErrorBoundary>
          <TaskList
            tasks={tasks}
            isLoading={isLoading}
            onCreateTask={handleCreateTask}
            onEditTask={handleEditTask}
          />
        </ErrorBoundary>
      </main>

      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onClose={handleCloseTaskForm}
        />
      )}
    </div>
  );
};

export default DashboardPage;