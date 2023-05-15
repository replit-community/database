import crypto from "crypto";

export const generateApiKey = (length = 20) =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(length, (error, buffer) => {
            if (error) {
                return reject(error);
            }

            resolve(buffer.toString("hex"));
        });
    });
