import mongoose from "mongoose";
const Schema = mongoose.Schema;

const IssueSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required!"],
    },
    description: {
      type: String,
      required: [true, "Description is Required!"],
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        ref: "User",
      },
    ],
    // open, complete,  inProgress, , onHold, closed,
    status: {
      type: String,
      required: [true, "Status is Required!"],
      default: "Open",
    },
    // low, medium, high, critical
    // or maybe numerical... 1 - 5?
    priority: {
      type: String,
      required: [true, "Priority is Required!"],
      default: "Normal",
    },
    assignedUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reportedUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    linkedIssues: [
      {
        type: Schema.Types.ObjectId,
        ref: "Issue",
      },
    ],
    watchers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

const Issue = mongoose.model("Issue", IssueSchema);
export default Issue;
