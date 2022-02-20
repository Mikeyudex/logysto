import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type:String,
        unique:true,
        required:true
    },
    password: {
        type: String,
        required: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("User", UserSchema);