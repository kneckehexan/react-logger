const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  logname: {
    type: String,
    required: [true, 'Please provide an assignment/job onto which the LOG entry should be attached'],
    maxlength: 50
  },
  logtype : {
    type: String,
    enum: ['Uppdrag', 'Övrigt', 'Personlig']
  },
  logstatus: {
    type: String,
    enum: ['Ej påbörjat', 'Pågående', 'Avslutat'],
    default: 'Ej påbörjat'
  },
  entries: [{
    type: new mongoose.Schema({
      entry: {
        type: String,
        maxlength: 500
      }
    }, {timestamps: true})
  }],
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  }
}, {timestamps: true})

module.exports = mongoose.model('Log', LogSchema);