import React, { useState } from 'react';

function FolderList({ folders, selectedFolderId, onSelect, onAdd }) {
  const [newFolder, setNewFolder] = useState('');
  return (
    <div className="mb-6">
      <div className="flex gap-2 mb-2">
        <input
          value={newFolder}
          onChange={e => setNewFolder(e.target.value)}
          placeholder="New folder"
          className="p-2 border border-gray-300 rounded dark:bg-gray-800"
        />
        <button
          onClick={() => {
            if (newFolder.trim()) {
              onAdd(newFolder);
              setNewFolder('');
            }
          }}
          className="bg-pastel-blue text-black font-semibold px-4 py-2 rounded hover:bg-pastel-green transition"
        >
          Add Folder
        </button>
      </div>
      <ul>
        {folders.map(folder => (
          <li key={folder._id}>
            <button
              onClick={() => onSelect(folder._id)}
              className={`w-full text-left px-3 py-2 rounded ${selectedFolderId === folder._id ? 'bg-pastel-green' : 'bg-gray-100 dark:bg-gray-800'}`}
            >
              {folder.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FolderList;