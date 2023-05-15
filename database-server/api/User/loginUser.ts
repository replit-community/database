import type Router from "@koa/router";
import { compare } from "bcrypt-ts";
import { sign } from "jsonwebtoken";
import { z } from "zod";

import { parseSchema } from "middleware/parseSchema";
import { MiddlewareResponse } from "middleware/types";
import { User } from "models/User";

const bodySchema = z.object({
    username: z.string(),
    password: z.string(),
});

type IBodySchema = z.infer<typeof bodySchema>;

export const loginUser = (router: Router) => {
    router.post("/user/login", parseSchema(bodySchema), async (ctx) => {
        const body = ctx.state.body as IBodySchema;

        // get user
        const user = await User.findOne({ username: body.username });
        if (!user) {
            ctx.status = 404;
            ctx.body = {
                success: false,
                message: "User does not exist",
            } satisfies MiddlewareResponse;

            return;
        }

        // verify password
        const validPassword = await compare(body.password, user.password);
        if (!validPassword) {
            ctx.status = 403;
            ctx.body = {
                success: false,
                message: "Invalid password",
            } satisfies MiddlewareResponse;

            return;
        }

        // sign JWT & save as server side cookie
        const token = sign(user._id.toString(), `${process.env.JWT_SECRET}`, {
            expiresIn: "2 days",
        });

        ctx.cookies.set("token", token, { signed: true, httpOnly: true });

        ctx.status = 200;
        ctx.body = {
            success: true,
            message: "Successfully logged in",
        } satisfies MiddlewareResponse;
    });
};
