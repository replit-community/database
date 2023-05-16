import { z } from "zod";
import { genSalt, hash } from "bcrypt-ts";

import type { AppRouter, AppContext } from "api/types";
import { parseSchema } from "middleware/parseSchema";
import { User } from "models/User";

const bodySchema = z
    .object({
        username: z.string().min(5).max(40),
        password: z.string(),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type IBodySchema = z.infer<typeof bodySchema>;

export const createUser = (router: AppRouter) => {
    router.post(
        "/user",
        parseSchema(bodySchema),
        async (ctx: AppContext<{ body: IBodySchema }>) => {
            const body = ctx.state.body;

            // check if user exists
            const exists = await User.exists({ username: body.username });
            ctx.assert(!exists, 403, "User already exists");

            // hash password
            const salt = await genSalt();
            const password = await hash(body.password, salt);

            // save user
            await new User({ username: body.username, password }).save();
            ctx.status = 200;
        }
    );
};
