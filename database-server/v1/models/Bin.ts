import { Schema, model } from "mongoose";

enum IPermission {
    READ = "READ",
    WRITE = "WRITE",
}

interface IApiKey {
    key: string;
    permissions: Array<IPermission>;
}

interface IBin {
    user: Schema.Types.ObjectId;
    title: string;
    description: string;
    allowedHosts: string[];
    allowedApiKeys: IApiKey[];
    data: Record<string, unknown>;
}

const apiKeySchema = new Schema<IApiKey>({
    key: { type: String, required: true },
    permissions: {
        type: [String],
        required: true,
        enum: [IPermission.READ, IPermission.WRITE],
    },
});

const binSchema = new Schema<IBin>({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: String,
    allowedHosts: [String],
    allowedApiKeys: [apiKeySchema],
    data: Object,
});

export const Bin = model<IBin>("Bin", binSchema);
