import React, { useState } from 'react';

function AddTask({ addTask, folders = [], defaultFolderId }) {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [folderId, setFolderId] = useState(defaultFolderId || (folders[0]?._id) || '');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !folderId) return;
    addTask(text, dueDate, priority, folderId);
    setText('');
    setDueDate('');
    setPriority('low');
    setFolderId(defaultFolderId || (folders[0]?._id) || '');
  };

  return (
    <form
      id="add-task-form"
      onSubmit={onSubmit}
      className="flex flex-col gap-3 mb-6 w-full"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task"
        className="p-2 border border-gray-300 rounded w-full dark:bg-gray-800"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-2 border border-gray-300 rounded dark:bg-gray-800"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="p-2 border border-gray-300 rounded dark:bg-gray-800"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        value={folderId}
        onChange={(e) => setFolderId(e.target.value)}
        className="p-2 border border-gray-300 rounded dark:bg-gray-800"
        required
      >
        <option value="" disabled>Select folder</option>
        {folders.map(folder => (
          <option key={folder._id} value={folder._id}>{folder.name}</option>
        ))}
      </select>
    </form>
  );
}

export default AddTask;