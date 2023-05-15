import crypto from "crypto";

export const generateApiKey = (length = 20): Promise<string> =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(length, (error, buffer) =>
            error ? reject(error) : resolve(buffer.toString("hex"))
        );
    });
