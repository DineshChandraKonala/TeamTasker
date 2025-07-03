import React, { useState } from 'react';
import { deleteTask, updateTask, updateStatus } from '../services/api';

export default function TaskCard({ task, onTaskUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const saveEdit = async () => {
    await updateTask(task._id, {
      title: editedTitle,
      description: editedDescription,
    });
    setIsEditing(false);
    onTaskUpdated();
  };

  const handleDelete = async () => {
    await deleteTask(task._id);
    onTaskUpdated();
  };

  const handleStatusChange = async (newStatus) => {
    await updateStatus(task._id, newStatus);
    onTaskUpdated();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Todo': return '#D1A980';
      case 'In Progress': return '#748873';
      case 'Done': return '#8e8e8e';
      default: return '#ccc';
    }
  };

  return (
    <div className="bg-[#E5E0D8] rounded-lg shadow p-4 mb-4 border-l-4"
      style={{ borderColor: getStatusColor(task.status) }}>
      {isEditing ? (
        <>
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full font-semibold text-[#4b4453] text-lg mb-1"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full text-sm text-gray-600 mb-2"
          />
          <div className="flex gap-2 mt-2">
            <button onClick={saveEdit} className="text-sm bg-green-600 text-white px-2 py-1 rounded">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="text-sm bg-gray-500 text-white px-2 py-1 rounded">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h4 className="text-lg font-semibold text-[#4b4453]">{task.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full mb-2"
            style={{ backgroundColor: getStatusColor(task.status), color: '#fff' }}>
            {task.status}
          </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {task.status !== 'In Progress' && (
              <button onClick={() => handleStatusChange('In Progress')}
                className="px-2 py-1 text-sm bg-blue-500 text-white rounded">
                Mark In Progress
              </button>
            )}
            {task.status !== 'Done' && (
              <button onClick={() => handleStatusChange('Done')}
                className="px-2 py-1 text-sm bg-green-600 text-white rounded">
                Mark Done
              </button>
            )}
            <button onClick={() => setIsEditing(true)}
              className="px-2 py-1 text-sm bg-yellow-500 text-white rounded">
              Edit
            </button>
            <button onClick={handleDelete}
              className="px-2 py-1 text-sm bg-red-600 text-white rounded">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
