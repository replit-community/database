import type { AppRouter } from "api/types";
import { getUser } from "middleware/getUser";
import { getBin } from "middleware/getBin";
import { generateApiKey } from "lib/generateApiKey";
import { IPermission } from "models/Bin";

export const createApiKey = (router: AppRouter) => {
    router.post("/bin/:id/key", getUser, getBin, async (ctx) => {
        // generate api key and save it to the current bin
        const apiKey = await generateApiKey(20);
        const bin = ctx.state.bin;

        // https://security.stackexchange.com/questions/180345/do-i-need-to-hash-or-encrypt-api-keys-before-storing-them-in-a-database
        // salting is probably unneccessary because these are big keys

        bin.apiKeys.push({
            key: apiKey,
            permissions: [IPermission.READ, IPermission.WRITE],
            allowedIPs: ["127.0.0.1"],
        });

        bin.save();

        ctx.status = 200;
        ctx.body = apiKey;
    });
};
