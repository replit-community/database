import crypto from "crypto";

export const generateApiKey = (length = 20): Promise<string> =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(length, async (error, buffer) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(buffer.toString("hex"));
        });
    });
