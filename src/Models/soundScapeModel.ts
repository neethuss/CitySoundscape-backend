import { Schema, model } from "mongoose";

import ISoundScape from "../Interface/soundScapeInterface";

const SoundScapeSchema = new Schema<ISoundScape>({
  user:{type:Schema.Types.ObjectId, ref:'User'},
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
})

const SoundScape = model<ISoundScape>('SoundScape', SoundScapeSchema)

export default SoundScape