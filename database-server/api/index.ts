import type Router from "@koa/router";
import { createUser } from "./User/createUser";

const api = [createUser];

export const registerRoutes = (router: Router) => {
    for (const route of api) {
        route(router);
    }
};
