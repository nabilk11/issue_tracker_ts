import React, { useState, ChangeEvent, useEffect, FC, FormEvent } from "react";
import axios from "axios";

// THESE TYPES WILL NEED TO BE FIXED - INTERFACES??
type project = {
  name: string;
  _id: string;
};

export const AddIssueForm: FC = () => {
  // GET CURRENT USER's ID - Might put inside a useEffect Hook
  const loggedInUserString = localStorage.getItem("currentUser");
  const reportingUser = JSON.parse(loggedInUserString);

  // CREATE ISSUE FORMDATA
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    newProject: false,
    status: "Open",
    reportedUser: reportingUser._id, //logged in user's id
    project: "",
  });

  // ALL EXISTING PROJECTS ARRAY
  const [projects, setProjects] = useState<project[]>([]);

  // NEW PROJECT STATE
  const [newProject, setNewProject] = useState<unknown>("");
  const [selectedProject, selectProject] = useState<unknown>("");

  // PROJECT FIELD SHO/ HIDE STATE
  const [showOption, setShowOption] = useState(false);

  // HANDLE CHANGE
  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // HANDLE FORM SUBMIT
  // If NEW project is chosen, handler will make 2 calls (1 to create project, 1 to create issue)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/issues/",
        formData
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // FETCHING THE CURRENTLY EXISTING PROJECTS VIA useEffect HOOK
  useEffect(() => {
    fetchProjects()
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
      <form onSubmit={handleSubmit} action="">
        <label htmlFor="project">Which project is this issue part of?</label>
        <select
          id="project"
          name="project"
          onChange={(e) => {
            setNewProject(e.target.value);
            
            handleChange(e);
            if (e.target.value == "new") {
              setShowOption(true);
              setFormData({ ...formData, newProject: true });
            }
            else setShowOption(false);
          }}
        >
          <option value="">  --Choose a project--  </option>
          {projects.map((proj) => (
            <option id={proj._id} value={proj.name}>
              {proj.name}
            </option>
          ))}
          <option value="new">New Project</option>
        </select>
        {showOption && (
          <input
            className="issue-form-input"
            id="project"
            value={formData.project}
            type="text"
            onChange={handleChange}
            placeholder="Enter New Project"
            required
            name="project"
          ></input>
        )}
        <input
          type="text"
          className="issue-form-input"
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
        <select name="priority" onChange={handleChange} id="priority">
          <option name="priority" value="low">
            Low
          </option>
          <option name="priority" value="medium">
            Medium
          </option>
          <option name="priority" value="high">
            High
          </option>
          <option name="priority" value="critical">
            Critical
          </option>
        </select>
        <button type="submit">Add Issue</button>
      </form>
    </div>
  );
};
