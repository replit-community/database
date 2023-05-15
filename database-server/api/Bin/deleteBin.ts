import type Router from "@koa/router";

import type { MiddlewareResponse } from "middleware/types";
import { getUser } from "middleware/getUser";
import { getBin } from "middleware/getBin";
import { Bin } from "models/Bin";

export const deleteBin = (router: Router) => {
    router.delete("/bin/:id", getUser, getBin, async (ctx) => {
        await Bin.deleteOne({ _id: ctx.params.id });

        ctx.status = 200;
        ctx.body = {
            success: true,
            message: "Successfully deleted bin",
        } satisfies MiddlewareResponse;
    });
};
