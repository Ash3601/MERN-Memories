import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creatorId: String, // since this is going to be an id
  creatorName: String, // thus we have to specify a name property
  tags: [String],
  selectedFiles: String,
  likes: {
    type: [String], // array of ids
    default: [],
  },
  createdAt: { type: Date, default: new Date() },
});

const PostMessage = mongoose.model("PostMessage", postSchema);
export default PostMessage;
