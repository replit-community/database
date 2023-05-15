import "dotenv/config";

import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import mongoose from "mongoose";

import { registerRoutes } from "api";

async function main() {
    const app = new Koa();
    const router = new Router();

    // connect to MongoDB
    await mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@repl-db-cluster-0.g7ydqoh.mongodb.net/?retryWrites=true&w=majority`
    );

    // register routes & other middleware
    registerRoutes(router);

    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());

    // start server
    app.listen(3000);
}

main();
