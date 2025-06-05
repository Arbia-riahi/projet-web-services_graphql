const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/feedbacksDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Connexion à MongoDB réussie");
  } catch (err) {
    console.error(" Erreur de connexion à MongoDB:", err.message);
  }
};

module.exports = connectDB;
