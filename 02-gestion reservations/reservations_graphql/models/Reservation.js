const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  utilisateur: String,
  salle: String,
  date: String,
  heure: String
});

module.exports = mongoose.model('Reservation', reservationSchema);
