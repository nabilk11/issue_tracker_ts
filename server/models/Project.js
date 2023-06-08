import mongoose from "mongoose";
// import User from '../models/User.js';
// import Project from '../models/Project.js';

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is Required!"],
    unique: true,
  },

  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Issue",
    },
  ],

  description: {
    type: String,
  }
  // users: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
  // admins: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
});

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
