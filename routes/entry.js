const express = require('express');
const router = express.Router();

const {
  createLogEntry,
  updateLogEntry,
  deleteLogEntry
} = require('../controllers/entry');

router.route('/').post(createLogEntry).patch(updateLogEntry).delete(deleteLogEntry);

module.exports = router;