import { verify } from "jsonwebtoken";

import type { AppContext, AppMiddleware } from "api/types";
import { User } from "models/User";

/**
 * Ensure that a token is valid and saves user into app state
 */
export const getUser: AppMiddleware = async (ctx: AppContext, next) => {
    const token = ctx.cookies.get("token");
    ctx.assert(token, 403, "Missing token");

    // decode token
    let decoded;
    let errorFlag = false;
    try {
        decoded = verify(token, `${process.env.JWT_SECRET}`);
    } catch {
        errorFlag = true;
    }

    // ensure token is valid
    ctx.assert(
        decoded && typeof decoded !== "string" && !errorFlag,
        403,
        "Invalid token"
    );

    // ensure user exists & save it to app state
    const user = await User.findById(decoded._id.toString());
    ctx.assert(user, 404, "User does not exist");
    ctx.state.user = user;
    await next();
};
