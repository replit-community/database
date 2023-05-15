import type { AppRouter } from "api/types";
import { getBin } from "middleware/getBin";
import { getUser } from "middleware/getUser";

export const deleteApiKey = (router: AppRouter) => {
    router.delete("/bin/:id/key/:apiKey", getUser, getBin, (ctx) => {
        const apiKey = ctx.params.apiKey;
        const bin = ctx.state.bin;

        bin.apiKeys = bin.apiKeys.filter(({ key }) => key !== apiKey);
        bin.save();

        ctx.status = 200;
        ctx.body = "Deleted API key";
    });
};
