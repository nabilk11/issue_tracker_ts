import React, { FC, useState, useEffect } from "react";
import IssueTable from "../components/IssueTable/IssueTable";
import axios from "axios";

const Issues: FC = () => {
  const [issues, setIssues] = useState<any[]>([]);

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
      <IssueTable issues={issues} />
    </div>
  );
};

export default Issues;
