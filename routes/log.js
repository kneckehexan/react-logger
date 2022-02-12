const express = require('express');
const router = express.Router();

const {getAllLogs, getLog, createLog, updateLog, deleteLog} = require('../controllers/log');

router.route('/').post(createLog).get(getAllLogs);
router.route('/:id').get(getLog).delete(deleteLog).patch(updateLog);

module.exports = router;