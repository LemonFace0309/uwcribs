import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, index: { unique: true } },
    name: { type: String },
  },
  { collection: "Group" }
);

const Group = mongoose.model("Group", GroupSchema);

export default Group;
