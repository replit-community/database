import "dotenv/config";

import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import mongoose from "mongoose";
import http from "http";

import { createRouters } from "~/createRouters";

export const PORT = 3000;

/**
 * Create Koa app with all necessary routes
 * @returns Method to dispose of server
 */
export const createApp = async () => {
    // initialize Koa app
    const app = new Koa();
    app.keys = [`${process.env.COOKIE_SECRET}`];

    // connect to MongoDB
    await mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@repl-db-cluster-0.g7ydqoh.mongodb.net/replit-database?retryWrites=true&w=majority`
    );

    app.use(bodyParser());
    app.use(cors());

    // add routes
    createRouters().forEach((router) => {
        app.use(router.routes());
        app.use(router.allowedMethods());
    });

    const controller = new AbortController();
    const server = http.createServer(app.callback());

    // start server
    try {
        await new Promise((resolve, reject) => {
            server.listen(
                {
                    host: "0.0.0.0",
                    port: PORT,
                    signal: controller.signal,
                },
                () => resolve(null)
            );

            server.once("error", (error) => reject(error));
        });
    } catch {}

    // dispose function
    return async () => {
        await mongoose.disconnect();
        controller.abort();
    };
};

export type DisposeApp = () => Promise<void>;
