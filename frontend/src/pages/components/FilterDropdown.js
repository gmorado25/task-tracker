import React from 'react';

export default function FilterDropdown({ show, setShow, updateFilter }) {
  return (
    <div className="relative ml-auto">
      <button
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        onClick={() => setShow(f => !f)}
        aria-label="Filter"
      >
        <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 017 17v-3.586a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" />
        </svg>
      </button>
      {show && (
        <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
          <button onClick={() => updateFilter('all')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">All</button>
          <button onClick={() => updateFilter('active')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Active</button>
          <button onClick={() => updateFilter('completed')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Completed</button>
        </div>
      )}
    </div>
  );
}