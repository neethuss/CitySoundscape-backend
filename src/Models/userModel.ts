import { Schema, model } from "mongoose";
import IUser from "../Interface/userInterface";

const UserSchema = new Schema<IUser>({
  username :{type:String},
  password:{type:String}
})

const User = model<IUser>('User', UserSchema)

export default User