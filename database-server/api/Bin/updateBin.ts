import type Router from "@koa/router";
import { z } from "zod";

import { getUser } from "middleware/getUser";
import { getBin } from "middleware/getBin";
import { parseSchema } from "middleware/parseSchema";

const bodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
});

type IBodySchema = z.infer<typeof bodySchema>;

export const updateBin = (router: Router) => {
    router.put(
        "/bin/:id",
        parseSchema(bodySchema),
        getUser,
        getBin,
        async (ctx) => {}
    );
};
