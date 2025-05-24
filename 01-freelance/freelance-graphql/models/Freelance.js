
const mongoose = require('mongoose');

const freelanceSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  competences: [String],
  liensPro: [String]
});

module.exports = mongoose.model('Freelance', freelanceSchema);
