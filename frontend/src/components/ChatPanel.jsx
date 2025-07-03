import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  transports: ['websocket'],
});

export default function ChatPanel() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const hasSetupListener = useRef(false); // ✅ prevent duplicate listeners

  useEffect(() => {
    if (!hasSetupListener.current) {
      socket.on('chat-message', (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
      hasSetupListener.current = true; // ✅ mark as set
    }
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit('chat-message', message);
    setMessage('');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h3 className="text-lg font-semibold text-[#4b4453] mb-2">Team Chat</h3>
      <div className="h-40 overflow-y-auto border p-2 mb-2 bg-[#f3f3f3] rounded">
        {messages.map((msg, i) => (
          <div key={i} className="text-sm text-[#4b4453] mb-1">{msg}</div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow px-3 py-1 rounded-l border border-gray-300 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-[#054602] text-white px-4 rounded-r hover:bg-[#041c01]"
        >
          Send
        </button>
      </div>
    </div>
  );
}
