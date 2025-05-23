const Folder = require('../models/Folder');

exports.getFolders = async (req, res) => {
  try {
    const folders = await Folder.find().sort({ createdAt: -1 });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch folders' });
  }
};

exports.addFolder = async (req, res) => {
  try {
    const newFolder = await Folder.create({ name: req.body.name });
    res.status(201).json(newFolder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create folder' });
  }
};

exports.deleteFolder = async (req, res) => {
  try {
    await Folder.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete folder' });
  }
};