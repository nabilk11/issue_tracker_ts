import express from "express";
const router = express.Router();

import Issue from "../../models/Issue.js";
import Project from "../../models/Project.js";
import User from "../../models/User.js";

// Get All Issues
// router.get("/", async (req, res) => {
//   try {
//     const issues = await Issue.find()
//       // where(user).
//       // eq(req.user._id).
//       // populate('users\
//       // ').
//       .populate("project")
//       .exec();
//     return res.status(200).json(issues);
//   } catch (err) {
//     console.log(`${err}`);
//     return res.status(500).json({ error: err.message }); // need to change status 500 (Internal Server Error) to 400 (Bad Request)
//   }
// });

// GET ALL ISSUES 2
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find().populate("project").exec();
    return res.status(200).json(issues);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Get Issue by ID
router.get("/:id", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    return res.status(200).json(issue);
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});

// Get User's Assigned Issues
router.get("/:user_id/assignedIssues", async (req, res) => {
  const { user_id } = req.params;
  try {
    const assignedIssues = await Issue.where("assignedUser").equals(user_id);
    return res.status(200).json(assignedIssues);
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});

// Get User's Reported Issues
router.get("/:user_id/reportedIssues", async (req, res) => {
  const { user_id } = req.params;
  try {
    const reportedIssues = await Issue.where("reportedUser").equals(user_id);
    return res.status(200).json(reportedIssues);
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});


// Create Issue
router.post("/", async (req, res) => {
  const { description, project, title, reportedUser, assignedUser } =
    req.body;
  try {
    const newIssue = new Issue({
      title,
      description,
      project,
      reportedUser,
      assignedUser,
    });
    const result = await newIssue.save();
    const projResult = await Project.findById(project);
    projResult.issues.push(result._id);
    await projResult.save();
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
