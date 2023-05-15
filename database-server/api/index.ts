import Router from "@koa/router";

import type { AppRouter } from "./types";
import { createBin } from "./Bin/createBin";
import { deleteBin } from "./Bin/deleteBin";
import { createUser } from "./User/createUser";
import { loginUser } from "./User/loginUser";
import { logoutUser } from "./User/logoutUser";
import { getBinById } from "./Bin/getBinById";
import { getBins } from "./Bin/getBins";

const api = [
    // bin methods
    createBin,
    deleteBin,
    getBinById,
    getBins,

    // user methods
    createUser,
    loginUser,
    logoutUser,
];

/**
 * Create router & initialize routes
 * @returns Router instance
 */
export const createRouter = () => {
    const router: AppRouter = new Router();
    for (const route of api) {
        route(router);
    }

    return router;
};
