import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
});

export default mongoose.model("Person", personSchema);
