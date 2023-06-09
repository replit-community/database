import type { AppContext, AppRouter } from "~/api/types";
import { getBin } from "~/middleware/getBin";
import { getUser } from "~/middleware/getUser";
import { parseSchema } from "~/middleware/parseSchema";
import { IPermission } from "~/models/Bin";
import { z } from "zod";

const bodySchema = z.object({
    permissions: z.array(z.nativeEnum(IPermission)).optional(),
    allowedIPs: z.array(z.string()).optional(),
});

type IBodySchema = z.infer<typeof bodySchema>;

export const updateApiKey = (router: AppRouter) => {
    router.put(
        "/bin/:id/key/:apiKey",
        parseSchema(bodySchema),
        getUser,
        getBin,
        (ctx: AppContext<{ body: IBodySchema }>) => {
            const body = ctx.state.body;
            const bin = ctx.state.bin;
            const apiKeyParam = ctx.params.apiKey;

            // get api key & ensure it exists
            const apiKey = bin.apiKeys.find(({ key }) => key === apiKeyParam);
            ctx.assert(apiKey && apiKeyParam, 404, "API key not found");

            // set new permissions & allowed hosts
            body.permissions && (apiKey.permissions = body.permissions);
            body.allowedIPs && (apiKey.allowedIPs = body.allowedIPs);
            bin.save();

            ctx.status = 200;
            ctx.body = "Updated API Key";
        }
    );
};
