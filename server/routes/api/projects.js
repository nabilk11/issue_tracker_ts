import express from "express";
import { Router } from "express";
// import User from '../../models/User.js';
import Project from "../../models/Project.js";
import Issue from "../../models/Issue.js";

const router = Router();

// Get All Projects
router.get("/", async (req, res) => {
  try {
  
    const projects = await Project.find()
      .populate("users")
      .populate("admins")
      .populate("issues")
      .exec();

    return res.status(200).json(projects);
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});

// Get Project by ID
router.get("/:id", async (req, res) => {});

router.post("/", async (req, res) => {
  const { name, description, users, admin, issues } = req.body;

  try {
    const newProject = new Project({ name, description, users, admin, issues });
    const result = await newProject.save();
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { name, users, admin, _id, issues } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name, users, admin, issues },
      { new: true }
    );

    return res.status(200).json({ ...updatedProject._doc });
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
