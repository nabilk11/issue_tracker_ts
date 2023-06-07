import React, { useState, ChangeEvent, useEffect, FC, FormEvent } from "react";
import axios from "axios";

// THESE TYPES WILL NEED TO BE FIXED - INTERFACES??
type project = {
  name: string;
  _id: string;
};

type setProject = {
  name: string;
};

export const AddIssueForm: FC = () => {
  // GET CURRENT USER's ID - Might put inside a useEffect Hook
  const loggedInUser = localStorage.getItem("currentUser");
  const reportingUser = JSON.parse(loggedInUser);

  // CREATE ISSUE FORMDATA
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    status: "Open",
    reportedUser: reportingUser._id, //logged in user's id
    project: "",
  });

  // ALL EXISTING PROJECTS ARRAY
  const [projects, setProjects] = useState<project[]>([]);

  // PROJECT FIELD SHO/ HIDE STATE
  const [showOption, setShowOption] = useState(false);

  // HANDLE CHANGE
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // HANDLE FORM SUBMIT
  // If NEW project is chosen, handler will make 2 calls (1 to create project, 1 to create issue)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  // FETCHING THE CURRENTLY EXISTING PROJECTS VIA useEffect HOOK
  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await axios.get("http://localhost:8000/api/projects", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setProjects(res.data);
    } catch (err) {
      console.log(err);
      // need to add toast message for error
    }
  }

  return (
    <div className="issue-form-container">
      <h2>Add New Issue</h2>
      <form action="">
        <label htmlFor="project">Which project is this issue part of?</label>
        <select id="project" name="project">
          {projects.map((proj) => (
            <option key={proj._id} value={formData.project}>
              {proj.name}
            </option>
          ))}
          <option value="new">New Project</option>
        </select>
        {showOption && (
          <>
            <input
              className="input"
              id="project"
              value={formData.project}
              type="text"
              // onChange={(e) => setProject(e.target.value)} -- NOT NEEDED
              onChange={handleChange}
              placeholder="Enter New Project"
              required
            />
          </>
        )}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Issue Title"
        />
        <textarea
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
          name="description"
        />
        <select id="priority">
          <option value="low">Low</option>
          <option selected value="medium">
            Medium
          </option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
        <button onSubmit={handleSubmit} type="submit">
          Add Issue
        </button>
      </form>
    </div>
  );
};
