"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = exports.postSignup = void 0;
const userModel_1 = __importDefault(require("../Models/userModel"));
const passwordutils_1 = require("../Utils/passwordutils");
const jwtUtils_1 = require("../Utils/jwtUtils");
//handles user signup
const postSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        //check if the user is already exists
        const existingUser = yield userModel_1.default.findOne({ username });
        if (existingUser) {
            return res.status(409).send({ message: "User already exists with this username" });
        }
        //hashing password before saving
        const hashedPassword = yield (0, passwordutils_1.hashPassword)(password);
        const newUser = new userModel_1.default({
            username: username.toLowerCase().trim(),
            password: hashedPassword,
        });
        yield newUser.save();
        return res.status(201).send({ message: "Signup successful", user: newUser });
    }
    catch (error) {
        console.error("❌ Signup error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});
exports.postSignup = postSignup;
//handles login
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        //checking user already exists
        const existingUser = yield userModel_1.default.findOne({ username });
        if (!existingUser) {
            return res.status(404).send({ message: "User not found with this username" });
        }
        //comparing password from the req body and hashed password
        const isPasswordMatch = yield (0, passwordutils_1.comparePassword)(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(401).send({ message: "Password does not match" });
        }
        //generate access token for authentication purpose
        const accessToken = yield (0, jwtUtils_1.generateAccessToken)({ username: existingUser.username });
        console.log(accessToken, 'token');
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
    }
    catch (error) {
        console.error("❌ Login error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});
exports.postLogin = postLogin;
