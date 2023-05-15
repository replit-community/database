import type { AppContext, AppRouter } from "api/types";
import { getUser } from "middleware/getUser";
import { getBin } from "middleware/getBin";
import { Bin } from "models/Bin";

export const getBins = (router: AppRouter) => {
    router.get("/bins", getUser, async (ctx: AppContext) => {
        const bins = await Bin.find({ user: ctx.state.user._id });
        ctx.status = 200;
        ctx.body = bins.map((bin) => bin.toJSON());
    });

    router.get("/bin/:id", getUser, getBin, (ctx) => {
        ctx.status = 200;
        ctx.body = ctx.state.bin.toJSON();
    });
};
