import express from 'express';
import Task from '../models/Task.js';
import { emitTaskUpdate } from '../socket.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const tasks = await Task.find().populate('assignedTo');
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const task = await Task.create(req.body);
  emitTaskUpdate('board', { type: 'create', task });
  res.status(201).json(task);
});

router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  emitTaskUpdate('board', { type: 'update', task });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  emitTaskUpdate('board', { type: 'delete', taskId: req.params.id });
  res.sendStatus(204);
});

router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    emitTaskUpdate('board', { type: 'update', task });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Status update failed' });
  }
});

export default router;
