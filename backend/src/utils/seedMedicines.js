require('dotenv').config();
const mongoose = require('mongoose');
const Medicine = require('../models/Medicine');
const connectDB = require('../config/db');

const initialMedicines = [
  { name: 'Dolo 650mg', price: 30, packing: '15 T', batchNo: 'DL-9921', exp: '10/26', description: 'Paracetamol 650mg tablet', stock: 100 },
  { name: 'Calpol 500mg', price: 15, packing: '15 T', batchNo: 'CL-8871', exp: '08/25', description: 'Paracetamol 500mg tablet', stock: 100 },
  { name: 'Azithral 500mg', price: 120, packing: '5 T', batchNo: 'AZ-1102', exp: '11/26', description: 'Azithromycin tablet', stock: 50 },
  { name: 'Pantocid DSR', price: 140, packing: '10 T', batchNo: 'PT-3321', exp: '05/27', description: 'Pantoprazole and Domperidone', stock: 60 },
  { name: 'Allegra 120mg', price: 180, packing: '10 T', batchNo: 'AL-5544', exp: '01/26', description: 'Fexofenadine tablet', stock: 80 },
  { name: 'Augmentin 625 Duo', price: 200, packing: '10 T', batchNo: 'AU-7765', exp: '09/25', description: 'Amoxicillin and Potassium Clavulanate', stock: 40 },
  { name: 'Crocine Advance', price: 20, packing: '15 T', batchNo: 'CR-1122', exp: '12/26', description: 'Paracetamol fast absorption', stock: 200 },
  { name: 'Volini Gel 30g', price: 100, packing: '1 Tube', batchNo: 'VO-9988', exp: '04/26', description: 'Pain relief gel', stock: 25 },
  { name: 'Benadryl Cough Syrup 150ml', price: 110, packing: '1 Btl', batchNo: 'BN-4433', exp: '07/26', description: 'Diphenhydramine syrup', stock: 50 },
  { name: 'ORS Powder', price: 25, packing: '1 Pkt', batchNo: 'OR-5566', exp: '03/27', description: 'Oral Rehydration Salts', stock: 150 },
];

const seedMedicines = async () => {
  try {
    const conn = await connectDB();
    if (!conn) {
      console.log('Cannot seed: MONGO_URI missing.');
      process.exit(1);
    }
    
    console.log('Clearing old medicines...');
    await Medicine.deleteMany();
    
    console.log('Inserting initial Indian medicines dataset...');
    await Medicine.insertMany(initialMedicines);
    
    console.log('Medicine Seeding Completed Successfully! 🌱');
    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
}

seedMedicines();
