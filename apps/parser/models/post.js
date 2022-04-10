import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  id: { type: String, required: true, index: { unique: true } },
  text: { type: String, required: true },
  groupId: { type: mongoose.Types.ObjectId, required: true },
  author: { type: String },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  flagged: { type: Boolean, default: false },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
