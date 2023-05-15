import { Schema, model } from "mongoose";

enum IPermission {
    READ = "READ",
    WRITE = "WRITE",
}

interface IApiKey {
    key: string;
    permissions: Array<IPermission>;
    allowedHosts: string[];
}

interface IBin {
    user: Schema.Types.ObjectId;
    title: string;
    description: string;
    keys: IApiKey[];
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
    keys: { type: [apiKeySchema], required: true },
    data: Object,
});

export const Bin = model<IBin>("Bin", binSchema);
