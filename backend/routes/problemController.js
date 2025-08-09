const Problem = require("../models/ProblemSchema");

// Get all problems
const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single problem by ID
const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new problem
const createProblem = async (req, res) => {
  const { _id, title, description, difficulty, tags } = req.body;

  const newProblem = new Problem({
    _id,
    title,
    description,
    difficulty,
    // author_id,
    tags,
  });

  try {
    const savedProblem = await newProblem.save();
    console.log("Saved problem:", savedProblem); // Example console.log
    res.status(201).json(savedProblem);
  } catch (error) {
    console.error("Error saving problem:", error); // Example console.error
    res.status(400).json({ message: error.message });
  }
};

// Update an existing problem
const updateProblem = async (req, res) => {
  const { title, description, difficulty, author_id, tags } = req.body;

  try {
    const updatedProblem = await Problem.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        difficulty,
        author_id,
        tags,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!updatedProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.status(200).json(updatedProblem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a problem
const deleteProblem = async (req, res) => {
  try {
    const deletedProblem = await Problem.findByIdAndDelete(req.params.id);

    if (!deletedProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProblems: getAllProblems,
  getProblemById: getProblemById,
  createProblem: createProblem,
  updateProblem: updateProblem,
  deleteProblem: deleteProblem,
};
