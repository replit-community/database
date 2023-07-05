import type { AppContext, AppRouter } from "~/api/types";
import { getBin } from "~/middleware/getBin";
import { getUser } from "~/middleware/getUser";

export const deleteApiKey = (router: AppRouter) => {
    router.delete(
        "/bin/:id/key/:apiKey",
        getUser,
        getBin,
        async (ctx: AppContext) => {
            const apiKey = ctx.params.apiKey;
            const bin = ctx.state.bin;

            // compare keys to param & filter them
            const filteredApiKeys = bin.apiKeys.filter(
                ({ key }) => key !== apiKey
            );

            ctx.assert(
                filteredApiKeys.length === bin.apiKeys.length - 1,
                404,
                "API key does not exist"
            );

            bin.apiKeys = filteredApiKeys;
            bin.save();

            ctx.status = 200;
            ctx.body = "Deleted API key";
        }
    );
};
