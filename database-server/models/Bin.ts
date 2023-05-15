import { Schema, model } from "mongoose";

export enum IPermission {
    READ = "READ",
    WRITE = "WRITE",
}

export interface IApiKey {
    key: string;
    permissions: Array<IPermission>;
    allowedHosts: string[];
}

export interface IBin {
    user: Schema.Types.ObjectId;
    title: string;
    description: string;
    apiKeys: IApiKey[];
    data: Record<string, unknown>;
}

const apiKeySchema = new Schema<IApiKey>({
    key: { type: String, required: true },
    allowedHosts: { type: [String], required: true },
    permissions: {
        type: [String],
        enum: [IPermission.READ, IPermission.WRITE],
        required: true,
    },
});

const binSchema = new Schema<IBin>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: String,
    apiKeys: { type: [apiKeySchema], required: true },
    data: Object,
});

export const Bin = model<IBin>("Bin", binSchema);
