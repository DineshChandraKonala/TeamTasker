import React, { useState } from 'react';
import API from '../services/api';

export default function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Todo');

  const handleCreate = async () => {
    if (!title.trim()) return alert('Task title is required');

    try {
      await API.post('/tasks', { title, description, status });
      onTaskCreated(); // Refresh task list
      setTitle('');
      setDescription('');
      setStatus('Todo');
    } catch (error) {
      alert('Failed to add task');
      console.error(error);
    }
  };

  return (
    <div className="bg-[#E5E0D8] p-5 rounded-xl shadow mb-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-[#4b4453] mb-4">Add New Task</h2>

      <input
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D1A980]"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D1A980]"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D1A980]"
      >
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <button
        onClick={handleCreate}
        className="bg-[#054602] text-white px-4 py-2 rounded hover:bg-[#041c01] transition"
      >
        Add Task
      </button>
    </div>
  );
}
