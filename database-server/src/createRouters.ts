import Router from "@koa/router";

import type { AppRouter } from "~/api/types";
import { api } from "~/api";

/**
 * Create router & initialize routes
 * @returns Router instance
 */
export const createRouters = () => {
    const routers: Array<AppRouter> = [];

    api.forEach(({ version, routes }) => {
        // create router & add routes
        const router: AppRouter = new Router({ prefix: `/api/${version}` });
        for (const route of routes) {
            route(router);
        }

        routers.push(router);
    });

    return routers;
};
