import type { AppContext, AppRouter } from "api/types";
import { getBinWithKey } from "middleware/getBinWithKey";
import { parseSchema } from "middleware/parseSchema";
import { requirePermissions } from "middleware/requirePermission";
import { IPermission } from "models/Bin";
import { z } from "zod";

const bodySchema = z.record(z.string(), z.any());

type IBodySchema = z.infer<typeof bodySchema>;

export const setBinPath = (router: AppRouter) => {
    router.put(
        "/bin/:id/path",
        parseSchema(bodySchema),
        getBinWithKey,
        requirePermissions([IPermission.WRITE]),
        async (ctx: AppContext<{ body: IBodySchema }>) => {
            const body = ctx.state.body;
            const bin = ctx.state.bin;

            for (const [key, value] of Object.entries(body)) {
                bin.data[key] = value;
            }

            await bin.save();

            ctx.status = 200;
            ctx.body = "Added keys to data";
        }
    );
};
