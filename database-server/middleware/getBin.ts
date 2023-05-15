import type { AppContext, AppMiddleware } from "api/types";
import { Bin } from "models/Bin";

/**
 * Confirm that a bin actually belongs to user & get bin details
 * Requires an id parameter
 */
export const getBin: AppMiddleware = async (ctx: AppContext, next) => {
    const bin = await Bin.findById(ctx.params.id);
    ctx.assert(bin, 404, "Bin does not exist");
    ctx.assert(
        bin.user.toString() == ctx.state.user._id.toString(),
        403,
        "Bin does not belong to you"
    );

    ctx.state.bin = bin;
    await next();
};
