 

const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  problem_id: {
    type: mongoose.Schema.Types.Mixed, // Accepts ObjectId or Number
    ref: "Problem",
    required: true,
  },
  submission_code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["submitted", "in queue", "processing", "accepted", "rejected"],
    default: "submitted",
  },
  submission_time: {
    type: Date,
    default: Date.now,
  },
  result: {
    type: String,
  },
});

module.exports = mongoose.model("Submission", SubmissionSchema);
