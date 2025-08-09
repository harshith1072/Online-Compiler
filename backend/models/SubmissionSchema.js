const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  problem_id: {
    type: mongoose.Schema.Types.ObjectId,
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
    compile_status: {
      type: String,
    },
    test_cases_passed: {
      type: Number,
    },
    total_test_cases: {
      type: Number,
    },
    execution_time: {
      type: Number, // in seconds
    },
    memory_used: {
      type: Number, // in KB or MB
    },
  },
});

module.exports = mongoose.model("Submission", SubmissionSchema);
