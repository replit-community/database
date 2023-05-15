import { z } from "zod";

import type { AppRouter } from "api/types";
import { getUser } from "middleware/getUser";
import { getBin } from "middleware/getBin";
import { parseSchema } from "middleware/parseSchema";

const bodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
});

type IBodySchema = z.infer<typeof bodySchema>;

export const updateBin = (router: AppRouter<{ body: IBodySchema }>) => {
    router.put(
        "/bin/:id",
        parseSchema(bodySchema),
        getUser,
        getBin,
        async (ctx) => {
            // save title & description
            const body = ctx.state.body;
            const bin = ctx.state.bin!;
            if (bin) {
                body.title && bin.set("title", body.title);
                body.description && bin.set("description", body.description);
            }

            ctx.status = 200;
            ctx.body = "Successfully updated bin";
        }
    );
};
