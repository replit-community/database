import type { FastifyPluginCallback } from "fastify";
import { genSalt, hash } from "bcrypt-ts";
import S from "fluent-json-schema";

import { User } from "v1/models/User";

interface IBodySchema {
    username: string;
    password: string;
}

const bodySchema = S.object()
    .prop("username", S.string().required())
    .prop("password", S.string().required());

export const createUser: FastifyPluginCallback = (app, _, done) => {
    app.post<{
        Body: IBodySchema;
    }>("/user", { schema: { body: bodySchema } }, async (req, res) => {
        // check if user already exists
        const exists = await User.exists({ username: req.body.username });
        if (exists) {
            res.status(403);

            return {
                message: "User already exists",
                success: false,
            };
        }

        // hash password
        const salt = await genSalt(10);
        const password = await hash(req.body.password, salt);

        // create user
        await new User({
            username: req.body.username,
            password,
        }).save();

        return {
            message: "User created",
            success: true,
        };
    });

    done();
};
