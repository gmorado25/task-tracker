const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Build an API', completed: false }
];

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
  const { text } = req.body;
  const newTask = { id: Date.now(), text, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Toggle completion
app.patch('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    task.completed = !task.completed;
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));