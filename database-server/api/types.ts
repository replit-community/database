import type { IBin } from "models/Bin";
import type { IUser } from "models/User";
import type { Document } from "mongoose";

export interface State {
    bin?: Document<unknown, {}, IBin>;
    user?: Document<unknown, {}, IUser>;
    body?: Record<string, unknown>;
}
