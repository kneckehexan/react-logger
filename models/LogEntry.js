const mongoose = require('mongoose');

const LogEntrySchema = new mongoose.Schema({
  name: {
    type: mongoose.Types.ObjectId,
    ref: 'Log',
    required: [true, 'Please provide a main log for this entry']
  },
  entry: {
    type: String,
    maxlenlength: 500,
    minlength: 1
  }
}, {timestamps: true});

module.exports = mongoose.model('LogEntry', LogEntrySchema);