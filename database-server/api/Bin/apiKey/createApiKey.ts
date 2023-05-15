import type { AppRouter } from "api/types";

export const createApiKey = (router: AppRouter) => {
    router.post("/bin/:id/key");
};
