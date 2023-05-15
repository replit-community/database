import type Router from "@koa/router";
import { createBin } from "./Bin/createBin";
import { createUser } from "./User/createUser";
import { loginUser } from "./User/loginUser";
import { logoutUser } from "./User/logoutUser";

const api = [createBin, createUser, loginUser, logoutUser];

export const registerRoutes = (router: Router) => {
    for (const route of api) {
        route(router);
    }
};
