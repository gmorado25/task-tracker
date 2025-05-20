import React from 'react';

function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) return <p>No tasks yet.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map(task => (
        <li key={task._id || task.id} style={{
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span
            onClick={() => onToggle(task._id || task.id)}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
          >
            {task.text}
          </span>
          <button
            onClick={() => onDelete(task._id || task.id)}
            style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;