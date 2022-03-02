const express = require('express');
const router = express.Router();

const {
  getAllLogs,
  createLog,
  updateLog,
  deleteLog,
} = require('../controllers/log');

router.route('/').post(createLog).get(getAllLogs).patch(updateLog);
router.route('/:logid').delete(deleteLog);

module.exports = router;