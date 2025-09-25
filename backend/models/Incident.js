const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'onhold' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Incident', incidentSchema);
