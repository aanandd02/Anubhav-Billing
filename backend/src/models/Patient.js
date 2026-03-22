const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: false },
  age: { type: Number, required: false },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: false },
  address: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Patient', patientSchema);
