import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const { data } = await API.get('/tasks/logs');
    setLogs(data);
  };

  return (
    <div className="mt-10 max-w-3xl mx-auto bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3 text-[#4b4453]">Recent Activity</h3>
      <ul className="space-y-2">
        {logs.map((log, index) => (
          <li key={index} className="text-sm text-gray-700">
            🕒 <span className="font-medium">{log.userId}</span> {log.action} on <span className="font-medium">{log.taskId}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
