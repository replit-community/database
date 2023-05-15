import Router from "@koa/router";

import type { AppRouter } from "./types";
import { createBin } from "./Bin/createBin";
import { getBins } from "./Bin/getBins";
import { updateBin } from "./Bin/updateBin";
import { deleteBin } from "./Bin/deleteBin";
import { createApiKey } from "./Bin/apiKey/createApiKey";
import { deleteApiKey } from "./Bin/apiKey/deleteApiKey";
import { updateApiKey } from "./Bin/apiKey/updateApiKey";
import { createUser } from "./User/createUser";
import { loginUser } from "./User/loginUser";
import { logoutUser } from "./User/logoutUser";

const api = [
    // bin methods
    createBin,
    getBins,
    updateBin,
    deleteBin,

    // bin api key methods
    createApiKey,
    updateApiKey,
    deleteApiKey,

    // bin data methods

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
