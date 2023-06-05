import React, { FC } from "react";
import "./issueTable.css";

const IssueTable: FC = ({ issues }) => {
  return (
    <div className="issues-table">
      {/* <p>{issues[0]}</p> */}
      <table className="all-issues">
        <thead className="table-head">
          <tr>
            <th>Issue</th>
            <th>ID #</th>
            <th>Project</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Created At</th>
            <th>Created By</th>
            <th>Assigned To</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {issues.map((issue) => (
            <tr key={issue._id}>
              <td>{issue.title}</td>
              <td>{issue._id}</td>
              {/* REMOVE TERNARY ONCE WE FIX DB AND WORKFLOW */}
              {issue.project ? (
                <td>{issue.project?.name}</td>
              ) : (
                <td>Project XXX</td>
              )}
              <td>{issue.status}</td>
              <td>{issue.priority}</td>
              <td>{issue.createdAt}</td>
              <td>{issue.reportedUser}</td>
              <td>{issue.assignedUser}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueTable;
