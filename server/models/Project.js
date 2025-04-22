// server/models/Project.js
const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  color: {
    type: String,
    default: '#3498db'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('project', ProjectSchema);