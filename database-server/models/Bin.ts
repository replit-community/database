import { Schema, model } from "mongoose";

export enum IPermission {
    READ = "READ",
    WRITE = "WRITE",
}

export interface IApiKey {
    key: string;
    permissions: Array<IPermission>;
    allowedIPs: string[];
}

export interface IBin {
    user: Schema.Types.ObjectId;
    title: string;
    description: string;
    apiKeys: IApiKey[];
    data: Record<string, string>;
}

const apiKeySchema = new Schema<IApiKey>(
    {
        key: { type: String, required: true },
        allowedIPs: { type: [String], required: true },
        permissions: {
            type: [String],
            enum: [IPermission.READ, IPermission.WRITE],
            required: true,
        },
    },
    {
        minimize: false,
    }
);

const binSchema = new Schema<IBin>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        description: String,
        apiKeys: { type: [apiKeySchema], required: true },
        data: {
            type: Object,
            required: true,
        },
    },
    {
        minimize: false,
    }
);

export const Bin = model<IBin>("Bin", binSchema);
