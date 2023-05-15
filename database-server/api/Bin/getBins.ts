import { AppContext, AppRouter } from "api/types";
import { getUser } from "middleware/getUser";
import { Bin } from "models/Bin";

export const getBins = (router: AppRouter) => {
    router.get("/bins", getUser, async (ctx: AppContext) => {
        const bins = await Bin.find({ user: ctx.state.user?._id });
        ctx.status = 200;
        ctx.body = bins;
    });
};
