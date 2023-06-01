import express from 'express';
const router = express.Router();

import Issue from "../../models/Issue.js";
import Project from '../../models/Project.js';
import User from '../../models/User.js';
// Get All Issues
router.get('/', async (req, res) => {
  try {
    
    const issues = 
      await Issue.find().
      // where(user).
      // eq(req.user._id).
      // populate('users\
      // ').
      // populate('project').
      exec();
      return res.status(200).json(issues);
  } catch (err) {
    console.log(`${err}`);
      return res.status(500).json({ error: err.message });
  }
});

// Get Issue by ID
router.get('/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    return res.status(200).json(issue);
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});

// Create Issue
router.post('/', async (req, res) => {
  const { description, issue, project, title } = req.body;

  try {
    const newIssue = new Issue({ title, description, issue, project });
    const result = await newIssue.save();
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }

});

export default router;