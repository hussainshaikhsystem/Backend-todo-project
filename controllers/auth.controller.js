import { usermodel } from "../models/user.model.js";
import bcrypt from "bcryptjs";


import { asynchandler } from "../middlewares/asynchandler.js";
import jwt from "jsonwebtoken";

export const signupuser = asynchandler(async (req, res) => {
  const { username, email, password } = req.body;
  const exist = await usermodel.findOne({ email });
  if (exist) {
    return res
      .status(400)
      .json({ message: "user already exist with this email" });
  }
  const hashedpass = await bcrypt.hash(password, 10);
  await usermodel.create({ username, email, password: hashedpass });
  res.status(201).json({ message: "user created successfully" });
});
export const loginuser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await usermodel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "user not found with this email" });
  }
  const ismatch = await bcrypt.compare(password, user.password);
  if (!ismatch) {
    return res.status(400).json({ message: "invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ message: "user logged in succesfully", token });
  console.log("SIGNING WITH:", process.env.SECRET_KEY);
});
