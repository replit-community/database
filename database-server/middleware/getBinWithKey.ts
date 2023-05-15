import type { AppContext, AppMiddleware } from "api/types";
import { Bin } from "models/Bin";

/**
 * Get bin through API key
 * - Requires :id
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

    // ensure key is valid & save it to app state
    const binApiKey = bin.apiKeys.find(({ key }) => key === apiKey);
    ctx.assert(binApiKey, 401, "Invalid API key");

    ctx.state.bin = bin;
    ctx.state.binApiKey = binApiKey;
    await next();
};
