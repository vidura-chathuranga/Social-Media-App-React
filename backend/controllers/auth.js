import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register User
export const register = async (req, res) => {
  console.log(req.body);
  try {
    const {
      firtName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    //generate random encryption
    const salt = await bcrypt.genSalt();
    const passwordHashed = bcrypt.hash(password, salt);

    //create newUser using newHashedPassword
    const newUser = new User({
      firtName,
      lastName,
      email,
      passwordHashed,
      picturePath,
      friends,
      location,
      occupation,
      viewdProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    //saved new user details in the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// USER LOGIN

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email:email});

    if(!user) return res.status(400).json({message:"User Does not Found"});

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return res.status(400).json({ message : "Invalid Password" });

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

    delete user.password; 
    
    res.status(200).json({token, user});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
