const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
 
  tags: {
    type: [String],
  },
});

module.exports = mongoose.model("Problem", ProblemSchema);




// const mongoose = require("mongoose");

// const ProblemSchema = new mongoose.Schema({
 
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   difficulty: {
//     type: String,
//     enum: ["easy", "medium", "hard"],
//     required: true,
//   },
//   created_at: {
//     type: Date,
//     default: Date.now,
//   },
//   updated_at: {
//     type: Date,
//     default: Date.now,
//   },
//   tags: {
//     type: [String],
//   },
// });

// module.exports = mongoose.model("Problem", ProblemSchema);
