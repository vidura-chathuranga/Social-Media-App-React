import mongoose from "mongoose";

const postShema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicture: String,
    likes: {
      type: Map,//like type is MAP and type of Boolean it stores
      of: Boolean,
    }, //we store likes in a map, because it more efficient than an array
    comments: {
      type: Array,
      default: [],
    },
  },
  { timeStamp: true }
);

const Post = mongoose.model("Post",postShema);

export default Post;