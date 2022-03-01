const express = require('express');
const router = express.Router();

const {
  getAllLogs,
  getLog,
  createLog,
  updateLog,
  deleteLog,
} = require('../controllers/log');

router.route('/').post(createLog).get(getAllLogs).delete(deleteLog).patch(updateLog);
router.route('/:logid').get(getLog);

module.exports = router;