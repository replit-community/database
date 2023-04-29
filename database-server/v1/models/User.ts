import { Schema, model } from "mongoose";

// https://mongoosejs.com/docs/typescript.html
// for guide to creating TS-enhanced models

export interface IUser {
    username: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

export const User = model<IUser>("User", userSchema);
