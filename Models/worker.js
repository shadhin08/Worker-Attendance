const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workerSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  contact: {
    type: Number
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Worker', workerSchema);