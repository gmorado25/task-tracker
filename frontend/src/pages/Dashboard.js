import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSearchParams } from 'react-router-dom';
import Modal from '../components/Modal';
import AddTask from './components/Tasks/AddTask';
import TaskList from './components/Tasks/TaskList';
import FolderList from './components/Folders/FolderList';
import useTasks from './hooks/useTasks'; // <-- create this file
import useFolders from './hooks/useFolders'; // <-- create this file
import FilterDropdown from './components/FilterDropdown'; // <-- create this file

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [expandedFolderId, setExpandedFolderId] = useState(null);
  const [viewAll, setViewAll] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filter = searchParams.get('filter') || 'all';

  // Custom hooks handle fetching and mutations
  const {
    folders,
    addFolder,
    deleteFolder,
    selectedFolderId,
    setSelectedFolderId,
  } = useFolders();

  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    reorderTasks,
    setTasks,
  } = useTasks(selectedFolderId);

  const updateFilter = (newFilter) => setSearchParams({ filter: newFilter });

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const reordered = Array.from(tasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setTasks(reordered);
    await reorderTasks(reordered.map(t => t._id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 dark:text-pastel-blue">Task Tracker</h1>
      <div className="flex gap-2 mb-4 items-center">
        <button
          className="bg-pastel-blue text-black font-semibold px-4 py-2 rounded hover:bg-pastel-green transition"
          onClick={() => setShowAddFolder(true)}
        >
          Add Folder
        </button>
        <button
          className="bg-pastel-blue text-black font-semibold px-4 py-2 rounded hover:bg-pastel-green transition"
          onClick={() => setShowAddTask(true)}
        >
          Add Task
        </button>
        <FilterDropdown
          show={showFilters}
          setShow={setShowFilters}
          updateFilter={updateFilter}
        />
        <button
          className={`px-4 py-2 rounded font-semibold transition ${viewAll ? 'bg-pastel-green' : 'bg-gray-200 dark:bg-gray-700'}`}
          onClick={() => setViewAll(v => !v)}
        >
          {viewAll ? 'Viewing All Tasks' : 'View All Tasks'}
        </button>
      </div>
      {!viewAll && expandedFolderId && (
        <div className="mb-2 text-sm text-gray-500 font-semibold">
          Folder view: {folders.find(f => f._id === expandedFolderId)?.name}
        </div>
      )}
      {viewAll && (
        <div className="mb-2 text-sm text-gray-500 font-semibold">
          Viewing all tasks
        </div>
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        {!viewAll ? (
          <FolderList
            folders={folders}
            expandedFolderId={expandedFolderId}
            setExpandedFolderId={setExpandedFolderId}
            tasks={tasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            deleteFolder={deleteFolder}
          />
        ) : (
          <div className="mb-6 border rounded shadow-sm bg-white dark:bg-gray-900 p-4">
            <h2 className="text-xl font-semibold mb-2">All Tasks</h2>
            <TaskList
              tasks={filteredTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              droppableId="all-tasks"
              grouped={false}
            />
          </div>
        )}
      </DragDropContext>
      {/* Modals */}
      <Modal
        open={showAddFolder}
        onClose={() => setShowAddFolder(false)}
        title="Add Folder"
        onAction={() => document.getElementById('add-folder-form').requestSubmit()}
        actionLabel="Add Folder"
      >
        <form
          id="add-folder-form"
          onSubmit={async (e) => {
            e.preventDefault();
            const name = e.target.folderName.value;
            await addFolder(name);
            setShowAddFolder(false);
          }}
        >
          <input name="folderName" placeholder="Enter folder name" className="p-2 border rounded w-full mb-4" required />
        </form>
      </Modal>
      <Modal
        open={showAddTask}
        onClose={() => setShowAddTask(false)}
        title="Add Task"
        onAction={() => document.getElementById('add-task-form').requestSubmit()}
        actionLabel="Add Task"
      >
        <AddTask
          addTask={async (text, dueDate, priority, folderId) => {
            await addTask(text, dueDate, priority, folderId);
            setShowAddTask(false);
          }}
          folders={folders}
          defaultFolderId={selectedFolderId}
        />
      </Modal>
    </div>
  );
}

export default Dashboard;