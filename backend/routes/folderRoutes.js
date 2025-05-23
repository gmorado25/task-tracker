const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');

router.get('/', folderController.getFolders);
router.post('/', folderController.addFolder);
router.delete('/:id', folderController.deleteFolder);

module.exports = router;