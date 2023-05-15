import type { AppContext, AppRouter } from "api/types";
import { getBinWithKey } from "middleware/getBinWithKey";
import { requirePermissions } from "middleware/requirePermission";
import { IPermission } from "models/Bin";

/**
 * Delete a path inside of a bin
 */
export const deleteBinPath = (router: AppRouter) => {
    router.delete(
        "/bin/:id/path/:path",
        getBinWithKey,
        requirePermissions([IPermission.WRITE]),
        async (ctx: AppContext) => {
            const path = ctx.params.path;
            const bin = ctx.state.bin;

            // delete path
            path in bin && delete bin.data[ctx.params.path];
            await bin.save();

            ctx.status = 200;
            ctx.body = "Deleted path";
        }
    );
};
