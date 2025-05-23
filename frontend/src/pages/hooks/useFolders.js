import { useState, useEffect } from 'react';
import {
  fetchFolders,
  addFolder as addFolderService,
  deleteFolder as deleteFolderService
} from '../../services/folderService';

export default function useFolders() {
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  useEffect(() => {
    const loadFolders = async () => {
      const data = await fetchFolders();
      setFolders(data);
      const general = data.find(f => f.name === 'General Tasks');
      if (general) setSelectedFolderId(general._id);
      else if (data.length) setSelectedFolderId(data[0]._id);
    };
    loadFolders();
  }, []);

  const addFolder = async (name) => {
    const newFolder = await addFolderService(name);
    setFolders(prev => [...prev, newFolder]);
    setSelectedFolderId(newFolder._id);
  };

  const deleteFolder = async (id) => {
    await deleteFolderService(id);
    setFolders(folders => folders.filter(f => f._id !== id));
    setSelectedFolderId(folders => {
      const remaining = folders.filter(f => f._id !== id);
      return remaining.length ? remaining[0]._id : null;
    });
  };

  return { folders, addFolder, deleteFolder, selectedFolderId, setSelectedFolderId };
}