import React, { useState } from 'react';

function AddTask({ addTask }) {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text, dueDate, priority);
    setText('');
    setDueDate('');
    setPriority('low');
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col md:flex-row gap-3 mb-6 items-center justify-end"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task"
        className="p-2 border border-gray-300 rounded w-full md:w-1/2 dark:bg-gray-800"
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
        className="p-2 border border-gray-300 rounded dark:bg-gray-800">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        type="submit"
        className="bg-pastel-blue text-black font-semibold px-4 py-2 rounded hover:bg-pastel-green transition">
        Add
      </button>
    </form>
  );
}

export default AddTask;