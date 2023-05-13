import * as dotenv from "dotenv";
dotenv.config();

import Fastify, { FastifyPluginCallback } from "fastify";
import mongoose from "mongoose";

import { createUser } from "./v1/routes/userRoutes/createUser";
import { loginUser } from "v1/routes/userRoutes/loginUser";

const app = Fastify();

/**
 * Register an array of routes under a given prefix
 * @param routes Array of routes to register
 * @param prefix Prefix, like v1
 */
function registerRoutes(routes: Array<FastifyPluginCallback>, prefix: string) {
    for (const route of routes) {
        app.register(route, { prefix });
    }
}

/**
 * Start Fastify server
 * @param port Port to use
 * @param host Host to use
 */
async function main(port = 3000, host = "0.0.0.0") {
    await mongoose.connect(
        `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@repl-db-cluster-0.g7ydqoh.mongodb.net/?retryWrites=true&w=majority`
    );
    await app.listen({ port, host });

    console.log(`database-server started on port ${port}`);
}

registerRoutes([createUser, loginUser], "v1");

main();
