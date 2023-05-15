import type { AppRouter } from "api/types";

export const logoutUser = (router: AppRouter) => {
    router.all("/user/logout", (ctx) => {
        ctx.cookies.set("token");
        ctx.status = 200;
        ctx.body = "Successfully logged out";
    });
};
