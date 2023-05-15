import { compare } from "bcrypt-ts";
import { sign } from "jsonwebtoken";
import { z } from "zod";

import type { AppRouter, AppContext } from "api/types";
import { parseSchema } from "middleware/parseSchema";
import { User } from "models/User";

const bodySchema = z.object({
    username: z.string(),
    password: z.string(),
});

type IBodySchema = z.infer<typeof bodySchema>;

export const loginUser = (router: AppRouter) => {
    router.post(
        "/user/login",
        parseSchema(bodySchema),
        async (ctx: AppContext) => {
            const body = ctx.state.body as IBodySchema;

            // get user
            const user = await User.findOne({ username: body.username });
            ctx.assert(user, 404, "User does not exist");

            // verify password
            const validPassword = await compare(body.password, user.password);
            ctx.assert(validPassword, 403, "Invalid password");

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
            ctx.body = "Successfully logged in";
        }
    );
};
