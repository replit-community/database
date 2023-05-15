import type Router from "@koa/router";
import { z } from "zod";
import { genSalt, hash } from "bcrypt-ts";

import { parseSchema } from "middleware/parseSchema";
import { User } from "models/User";
import type { MiddlewareResponse } from "middleware/types";

const bodySchema = z.object({
    username: z.string().min(5).max(40),
    password: z.string(),
});

type IBodySchema = z.infer<typeof bodySchema>;

export const createUser = (router: Router) => {
    router.post("/user", parseSchema(bodySchema), async (ctx) => {
        const body = ctx.state.body as IBodySchema;

        // check if user exists
        const exists = await User.exists({ username: body.username });
        if (exists) {
            ctx.status = 403;
            ctx.body = {
                success: false,
                message: "User already exists",
            } satisfies MiddlewareResponse;

            return;
        }

        // hash password
        const salt = await genSalt(10);
        const password = await hash(body.password, salt);

        // save user
        await new User({ username: body.username, password }).save();

        ctx.status = 200;
        ctx.body = {
            success: true,
            message: "Successfully created user",
        } satisfies MiddlewareResponse;
    });
};
