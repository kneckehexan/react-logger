const Log = require('../models/Log');
const { StatusCodes } = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');

const createLogEntry = async (req, res) => {
  const {
    body: {
      entry: entry,
      logid: logid
    },
    user: {userId}} = req;

  if (!entry) {
    throw new BadRequestError('Entry cannot be empty');
  }

  const log = await Log.findOneAndUpdate({
      _id: logid,
      createdBy: userId
    }, {
      $push : {
        "entries": {
          entry: entry
        }
      }
     }, {new: true});

  if (!log) {
    throw new NotFoundError(`No log with id ${logid}`);
  }

  await Log.findById(logid).select({"entries": {"$slice": -1}}).exec((err, doc) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.NOT_FOUND).json({error: err});
    }
    return res.status(StatusCodes.CREATED).json(doc.entries[0])
  });
}

const updateLogEntry = async (req, res) => {
  const {
    body: {
      entry: entry,
      logid: logId,
      entryid: entryId
    },
    user: {userId}
  } = req;

  const logEntry = await Log.findOneAndUpdate({_id: logId, "entries._id": entryId}, {"$set": {"entries.$.entry": entry}}, {new: true});

  if (!logEntry) {
    throw new NotFoundError(`No log with id ${logId}`);
  }

  return res.status(StatusCodes.OK).json({msg: 'sucess!'});
}

const deleteLogEntry = async (req, res) => {
  const {logid, entryid} = req.body;
  const log = await Log.findOneAndUpdate(
    {_id: logid},
    { $pull : {entries: {_id: entryid}}},
    {safe: true, multi: false}
  );

  if (!log) throw new NotFoundError(`Log with id ${logid} or entry with id ${entryid} not found`);

  res.status(StatusCodes.OK).json({msg: 'sucess'});
}

module.exports = {
  createLogEntry,
  updateLogEntry,
  deleteLogEntry
}