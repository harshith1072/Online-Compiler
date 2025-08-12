 
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Imports
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectToMongo = require("./config/connectToMongo");

// Controllers & Middleware
const userController = require("./routes/userController");
const problemController = require("./routes/problemController");
const testCaseController = require("./routes/testCaseController");
const submissionController = require("./routes/submissionController");
const requireAuth = require("./middleware/requireAuth");
const errorHandler = require("./middleware/errorHandler");
const { validateSignup, validateLogin } = require("./middleware/validationMiddleware");

// Initialize app
const app = express();

// Connect DB
connectToMongo();

// --- Middleware (Correct Order) ---
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // ✅ Correct order: Body parsers first
app.use(cookieParser()); // ✅ Cookie parser next
app.use(cors({
  origin: ["http://localhost:5173", "https://online-compiler-076b.onrender.com"],
  credentials: true
}));// ✅ CORS last, before routes

// ---------- USER ROUTES ----------
app.post("/signup", validateSignup, userController.signup);
app.post("/login", validateLogin, userController.login);
app.get("/logout", userController.logout);
app.get("/fetchuser/:id", userController.fetchUser);
app.get("/check-auth", requireAuth, userController.checkAuth);

// ---------- PROBLEM ROUTES ----------
app.get("/problems", problemController.getAllProblems);
app.get("/problems/:id", problemController.getProblemById);
app.post("/problems", problemController.createProblem);
app.put("/problems/:id", problemController.updateProblem);
app.delete("/problems/:id", problemController.deleteProblem);

// ---------- TESTCASE ROUTES ----------
app.get("/testcases", testCaseController.getAllTestCases);
app.get("/testcases/:id", testCaseController.getTestCaseById);
app.post("/testcases", testCaseController.createTestCase);
app.put("/testcases/:id", testCaseController.updateTestCase);
app.delete("/testcases/:id", testCaseController.deleteTestCase);
app.get("/byProblem/:problemId", testCaseController.getTestCasesByProblemId);

// ---------- SUBMISSION ROUTES ----------
app.get("/submissions/user", requireAuth, submissionController.getUserSubmissions);

app.get("/submissions", submissionController.getAllSubmissions);
app.get("/submissions/:id", submissionController.getSubmissionById);
app.post("/submissions", requireAuth, submissionController.createSubmission);
app.put("/submissions/:id", submissionController.updateSubmission);
app.delete("/submissions/:id", submissionController.deleteSubmission);
// Error handler
app.use(errorHandler);

// Server start
const PORT = process.env.PORT || 9000;
app.get("/", (req, res) => {
  res.json({ "backend": "online" });
});
 
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});