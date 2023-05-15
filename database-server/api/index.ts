import type Router from "@koa/router";
import { createUser } from "./User/createUser";
import { loginUser } from "./User/loginUser";

const api = [createUser, loginUser];

export const registerRoutes = (router: Router) => {
    for (const route of api) {
        route(router);
    }
};
