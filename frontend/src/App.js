import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      <button
        onClick={() => document.documentElement.classList.toggle('dark')}
        className="fixed top-4 right-4 bg-gray-300 dark:bg-gray-700 p-2 rounded"
      >
        Toggle Theme
      </button>
      <nav className="mb-6 p-4">
        <Link to="/" className="mr-4">Dashboard</Link>
        {/* Add more links for other pages here */}
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Add more routes for other pages here */}
      </Routes>
    </div>
  );
}

export default App;