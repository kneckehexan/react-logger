const Log = require('../models/Log');
const { StatusCodes } = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');

const getAllLogs = async (req, res) => {
  const logs = await Log.find({createdBy: req.user.userId}).sort('date');
  if (!logs) {
    throw new NotFoundError('No logs found');
  }
  res.status(StatusCodes.OK).json({count: logs.length, logs});
}

const getLog = async (req, res) => {
  const {user: {userId}, params: {logid: logId}} = req;
  const log = await Log.findOne({
    _id: logId,
    createdBy: userId
  });

  if(!log) {
    throw new NotFoundError(`No log with id ${logId}`);
  }

  res.status(StatusCodes.OK).json({log});
}

const createLog = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const log = await Log.create(req.body);
  res.status(StatusCodes.CREATED).json({log});
}

const updateLog = async (req, res) => {
  const {
    body: {logname, logtype, logstatus},
    user: {userId},
    params: {id: logId}
  } = req;

  if(logname === '' || logtype === '' || logstatus === '' ) {
    throw new BadRequestError('Log name, log type or log status cannot be empty');
  }

  const log = await Log.findByIdAndUpdate({
    _id: logId, createdBy: userId
  },
  {
    "$set": {
      "logname": logname,
      "logtype": logtype,
      "logstatus": logstatus
    },
  },
  {new: true, runValidators: true});

  if(!log) {
    throw new NotFoundError(`No log entry with id ${logId}`);
  }

  res.status(StatusCodes.OK).json({log})
}

const deleteLog = async (req, res) => {
  const {
    body: {
      logid: logid
    },
    user: {userId}
    } = req;

  const log = await Log.findByIdAndRemove({
    _id: logid,
    createdBy: userId
  });

  if(!log) {
    throw new NotFoundError(`No log entry with id ${logId}`);
  }

  res.status(StatusCodes.OK).json({msg: 'success'});
}


module.exports = {
  getAllLogs,
  getLog,
  createLog,
  updateLog,
  deleteLog
}