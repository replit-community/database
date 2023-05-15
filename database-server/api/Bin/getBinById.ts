import { AppRouter } from "api/types";
import { getUser } from "middleware/getUser";
import { getBin } from "middleware/getBin";

export const getBinById = (router: AppRouter) => {
    router.get("/bin/:id", getUser, getBin, (ctx) => {
        ctx.status = 200;
        ctx.body = ctx.state.bin;
    });
};
