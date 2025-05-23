import React from 'react';

function Modal({
  open,
  onClose,
  children,
  title,
  onAction,
  actionLabel = 'Submit',
  actionDisabled = false,
  showActions = true
}) {
  if (!open) return null;

  // Close modal when clicking on the backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white dark:bg-gray-900 rounded shadow-lg min-w-[300px] w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</span>
          <button
            className="text-2xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="p-6 pb-4">
          {children}
        </div>
        {showActions && (
          <div className="flex justify-end gap-2 px-6 pb-6">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded bg-pastel-blue text-black font-semibold hover:bg-pastel-green transition"
              onClick={onAction}
              disabled={actionDisabled}
            >
              {actionLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;