import { Middleware } from "koa";
import { verify } from "jsonwebtoken";
import { User } from "models/User";
import { MiddlewareResponse } from "./types";

export const verifyToken: Middleware = async (ctx, next) => {
    const token = ctx.cookies.get("token");
    if (!token) {
        ctx.status = 403;
        ctx.body = {
            success: false,
            message: "Missing user token",
        } satisfies MiddlewareResponse;

        return;
    }

    // verify token & ensure user exists
    const decoded = verify("token", `${process.env.JWT_SECRET}`);
    if (typeof decoded === "string") {
        ctx.status = 403;
        ctx.body = {
            success: false,
            message: "Invalid user token",
        } satisfies MiddlewareResponse;

        return;
    }

    const user = await User.findOne({ _id: decoded._id.toString() });
    if (!user) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            message: "User does not exist",
        } satisfies MiddlewareResponse;

        return;
    }

    ctx.state.user = user;
    await next();
};
