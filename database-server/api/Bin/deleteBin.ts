import type { AppRouter } from "api/types";
import { getUser } from "middleware/getUser";
import { getBin } from "middleware/getBin";
import { Bin } from "models/Bin";

export const deleteBin = (router: AppRouter) => {
    router.delete("/bin/:id", getUser, getBin, async (ctx) => {
        await Bin.deleteOne({ _id: ctx.params.id });
        ctx.status = 200;
    });
};
