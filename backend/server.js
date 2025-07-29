if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectToMongo = require("./config/connectToMongo");
const router = express.Router();
const userController = require("./routes/userController");
const problemController = require("./routes/problemController");
const testCaseController = require("./routes/testCaseController");
const contestController = require("./routes/contestContoller");
const submissionController = require("./routes/submissionController");
const leaderBoardController = require("./routes/leaderBoardController");
const requireAuth = require("./middleware/requireAuth");
const errorHandler = require("./middleware/errorHandler");
const {
  validateSignup,
  validateLogin,
} = require("./middleware/validationMiddleware");

const app = express();

app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(cookieParser());
app.use(router);

app.use(
  cors({
    credentials: true,
  })
);

// Optional: log env vars for debugging
// console.log("NODE_ENV =", process.env.NODE_ENV);
// console.log("MONGO_URI =", process.env.MONGO_URI);

connectToMongo();

app.post("/signup", validateSignup, userController.signup);
app.post("/login", validateLogin, userController.login);
app.get("/logout", userController.logout);
app.get("/fetchuser/:id", userController.fetchUser);
app.get("/check-auth", requireAuth, userController.checkAuth);

router.get("/problems", problemController.getAllProblems);
router.get("/problems/:id", problemController.getProblemById);
router.post("/problems", problemController.createProblem);
router.put("/problems/:id", problemController.updateProblem);
router.delete("/problems/:id", problemController.deleteProblem);

router.get("/testcases", testCaseController.getAllTestCases);
router.get("/testcases/:id", testCaseController.getTestCaseById);
router.post("/testcases", testCaseController.createTestCase);
router.put("/testcases/:id", testCaseController.updateTestCase);
router.delete("/testcases/:id", testCaseController.deleteTestCase);
router.get("/byProblem/:problemId", testCaseController.getTestCasesByProblemId);

router.get("/contests", contestController.getAllContests);
router.get("/contests/:id", contestController.getContestById);
router.post("/contests", contestController.createContest);
router.put("/contests/:id", contestController.updateContest);
router.delete("/contests/:id", contestController.deleteContest);

router.get("/submissions", submissionController.getAllSubmissions);
router.get("/submissions/:id", submissionController.getSubmissionById);
router.post("/submissions", submissionController.createSubmission);
router.put("/submissions/:id", submissionController.updateSubmission);
router.delete("/submissions/:id", submissionController.deleteSubmission);

router.get("/leaderboard", leaderBoardController.getAllLeaderboardEntries);
router.get("/leaderboard/:id", leaderBoardController.getLeaderboardEntryById);
router.post("/leaderboard", leaderBoardController.createLeaderboardEntry);
router.put("/leaderboard/:id", leaderBoardController.updateLeaderboardEntry);
router.delete("/leaderboard/:id", leaderBoardController.deleteLeaderboardEntry);

app.use(errorHandler);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
