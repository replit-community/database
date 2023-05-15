import type { AppRouter } from "api/types";

export const updateApiKey = (router: AppRouter) => {
    router.put("/bin/:id/key");
};
