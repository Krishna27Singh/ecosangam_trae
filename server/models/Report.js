import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Report", reportSchema);
