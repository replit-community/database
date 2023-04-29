import * as dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import S from "fluent-json-schema";

const app = Fastify();

/*
server methods
- create account
    - sign into account
    - log out of account

- create bin
    - delete bin
    - update bin title, description, allowed hosts
    - get bin title, description, allowed hosts
    - create bin API key with scopes (READ, WRITE)
    - delete bin API key
    - get API key & scopes

- create bin key
    - get bin key
    - set bin key
    - delete bin key
*/

app.get("/", async (req, res) => {
    return {
        success: true,
    };
});

async function main(port = 3000, host = "0.0.0.0") {
    await app.listen({ port, host });
    console.log("database-server started");
}

main();
