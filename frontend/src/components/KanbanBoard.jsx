import React from 'react';
import TaskCard from './TaskCard';

export default function KanbanBoard({ tasks }) {
  const statuses = ['Todo', 'In Progress', 'Done'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statuses.map(status => (
        <div key={status} className="bg-[#F0ECE3] p-4 rounded-xl shadow-inner min-h-[300px]">
          <h3 className="text-xl font-bold text-[#4b4453] mb-4 text-center border-b pb-2 border-[#D1A980]">
            {status}
          </h3>
          {tasks.filter(task => task.status === status).map(task => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      ))}
    </div>
  );
}
