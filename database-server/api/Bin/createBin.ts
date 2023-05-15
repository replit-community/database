import type Router from "@koa/router";

import type { AppRouter } from "api/types";
import { getUser } from "middleware/getUser";
import { Bin } from "models/Bin";

export const createBin = (router: AppRouter) => {
    router.post("/bin", getUser, async (ctx) => {
        // TODO: limit the number of bins you can create

        const bin = await new Bin({
            user: ctx.state.user,
            title: "Untitled Bin",
            apiKeys: [],
            data: {},
        }).save();

        ctx.status = 200;
        ctx.body = bin._id.toString();
    });
};
