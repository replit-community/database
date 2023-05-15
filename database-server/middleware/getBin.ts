import { Middleware } from "koa";
import { Bin } from "models/Bin";
import { BIN, MiddlewareResponse } from "./types";

/**
 * Confirm that a bin actually belongs to user & get bin details
 * Requires an id parameter
 */
export const getBin: Middleware = async (ctx, next) => {
    const bin = await Bin.findOne({ _id: ctx.params.id });
    if (!bin) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            message: "Bin does not exist",
        } satisfies MiddlewareResponse;

        return;
    }

    if (bin.user !== ctx.state.user._id) {
        ctx.status = 403;
        ctx.body = {
            success: false,
            message: "Bin does not belong to you",
        } satisfies MiddlewareResponse;

        return;
    }

    ctx.state[BIN] = bin;
    await next();
};
