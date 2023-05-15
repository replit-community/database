import "dotenv/config";

import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import mongoose from "mongoose";

import { createRouter } from "api";

const PORT = 3000;

async function main() {
    const app = new Koa();
    const router = createRouter();

    app.keys = [`${process.env.COOKIE_SECRET}`];

    // connect to MongoDB
    await mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@repl-db-cluster-0.g7ydqoh.mongodb.net/?retryWrites=true&w=majority`
    );

    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());

    // start server
    app.listen(PORT);
    console.log(`started database-server on port ${PORT}`);
}

main();
