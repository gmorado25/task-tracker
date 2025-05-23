import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

function getItemStyle(style, isDragging) {
  return {
    userSelect: 'none',
    backgroundColor: isDragging ? '#d3f8e2' : '#f9f9f9',
    ...style,
  };
}

function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <Droppable droppableId="task-list">
      {(provided) => (
        <ul
          style={{ listStyle: 'none', padding: 0 }}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {tasks.map((task, index) => (
            <Draggable key={task._id} draggableId={task._id} index={index}>
              {(provided, snapshot) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...getItemStyle(provided.draggableProps.style, snapshot.isDragging),
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                    padding: '8px',
                    borderRadius: '6px',
                  }}
                >
                  <span
                    onClick={() => onToggle(task._id)}
                    style={{
                      cursor: 'pointer',
                      textDecoration: task.completed ? 'line-through' : 'none',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {task.completed && (
                      <span style={{
                        display: 'inline-block',
                        width: '16px',
                        height: '16px',
                        backgroundColor: 'green',
                        borderRadius: '50%',
                        animation: 'pop 0.3s ease',
                      }} />
                    )}
                    {task.text}

                    {task.dueDate && (
                      <small style={{
                        marginLeft: 8,
                        fontStyle: 'italic',
                        color: new Date(task.dueDate) < new Date() ? 'red' : '#888',
                        fontWeight: new Date(task.dueDate) < new Date() ? 'bold' : 'normal'
                      }}>
                        due {new Date(task.dueDate).toLocaleDateString()}
                      </small>
                    )}

                    <span style={{
                      fontSize: '12px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: {
                        low: '#e0f7e9',
                        medium: '#fff9c4',
                        high: '#ffcdd2'
                      }[task.priority],
                      color: '#333',
                      marginLeft: '8px'
                    }}>
                      {task.priority}
                    </span>
                  </span>

                  <button
                    onClick={() => onDelete(task._id)}
                    style={{
                      marginLeft: '10px',
                      backgroundColor: 'red',
                      color: 'white',
                      border: '1px solid black',
                      padding: '4px 8px'
                    }}
                  >
                    Delete
                  </button>
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

export default TaskList;