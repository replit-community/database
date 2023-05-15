import { z } from "zod";

import type { AppContext, AppRouter } from "api/types";
import { getUser } from "middleware/getUser";
import { getBin } from "middleware/getBin";
import { parseSchema } from "middleware/parseSchema";

const bodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
});

type IBodySchema = z.infer<typeof bodySchema>;

export const updateBin = (router: AppRouter) => {
    router.put(
        "/bin/:id",
        parseSchema(bodySchema),
        getUser,
        getBin,
        async (ctx: AppContext<{ body: IBodySchema }>) => {
            // save title & description
            const body = ctx.state.body;
            const bin = ctx.state.bin;
            ctx.assert(body && bin, 500);

            // update & save bin
            body.title && (bin.title = body.title);
            body.description && (bin.description = body.description);
            await bin.save();

            ctx.status = 200;
            ctx.body = "Successfully updated bin";
        }
    );
};
