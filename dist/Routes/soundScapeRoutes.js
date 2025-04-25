"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticationMiddleware_1 = __importDefault(require("../Middlewares/authenticationMiddleware"));
const SoundScapeController = require('../Controllers/soundScapeController');
const router = (0, express_1.Router)();
router.post('/', authenticationMiddleware_1.default, SoundScapeController.postSoundScape);
router.get('/', authenticationMiddleware_1.default, SoundScapeController.getAllSavedMix);
router.get('/:id', authenticationMiddleware_1.default, SoundScapeController.getMixById);
router.patch('/:id', authenticationMiddleware_1.default, SoundScapeController.editMixById);
exports.default = router;
