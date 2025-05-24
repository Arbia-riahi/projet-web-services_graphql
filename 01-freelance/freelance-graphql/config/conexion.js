const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/freelanceDB')
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur MongoDB :', err));
