import { Middleware } from "koa";
import { Bin } from "models/Bin";
import { MiddlewareResponse } from "./types";

/**
 * Confirm that a bin actually belongs to a signed in user
 * @param binId
 */
export const getBin =
    (binId: string): Middleware =>
    async (ctx, next) => {
        const bin = await Bin.findOne({ _id: binId });
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

        ctx.state.bin = bin;
        await next();
    };
