const Log = require('../models/Log');
const { StatusCodes } = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');

const getAllLogs = async (req, res) => {
  const logs = await Log.find({createdBy: req.user.userId}).sort('date');
  res.status(StatusCodes.OK).json({count: logs.length, logs});
}

const getLog = async (req, res) => {
  const {user: {userId}, params: {id: logId}} = req;
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
    body: {assignment, entry, assignmentStatus, date},
    user: {userId},
    params: {id: logId}
  } = req;

  if(assignment === '' || entry === '' || date === '' || assignmentStatus === '') {
    throw new BadRequestError('Assignment, log entry or date cannot be empty');
  }

  const log = await Log.findByIdAndUpdate({
    _id: logId, createdBy: userId
  },
  req.body,
  {new: true, runValidators: true});

  if(!log) {
    throw new NotFoundError(`No log entry with id ${logId}`);
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

module.exports = {
  getAllLogs,
  getLog,
  createLog,
  updateLog,
  deleteLog
}