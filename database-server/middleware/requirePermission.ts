import type { AppContext, AppMiddleware } from "api/types";
import { IPermission } from "models/Bin";

// TODO: more explicit types instead of "requires ___ before"

/**
 * Ensure that a given API key has certain permissions
 * - Requires getBinWithKey before
 * @param permissions - Array of permissions needed to act on a given resource
 */
export const requirePermissions =
    (permissions: Array<IPermission>): AppMiddleware =>
    async (ctx: AppContext, next) => {
        // validate preconditions
        ctx.assert(ctx.state.binApiKey, 422, "Missing bin API key");

        // validate permissions
        for (const p of permissions) {
            ctx.assert(
                ctx.state.binApiKey.permissions.includes(p),
                403,
                `Insufficient permissions, need ${p}`
            );
        }

        await next();
    };
