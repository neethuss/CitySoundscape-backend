"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SoundScapeSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    sounds: [
        {
            id: String,
            volume: Number,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const SoundScape = (0, mongoose_1.model)('SoundScape', SoundScapeSchema);
exports.default = SoundScape;
