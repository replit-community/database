import type { FastifyPluginCallback } from "fastify";
import { compare } from "bcrypt-ts";
import { sign } from "jsonwebtoken";
import S from "fluent-json-schema";

import { User } from "v1/models/User";

interface IBodySchema {
    username: string;
    password: string;
}

const bodySchema = S.object()
    .prop("username", S.string().required())
    .prop("password", S.string().required());

export const loginUser: FastifyPluginCallback = (app, _, done) => {
    app.post<{ Body: IBodySchema }>(
        "/user/login",
        { schema: { body: bodySchema } },
        async (req, res) => {
            // get user & check it exists
            const user = await User.findOne({
                username: req.body.username,
            }).exec();

            if (!user) {
                res.status(404);

                return {
                    message: "User does not exist",
                    success: false,
                };
            }

            // compare passwords and return if invalid
            const success = await compare(req.body.password, user.password);

            if (!success) {
                res.status(403);

                return {
                    message: "Incorrect password",
                    success: false,
                };
            }

            // create payload & sign JWT token
            const payload = {
                _id: user._id.toString(),
                username: user.username,
            };

            const token = sign(payload, `${process.env.JWT_SECRET}`, {
                expiresIn: "3 days",
            });

            return {
                token,
                message: "Successfully authenticated",
                success: true,
            };
        }
    );

    done();
};
