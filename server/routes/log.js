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
router.route('/:logid').get(getLog).delete(deleteLog).patch(updateLog);

module.exports = router;