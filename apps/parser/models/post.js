import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, index: { unique: true } },
    text: { type: String, required: true, default: "" },
    groupId: { type: mongoose.Types.ObjectId, required: true },
    author: { type: String, default: "" },
    availableBeds: { type: Number },
    totalBeds: { type: Number },
    baths: { type: Number },
    flagged: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
    amenities: { type: [String], default: [] },
    description: { type: String, default: "" },
    title: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    images: { type: [String], default: [] },
    ppp: { type: Number, default: null },
    fbLink: { type: String, default: "" },
    genderRestriction: {
      type: String,
      default: "coed",
      enum: ["coed", "male", "female"],
    },
    type: { type: String, enum: ["entireRentalUnit", "sharedRentalUnit"] },
    isAvailable: { type: Boolean, default: true },
    building: {
      type: String,
      default: "other",
      enum: ["other", "icon", "rezOne"],
    },
  },
  { collection: "Post" }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
