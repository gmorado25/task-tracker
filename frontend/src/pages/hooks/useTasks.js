import { useState, useEffect } from 'react';
import {
  fetchTasks,
  addTask as addTaskService,
  toggleTask as toggleTaskService,
  deleteTask as deleteTaskService,
  reorderTasks as reorderTasksService
} from '../../services/taskService';

export default function useTasks(selectedFolderId) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!selectedFolderId) return;
    fetchTasks(selectedFolderId).then(setTasks);
  }, [selectedFolderId]);

  const addTask = async (text, dueDate, priority, folderId) => {
    const newTask = await addTaskService(text, dueDate, priority, folderId || selectedFolderId);
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = async (id) => {
    const updatedTask = await toggleTaskService(id);
    setTasks(tasks => tasks.map(task => task._id === id ? updatedTask : task));
  };

  const deleteTask = async (id) => {
    await deleteTaskService(id);
    setTasks(tasks => tasks.filter(task => task._id !== id));
  };

  const reorderTasks = async (ids) => {
    await reorderTasksService(ids);
  };

  return { tasks, setTasks, addTask, toggleTask, deleteTask, reorderTasks };
}