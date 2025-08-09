const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;  

const connectToMongo = async () => {
  try {
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    await mongoose.connect(mongoURI, {});
    console.log("Connected to MongoDB Successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToMongo;
