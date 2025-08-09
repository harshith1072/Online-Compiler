const mongoose = require("mongoose");

const TestCaseSchema = new mongoose.Schema({
  problem_id: {
     
    type: Number,
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  expected_output: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TestCase", TestCaseSchema);
