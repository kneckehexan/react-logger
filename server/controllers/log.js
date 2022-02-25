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
  //console.log('using getLog');
  //console.log(req);
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
    body: {logname, logtype, logstatus, entry},
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

  if (entry) {
    await log.entries.push({entry});
    await log.save();
  }

  res.status(StatusCodes.OK).json({log})
}

const deleteLog = async (req, res) => {
  const {user: {userId}, params: {id: logId}} = req;
  const log = await Log.findByIdAndRemove({
    _id: logId,
    createdBy: userId
  });

  if(!log) {
    throw new NotFoundError(`No log entry with id ${logId}`);
  }

  res.status(StatusCodes.OK).send();
}

const createLogEntry = async (req, res) => {
  const {params: {id: logid}} = req;
  const log = await Log.findById(logid);

  if (!log) {
    throw new NotFoundError(`No log with id ${logid}`);
  }


}

const updateLogEntry = async (req, res) => {
  const {
    body: {entry},
    user: {userId},
    params: {logid: logId, entryid: entryid}
  } = req;
}

const deleteLogEntry = async (req, res) => {

}

module.exports = {
  getAllLogs,
  getLog,
  createLog,
  updateLog,
  deleteLog,
  createLogEntry,
  updateLogEntry,
  deleteLogEntry
}