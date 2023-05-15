import type Router from "@koa/router";
import { compare } from "bcrypt-ts";
import { sign } from "jsonwebtoken";
import { z } from "zod";

import type { MiddlewareResponse } from "middleware/types";
import type { State } from "api/types";
import { parseSchema } from "middleware/parseSchema";
import { User } from "models/User";

const bodySchema = z.object({
    username: z.string(),
    password: z.string(),
});

type IBodySchema = z.infer<typeof bodySchema>;

export const loginUser = (router: Router<State>) => {
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
        const payload = {
            _id: user._id.toString(),
            username: user.username,
        };

        const token = sign(payload, `${process.env.JWT_SECRET}`, {
            expiresIn: "3 days",
        });

        ctx.cookies.set("token", token, { signed: true, httpOnly: true });
        ctx.status = 200;
        ctx.body = {
            success: true,
            message: "Successfully logged in",
        } satisfies MiddlewareResponse;
    });
};
