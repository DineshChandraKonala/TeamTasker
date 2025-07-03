import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { io } from 'socket.io-client';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import KanbanBoard from '../components/KanbanBoard';
import ChatPanel from '../components/ChatPanel';
import ActivityLog from '../components/ActivityLog';

const socket = io('http://localhost:5000');

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
    socket.emit('join', 'board');
    socket.on('receive-task-update', fetchTasks);
    return () => socket.off('receive-task-update');
  }, []);

  const fetchTasks = async () => {
    const { data } = await API.get('/tasks');
    setTasks(data);
  };

  return (
    <div className="min-h-screen bg-[#748873]">
      <Navbar />
      <div className="px-6 py-4">
        <TaskForm onTaskCreated={fetchTasks} />
        <KanbanBoard tasks={tasks} />
        <ActivityLog />
        <ChatPanel />
      </div>
    </div>
  );
}
