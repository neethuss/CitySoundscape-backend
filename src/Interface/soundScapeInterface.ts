import { Document, Types } from "mongoose";

interface ISoundScape extends Document{
  user:Types.ObjectId,
  name:string,
 sounds:[{id:string, volume:string}],
 createdAt:Date
}

export default ISoundScape