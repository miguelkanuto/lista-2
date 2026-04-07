import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  occupation: { type: String },
  phone: { type: String },
  person: { type: mongoose.Schema.Types.ObjectId, ref: "Person", unique: true },
});

export default mongoose.model("Profile", profileSchema);
