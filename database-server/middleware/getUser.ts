import { Middleware } from "koa";
import { verify } from "jsonwebtoken";

import { MiddlewareResponse, USER } from "./types";
import { User } from "models/User";

/**
 * Ensure that a token is valid
 * Also saves user into application state
 */
export const getUser: Middleware = async (ctx, next) => {
    const token = ctx.cookies.get("token");
    if (!token) {
        ctx.status = 403;
        ctx.body = {
            success: false,
            message: "Missing token",
        } satisfies MiddlewareResponse;

        return;
    }

    // verify token & ensure user exists
    let decoded;
    let errorFlag = false;
    try {
        decoded = verify(token, `${process.env.JWT_SECRET}`);
    } catch {
        errorFlag = true;
    }

    if (!decoded || typeof decoded === "string" || errorFlag) {
        ctx.status = 403;
        ctx.body = {
            success: false,
            message: "Invalid token",
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

    ctx.state[USER] = user;
    await next();
};
