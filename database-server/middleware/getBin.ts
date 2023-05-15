import type { AppContext, AppMiddleware } from "api/types";
import { Bin } from "models/Bin";

/**
 * Get bin through API key
 * Does not require user to be logged in
 * Requires :id
 */
export const getBinWithKey: AppMiddleware = async (ctx: AppContext, next) => {
    const apiKey = ctx.header["authorization"]
        ?.toString()
        .replace(/^Bearer /, "")
        .trim();

    // validate preconditions
    ctx.assert(ctx.params.id, 422, "Missing id param state");
    ctx.assert(apiKey && apiKey.length > 0, 422, "Missing API key");

    // ensures bin exists
    const bin = await Bin.findById(ctx.params.id);
    ctx.assert(bin, 404, "Bin does not exist");

    // ensure key is valid
    const exists = bin.apiKeys.find(({ key }) => key === apiKey);
    ctx.assert(exists, 401, "Invalid API key");

    ctx.state.bin = bin;
    await next();
};

/**
 * Confirm that a bin actually belongs to user & get bin details
 * Requires :id
 * Requires getUser before
 */
export const getBin: AppMiddleware = async (ctx: AppContext, next) => {
    // validate preconditions
    ctx.assert(ctx.params.id, 422, "Missing id param state");
    ctx.assert(ctx.state.user, 422, "Missing user state");

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
