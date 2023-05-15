import type Router from "@koa/router";
import { createUser } from "./User/createUser";
import { loginUser } from "./User/loginUser";
import { logoutUser } from "./User/logoutUser";

const api = [createUser, loginUser, logoutUser];

export const registerRoutes = (router: Router) => {
    for (const route of api) {
        route(router);
    }
};
