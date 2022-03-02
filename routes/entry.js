const express = require('express');
const router = express.Router();

const {
  createLogEntry,
  updateLogEntry,
  deleteLogEntry
} = require('../controllers/entry');

router.route('/').post(createLogEntry).patch(updateLogEntry);
router.route('/:logid/:entryid').delete(deleteLogEntry);

module.exports = router;