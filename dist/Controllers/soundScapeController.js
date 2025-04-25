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
exports.editMixById = exports.getMixById = exports.getAllSavedMix = exports.postSoundScape = void 0;
const userModel_1 = __importDefault(require("../Models/userModel"));
const soundScapeModel_1 = __importDefault(require("../Models/soundScapeModel"));
//handing adding new mix 
const postSoundScape = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.user;
        const existingUser = yield userModel_1.default.findOne({ username });
        if (!existingUser) {
            return res.status(404).send('User not found');
        }
        const { name, sounds } = req.body;
        //creating new mix and saving
        const newMix = new soundScapeModel_1.default({
            user: existingUser === null || existingUser === void 0 ? void 0 : existingUser._id, name, sounds
        });
        yield newMix.save();
        return res.status(201).send({ message: "Mix saved successfully", mix: newMix });
    }
    catch (error) {
        console.error('❌ Error in postSoundScape:', error);
        return res.status(500).send({ message: 'Internal server error' });
    }
});
exports.postSoundScape = postSoundScape;
//retreive all saved mix for a particular user
const getAllSavedMix = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.user;
        const existingUser = yield userModel_1.default.findOne({ username });
        if (!existingUser) {
            return res.status(404).send('User not found');
        }
        const allSavedMix = yield soundScapeModel_1.default.find({ user: existingUser._id });
        return res.status(200).send(allSavedMix);
    }
    catch (error) {
        console.error('❌ Error in getAllSavedMix:', error);
        return res.status(500).send({ message: 'Internal server error' });
    }
});
exports.getAllSavedMix = getAllSavedMix;
//retreiving a single mix by its id
const getMixById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingMix = yield soundScapeModel_1.default.findById(id);
        if (!existingMix) {
            return res.status(404).send({ message: 'Mix not found' });
        }
        return res.status(200).send(existingMix);
    }
    catch (error) {
        console.error('❌ Error in getMixById:', error);
        return res.status(500).send({ message: 'Internal server error' });
    }
});
exports.getMixById = getMixById;
//handing edit a mix by id
const editMixById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, sounds } = req.body;
        const updatedMix = yield soundScapeModel_1.default.findByIdAndUpdate(id, { name, sounds }, { new: true });
        if (!updatedMix) {
            return res.status(404).send({ message: 'Mix not found' });
        }
        return res.status(200).send(updatedMix);
    }
    catch (error) {
        console.error('❌ Error in editMixById:', error);
        return res.status(500).send({ message: 'Internal server error' });
    }
});
exports.editMixById = editMixById;
