import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    commentingUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

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
    comments: [commentSchema],

    status: {
      type: String,
      required: [true, "Status is Required!"],
      default: "Open",
    },

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
