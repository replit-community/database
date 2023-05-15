import type Router from "@koa/router";
import type { MiddlewareResponse } from "middleware/types";
import { getUser } from "middleware/getUser";
import { Bin } from "models/Bin";

export const createBin = (router: Router) => {
    router.post("/bin", getUser, async (ctx) => {
        // TODO: limit the number of bins you can create

        const bin = await new Bin({
            user: ctx.state.user,
            title: "Untitled Bin",
            keys: [],
            data: {},
        }).save();

        ctx.status = 200;
        ctx.body = {
            success: true,
            message: "Successfully created new bin",
            data: {
                id: bin._id.toString(),
            },
        } satisfies MiddlewareResponse & { data: { id: string } };
    });
};
