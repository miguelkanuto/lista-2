import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  finished: { type: Boolean, default: false },
  person: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

export default mongoose.model("Task", taskSchema);
