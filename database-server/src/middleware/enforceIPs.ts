import type { AppContext, AppMiddleware } from "~/api/types";

/**
 * Ensure IPs are whitelisted
 */
export const enforceIPs: AppMiddleware = async (ctx: AppContext, next) => {
    const apiKey = ctx.state.binApiKey;

    // validate preconditions
    ctx.assert(apiKey, 422, "Missing bin API key");
    ctx.assert(
        apiKey.allowedIPs.includes("*") || apiKey.allowedIPs.includes(ctx.ip),
        403,
        "IP not allowed"
    );

    await next();
};
