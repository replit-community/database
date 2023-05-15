import type { AppRouter } from "api/types";
import { getUser } from "middleware/getUser";
import { getBin } from "middleware/getBin";
import { generateApiKey } from "lib/generateApiKey";

export const createApiKey = (router: AppRouter) => {
    router.post("/bin/:id/key", getUser, getBin, async (ctx) => {
        // generate api key and save it to the current bin
        const apiKey = await generateApiKey();
        const bin = ctx.state.bin;

        bin.apiKeys.push({
            key: apiKey,
            permissions: [],
            allowedHosts: [],
        });

        bin.save();

        ctx.status = 200;
        ctx.body = apiKey;
    });
};
