import Router from "@koa/router";
import { createBin } from "./Bin/createBin";
import { createUser } from "./User/createUser";
import { loginUser } from "./User/loginUser";
import { logoutUser } from "./User/logoutUser";
import { State } from "./types";

const api = [createBin, createUser, loginUser, logoutUser];

/**
 * Create router & initialize routes
 * @returns Router instance
 */
export const createRouter = () => {
    const router = new Router<State>();
    for (const route of api) {
        route(router);
    }

    return router;
};
