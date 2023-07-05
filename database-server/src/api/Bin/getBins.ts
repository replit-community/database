import type { AppContext, AppRouter } from "~/api/types";
import { getUser } from "~/middleware/getUser";
import { getBin } from "~/middleware/getBin";
import { Bin, IBin } from "~/models/Bin";
import { HydratedDocument } from "mongoose";

export const getBins = (router: AppRouter) => {
    router.get("/bins", getUser, async (ctx: AppContext) => {
        const bins = await Bin.find({ user: ctx.state.user._id });
        ctx.status = 200;
        ctx.body = bins.map(stripBin);
    });

    router.get("/bin/:id", getUser, getBin, (ctx) => {
        ctx.status = 200;
        ctx.body = stripBin(ctx.state.bin);
    });
};

/**
 * Remove unnecessary properties from bin
 * @param bin Bin fetched from MongoDB
 * @returns Stripped bin (close your eyes 🙈)
 */
const stripBin = (bin: HydratedDocument<IBin>) => ({
    _id: bin._id,
    title: bin.title,
    description: bin.description,
    apiKeys: bin.apiKeys,
});
