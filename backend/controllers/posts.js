import Post from "../models/Post.js";
import User from "../models/User.js";

// create
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const post = await Post.find(); //select all posts in the database

    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({
      error: err.message,
    });
  }
};

// READ

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find(); //select all posts in the database
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({
      error: err.message,
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId: userId }); //get All posts for this relevent User

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({
      error: err.message,
    });
  }
};

// UPDATE
export const likePost = async (req, res) => {
  try {
    console.log(`like Post controller req params: ${req.params}`);
    console.log(`like Post controller req body: ${req.body}`);

    const { id } = req.params; //postId
    const { userId } = req.body; //userId

    const post = await Post.findById(id); //get post details using PostId
    const isLiked = post.likes.get(userId); //checked whether currentUser previosly liked or not

    if (isLiked) {
      post.likes.delete(userId); //if user has already liked this post, then remove the like if user clicks again the like button
    } else {
      post.likes.set(userId, true);
    }
    const updatePost = await Post.findByIdAndUpdate(
      id,
      {
        likes: post.likes,
      },
      { new: true } //when NEW is True, findByIdAndUpdate return the new Updated Post object after the update, If it is false, then return the original object before the UPDATE
      
    ); //update the likes MAP of the specific post and save it in the Database

    res.status(200).json(updatePost); //then return the updated post

  } catch (err) {
    res.status(404).json({
      error: err.message,
    });
  }
};
