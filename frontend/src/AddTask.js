import React, { useState } from 'react';

function AddTask({ addTask }) {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text);
    setText('');
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
      <button type="submit" style={{ padding: '8px 16px' }}>Add</button>
    </form>
  );
}

export default AddTask;