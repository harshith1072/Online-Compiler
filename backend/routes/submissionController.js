const Submission = require("../models/SubmissionSchema");

// Get all submissions
exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().populate("user_id problem_id");
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single submission by ID
exports.getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id).populate(
      "user_id problem_id"
    );
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new submission
// exports.createSubmission = async (req, res) => {
//   const { user_id, problem_id, submission_code, language, status, result } =
//     req.body;

//   const newSubmission = new Submission({
//     user_id,
//     problem_id,
//     submission_code,
//     language,
//     status,
//     result,
//   });

//   try {
//     const savedSubmission = await newSubmission.save();
//     res.status(201).json(savedSubmission);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// exports.createSubmission = async (req, res) => {
//   try {
//     const { problem_id, submission_code, language, status, result } = req.body;

//     const newSubmission = new Submission({
//       user_id: req.user._id, // ✅ taken from JWT, not body
//       problem_id,
//       submission_code,
//       language,
//       status,
//       result,
//     });
// console.log("hello");
//     const savedSubmission = await newSubmission.save();
//     res.status(201).json(savedSubmission);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
exports.createSubmission = async (req, res) => {
  try {
    const { problem_id, submission_code, language, status, result } = req.body;
    console.log("Received submission payload:", req.body); // Check what's coming from the frontend

    const newSubmission = new Submission({
      user_id: req.user._id,
      problem_id,
      submission_code,
      language,
      status,
      result,
    });

    const savedSubmission = await newSubmission.save();
    res.status(201).json(savedSubmission);
  } catch (error) {
    
    console.error("Mongoose Validation Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};












// Update an existing submission
exports.updateSubmission = async (req, res) => {
  const { user_id, problem_id, submission_code, language, status, result } =
    req.body;

  try {
    const updatedSubmission = await Submission.findByIdAndUpdate(
      req.params.id,
      {
        user_id,
        problem_id,
        submission_code,
        language,
        status,
        result,
        submission_time: Date.now(),
      },
      { new: true }
    );

    if (!updatedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json(updatedSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a submission
exports.deleteSubmission = async (req, res) => {
  try {
    const deletedSubmission = await Submission.findByIdAndDelete(req.params.id);

    if (!deletedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
