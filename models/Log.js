const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  assignment: {
    type: String,
    required: [true, 'Please provide an assignment/job onto which the LOG entry should be attached'],
    maxlength: 50
  },
  assignmentStatus: {
    type: String,
    enum: ['Ej påbörjat', 'Pågående', 'Avslutat'],
    default: 'Ej påbörjat'
  },
  entry: {
    type: String,
    required: [true, 'En entry must be provided, max 500 characters'],
    maxlength: 500,
    minlength: 1
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date for the LOG entry'],
    default: () => Date.now()
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  }
}, {timestamps: true})

module.exports = mongoose.model('Job', JobSchema);