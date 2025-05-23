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
          className="space-y-3"
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
                  style={getItemStyle(provided.draggableProps.style, snapshot.isDragging)}
                  className={`flex justify-between items-center p-4 rounded shadow-sm ${snapshot.isDragging ? 'bg-pastel-green' : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                >
                  <span
                    onClick={() => onToggle(task._id)}
                    className={`flex flex-col gap-1 cursor-pointer ${task.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-gray-100'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{task.text}</span>
                      <span
                        style={{
                          fontSize: '12px',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: {
                            low: '#e0f7e9',
                            medium: '#fff9c4',
                            high: '#ffcdd2'
                          }[task.priority],
                          color: '#333',
                        }}
                      >
                        {task.priority}
                      </span>
                    </div>

                    {task.dueDate && (
                      <span className="text-sm italic text-gray-500">
                        due {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </span>


                  <button
                    onClick={() => onDelete(task._id)}
                    className="ml-4 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 transition"
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