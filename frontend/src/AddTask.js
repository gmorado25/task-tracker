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
    <form onSubmit={onSubmit} style={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px'
    }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task"
        style={{ padding: '8px', width: '300px' }}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ marginLeft: 10 }}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" style={{ padding: '8px 16px' }}>Add</button>
    </form>
  );
}

export default AddTask;