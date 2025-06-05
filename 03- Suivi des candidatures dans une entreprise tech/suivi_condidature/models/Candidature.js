const mongoose = require('mongoose');

const candidatureSchema = new mongoose.Schema({
  nom: String,
  email: String,
  poste: String,
  statut: String,
  commentaire: String
});

module.exports = mongoose.model('Candidature', candidatureSchema);