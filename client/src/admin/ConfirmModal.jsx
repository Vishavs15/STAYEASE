import React, { useEffect } from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  useEffect(() => {
    // Prevent background scrolling when the modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Semi-transparent background */}
      <div className="absolute inset-0 backdrop-blur-lg" onClick={onClose}></div>
      
      {/* Modal content */}
      <div className="relative bg-white rounded-lg p-6 w-80 shadow-lg z-10">
        <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
        <p className="text-sm mb-6">Are you sure you want to delete this user?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
