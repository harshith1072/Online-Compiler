const TestCase = require("../models/TestCaseSchema");

// Get all test cases
const getAllTestCases = async (req, res) => {
  try {
    const testCases = await TestCase.find().populate("problem_id");
    res.status(200).json(testCases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single test case by ID
const getTestCaseById = async (req, res) => {
  try {
    const testCase = await TestCase.findById(req.params.id).populate(
      "problem_id"
    );
    if (!testCase) {
      return res.status(404).json({ message: "Test case not found" });
    }
    res.status(200).json(testCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new test case
const createTestCase = async (req, res) => {
  const { problem_id, input, expected_output } = req.body;

  const newTestCase = new TestCase({
    problem_id,
    input,
    expected_output,
  });

  try {
    const savedTestCase = await newTestCase.save();
    res.status(201).json(savedTestCase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing test case
const updateTestCase = async (req, res) => {
  const { problem_id, input, expected_output } = req.body;

  try {
    const updatedTestCase = await TestCase.findByIdAndUpdate(
      req.params.id,
      {
        problem_id,
        input,
        expected_output,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!updatedTestCase) {
      return res.status(404).json({ message: "Test case not found" });
    }

    res.status(200).json(updatedTestCase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a test case
const deleteTestCase = async (req, res) => {
  try {
    const deletedTestCase = await TestCase.findByIdAndDelete(req.params.id);

    if (!deletedTestCase) {
      return res.status(404).json({ message: "Test case not found" });
    }

    res.status(200).json({ message: "Test case deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTestCasesByProblemId = async (req, res) => {
  const { problemId } = req.params;

  try {
    const testCases = await TestCase.find({ problem_id: problemId }).populate(
      "problem_id"
    );
    res.status(200).json(testCases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTestCases: getAllTestCases,
  getTestCaseById: getTestCaseById,
  createTestCase: createTestCase,
  updateTestCase: updateTestCase,
  deleteTestCase: deleteTestCase,
  getTestCasesByProblemId: getTestCasesByProblemId,
};
