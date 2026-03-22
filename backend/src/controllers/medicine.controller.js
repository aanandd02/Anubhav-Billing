const mongoose = require('mongoose');
const Medicine = require('../models/Medicine');

// @desc    Get all medicines (with optional search query)
// @route   GET /api/medicines/search
// @access  Private (Needs Authentication)
const searchMedicines = async (req, res) => {
  try {
    const { q } = req.query;
    let query = {};

    if (q) {
      // Fuzzy search on medicine name
      query.name = { $regex: q, $options: 'i' };
    }

    // Limit to 20 results for performance
    const medicines = await Medicine.find(query).limit(20);
    res.status(200).json(medicines);
  } catch (error) {
    console.error('Error in searchMedicines:', error);
    res.status(500).json({ error: 'Server Error searching medicines' });
  }
};

// @desc    Add a new medicine to inventory
// @route   POST /api/medicines
// @access  Private
const addMedicine = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    
    // Check if exists
    const existing = await Medicine.findOne({ name });
    if (existing) {
      return res.status(400).json({ error: 'Medicine already exists' });
    }

    const newMedicine = await Medicine.create({ name, price, description, stock });
    res.status(201).json(newMedicine);
  } catch (error) {
    console.error('Error in addMedicine:', error);
    res.status(500).json({ error: 'Server Error adding medicine' });
  }
};

module.exports = {
  searchMedicines,
  addMedicine
};
