const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String },
  stock: { type: Number, default: 0 },
  packing: { type: String, default: '10 T' },
  batchNo: { type: String, default: 'NA' },
  exp: { type: String, default: '12/25' }
});

module.exports = mongoose.model('Medicine', medicineSchema);
