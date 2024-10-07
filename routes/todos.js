import express from 'express';
import TodoList from '../models/Todo.js';
import { verifyToken } from './users.js';

const todoRoutes = express.Router();

// Create a new todo list
todoRoutes.post('/', verifyToken, async (req, res) => {
  const { name, body } = req.body;
  try {
    const newTodoList = new TodoList({
      userId: req.user.id,
      name,
      body: body || '',
    });
    const todoList = await newTodoList.save();
    res.json(todoList);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all todo lists for a user
todoRoutes.get('/', verifyToken, async (req, res) => {
  try {
    const todoLists = await TodoList.find({ userId: req.user.id });
    res.json(todoLists);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific todo list
todoRoutes.get('/:id', verifyToken, async (req, res) => {
  try {
    const todoList = await TodoList.findOne({ _id: req.params.id, userId: req.user.id });
    if (!todoList) return res.status(404).json({ message: 'Todo list not found' });
    res.json(todoList);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a todo list
todoRoutes.put('/:id', verifyToken, async (req, res) => {
  const { name, items } = req.body;
  try {
    const todoList = await TodoList.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name, items },
      { new: true }
    );
    if (!todoList) return res.status(404).json({ message: 'Todo list not found' });
    res.json(todoList);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a todo list
todoRoutes.delete('/:id', verifyToken, async (req, res) => {
  try {
    const todoList = await TodoList.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!todoList) return res.status(404).json({ message: 'Todo list not found' });
    res.json({ message: 'Todo list deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export { todoRoutes };
