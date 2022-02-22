const Logentry = require('../models/LogEntry');
const { StatusCodes } = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');

const getAllLogEntries = async (req, res) => {
  const {user: {userId}} = req;
  const logentries = await Logentry.find({})
}