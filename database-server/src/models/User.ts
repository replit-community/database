import { Schema, model } from "mongoose";

export interface IUser {
    username: string;
    password: string;
}

const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        minimize: false,
    }
);

export const User = model<IUser>("User", userSchema);
