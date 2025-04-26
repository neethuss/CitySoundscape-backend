import User from "../Models/userModel";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../Utils/passwordutils";
import { generateAccessToken } from "../Utils/jwtUtils";

//handles user signup
export const postSignup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    //check if the user is already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send({ message: "User already exists with this username" });
    }

    //hashing password before saving
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username: username.toLowerCase().trim(),
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).send({ message: "Signup successful", user: newUser });
  } catch (error) {
    console.error("❌ Signup error:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};


//handles login
export const postLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    //checking user already exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(404).send({ message: "User not found with this username" });
    }

    //comparing password from the req body and hashed password
    const isPasswordMatch = await comparePassword(password, existingUser.password);
    if (!isPasswordMatch) {
      return res.status(401).send({ message: "Password does not match" });
    }

    //generate access token for authentication purpose
    const accessToken = await generateAccessToken({ username: existingUser.username });
    //set token in secure http-only cookie
    res.cookie("userRefreshToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1 * 60 * 60 * 1000,
    });

    return res.status(200).send({
      message: "Authentication verified",
      user: existingUser,
      accessToken
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

