import type Router from "@koa/router";
import type { MiddlewareResponse } from "middleware/types";

export const logoutUser = (router: Router) => {
    router.all("/user/logout", (ctx) => {
        ctx.cookies.set("token");
        ctx.status = 200;
        ctx.body = {
            success: true,
            message: "Successfully logged out",
        } satisfies MiddlewareResponse;
    });
};
