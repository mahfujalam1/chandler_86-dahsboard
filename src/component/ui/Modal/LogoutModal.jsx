// LogOutModal.jsx
import { useState } from "react";

export default function LogOutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl mx-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Logout Confirmation
        </h3>
        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-gray-900 px-4 py-2.5 font-medium text-white hover:bg-gray-800"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
