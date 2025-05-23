export const fetchTasks = async (folderId) => {
  let url = '/api/tasks';
  if (folderId) url += `?folderId=${folderId}`;
  const res = await fetch(url);
  return await res.json();
};

export const addTask = async (text, dueDate, priority, folderId) => {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, dueDate, priority, folderId })
  });
  return await res.json();
};

export const toggleTask = async (id) => {
  const res = await fetch(`/api/tasks/${id}`, { method: 'PATCH' });
  return await res.json();
};

export const deleteTask = async (id) => {
  return await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
};

export const reorderTasks = async (reorderedIds) => {
  await fetch('/api/tasks/reorder', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reorderedIds })
  });
};