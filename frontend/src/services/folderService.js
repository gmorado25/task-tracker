export const fetchFolders = async () => {
  const res = await fetch('/api/folders');
  return await res.json();
};

export const addFolder = async (name) => {
  const res = await fetch('/api/folders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  return await res.json();
};

export const deleteFolder = async (id) => {
  return await fetch(`/api/folders/${id}`, { method: 'DELETE' });
};