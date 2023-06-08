import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard: FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [issues, setIssues] = useState<any[]>([]);

  useEffect(() => {
    getProjects();
    getIssues();
  }, []);

  const getProjects = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/projects", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setProjects(res.data);
      console.log("Projects");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getIssues = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/issues", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setIssues(res.data);
      console.log("Issues");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard-container">
      This is Da Dashboard Container
      <div className="my-issues"> My Issues </div>
      <ul>
        {issues.map((issue) => (
          <div key={issue._id} className="issueContainer">
            <Link
              to={`/issues/${issue._id}`}
              style={{ textDecoration: "none" }}
              className="issue-link"
            >
              {" "}
              {issue.title}
            </Link>
          </div>
        ))}
      </ul>
      <div className="my-projects">
        {" "}
        Projects
        <ul>
          {projects.map((project) => (
            <div key={project._id} className="projectContainer">
              <Link
                to={`/projects/${project._id}`}
                style={{ textDecoration: "none" }}
                className="project-link"
              >
                {project.name}{" "}
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
