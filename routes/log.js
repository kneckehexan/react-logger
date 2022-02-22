const express = require('express');
const router = express.Router();

const {
  getAllLogs,
  getLog,
  createLog,
  updateLog,
  deleteLog,
  createLogEntry,
  updateLogEntry,
  deleteLogEntry
} = require('../controllers/log');

router.route('/').post(createLog).get(getAllLogs);
router.route('/:id').post(createLogEntry).get(getLog).delete(deleteLog).patch(updateLog);
router.route('/:logid/:entryid').patch(updateLogEntry).delete(deleteLogEntry);

module.exports = router;