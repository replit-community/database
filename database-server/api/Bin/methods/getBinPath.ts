import type { AppRouter } from "api/types";
import { getBinWithKey } from "middleware/getBinWithKey";
import { requirePermissions } from "middleware/requirePermission";
import { IPermission } from "models/Bin";

export const getBinPath = (router: AppRouter) => {
    router.get(
        "/bin/:id/path",
        getBinWithKey,
        requirePermissions([IPermission.READ]),
        (ctx) => {
            ctx.status = 200;
            ctx.body = ctx.state.bin.data;
        }
    );

    router.get(
        "/bin/:id/path/:path",
        getBinWithKey,
        requirePermissions([IPermission.READ]),
        (ctx) => {
            ctx.status = 200;
            ctx.body = ctx.state.bin.data[ctx.params.path];
        }
    );

    router.get(
        "/bin/:id/path/prefix/:prefix",
        getBinWithKey,
        requirePermissions([IPermission.READ]),
        (ctx) => {
            const prefix = ctx.params.prefix;
            const bin = ctx.state.bin;

            // find keys that start with prefix
            const filteredData = Object.keys(bin.data).reduce(
                (acc, key) =>
                    key.startsWith(prefix)
                        ? {
                              ...acc,
                              [key]: bin.data[key],
                          }
                        : acc,
                {}
            );

            ctx.status = 200;
            ctx.body = filteredData;
        }
    );
};
