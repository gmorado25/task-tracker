const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const taskRoutes = require('./routes/taskRoutes');
const folderRoutes = require('./routes/folderRoutes');

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// "General Tasks" folder exists
const Folder = require('./models/Folder');
async function getGeneralTasksFolder() {
  let folder = await Folder.findOne({ name: 'General Tasks' });
  if (!folder) {
    folder = await Folder.create({ name: 'General Tasks' });
  }
  return folder;
}
(async () => {
  await getGeneralTasksFolder();
})();

// Use routes
app.use('/api/tasks', taskRoutes);
app.use('/api/folders', folderRoutes);

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));