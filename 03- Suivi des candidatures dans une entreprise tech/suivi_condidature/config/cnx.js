const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/candidatureDB');
    console.log('Connecté à MongoDB');
  } catch (err) {
    console.error('Erreur de connexion MongoDB :', err);
    process.exit(1);
  }
};

module.exports = connectDB;