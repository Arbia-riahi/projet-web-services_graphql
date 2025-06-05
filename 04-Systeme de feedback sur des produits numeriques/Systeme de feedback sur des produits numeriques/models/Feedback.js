const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  utilisateur: { type: String, required: true },
  produit: { type: String, required: true },
  note: { type: Number, min: 1, max: 5, required: true },
  commentaire: { type: String, required: true },
  dateSoumission: { type: String, required: true },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
