import React from 'react';
import TaskList from '../Tasks/TaskList';

export default function FolderList({
  folders,
  expandedFolderId,
  setExpandedFolderId,
  tasks,
  toggleTask,
  deleteTask,
  deleteFolder
}) {
  return (
    <ul className="mb-6">
      {folders.map(folder => (
        <li key={folder._id} className="mb-2 border rounded shadow-sm bg-white dark:bg-gray-900">
          <div className="flex items-center px-2 py-2">
            <button
              onClick={() => setExpandedFolderId(expandedFolderId === folder._id ? null : folder._id)}
              className="flex items-center flex-1 text-left gap-2"
            >
              {expandedFolderId === folder._id ? (
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                {folder.name}
              </span>
            </button>
            <button
              onClick={() => deleteFolder(folder._id)}
              className="ml-2 p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 transition"
              title="Delete Folder"
            >
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {expandedFolderId === folder._id && (
            <div className="pl-8 pb-3">
              {tasks.filter(t => t.folder === folder._id).length === 0 ? (
                <div className="text-gray-400 italic py-2">No tasks in this folder</div>
              ) : (
                <TaskList
                  tasks={tasks.filter(t => t.folder === folder._id)}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  droppableId={folder._id}
                  grouped
                />
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}