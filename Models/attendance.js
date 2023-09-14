const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  workArea: {
    type: String,
    required: true
  },
  selfie: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Attendance', attendanceSchema);