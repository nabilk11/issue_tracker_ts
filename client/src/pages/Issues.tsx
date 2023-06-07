import React, { FC, useState, useEffect } from "react";
import IssueTable from "../components/IssueTable/IssueTable";
import axios from "axios";
import { AddIssueForm } from "../components/AddIssueForm/AddIssueForm";

type Issue = {
  title: string;
  description: string;
  status: string;
  priority: string;
  project: string;
};

const Issues: FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    fetchAllIssues();
  }, []);

  const fetchAllIssues = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/issues", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setIssues(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="issues-container">
      <header className="issues-header">
        <h2 className="header-text">All Issues</h2>
      </header>
      <div className="issues-table-container">
        <IssueTable issues={issues} />
      </div>
      <div className="add-issue-container">
        <AddIssueForm />
      </div>
    </div>
  );
};

export default Issues;
