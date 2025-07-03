import Task from './models/Task.js';
let ioInstance;

export const setupSocket = (io) => {
  ioInstance = io;

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', (roomId) => {
      socket.join(roomId);
    });

    socket.on('task-updated', (data) => {
      socket.to(data.roomId).emit('receive-task-update', data);
    });

    // ✅ Add this block for chat
    socket.on('chat-message', (msg) => {
      console.log('Received chat message:', msg);
      io.emit('chat-message', msg); // broadcast to all connected users
    });
  });
};

export const emitTaskUpdate = (roomId, data) => {
  if (ioInstance) ioInstance.to(roomId).emit('receive-task-update', data);
};
