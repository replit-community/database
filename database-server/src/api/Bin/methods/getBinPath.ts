import type { AppContext, AppRouter } from "~/api/types";
import { getBinWithKey } from "~/middleware/getBinWithKey";
import { enforcePermissions } from "~/middleware/enforcePermissions";
import { enforceIPs } from "~/middleware/enforceIPs";
import { IPermission } from "~/models/Bin";

export const getBinPath = (router: AppRouter) => {
    router.get(
        "/bin/:id/path",
        getBinWithKey,
        enforcePermissions([IPermission.READ]),
        enforceIPs,
        (ctx) => {
            ctx.status = 200;
            ctx.body = ctx.state.bin.data;
        }
    );

    router.get(
        "/bin/:id/path/:path",
        getBinWithKey,
        enforcePermissions([IPermission.READ]),
        enforceIPs,
        (ctx: AppContext) => {
            const path = ctx.params.path;
            const bin = ctx.state.bin;
            ctx.assert(path in bin.data, 404, "Path does not exist");

            ctx.status = 200;
            ctx.body = bin.data[path];
        }
    );

    router.get(
        "/bin/:id/path/prefix/:prefix",
        getBinWithKey,
        enforcePermissions([IPermission.READ]),
        enforceIPs,
        (ctx) => {
            const prefix = ctx.params.prefix;
            const data = ctx.state.bin.data;

            // find keys that start with prefix
            const filteredData = Object.keys(data).reduce(
                (acc, key) =>
                    key.startsWith(prefix)
                        ? {
                              ...acc,
                              [key]: data[key],
                          }
                        : acc,
                {}
            );

            ctx.status = 200;
            ctx.body = filteredData;
        }
    );
};
