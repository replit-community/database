import type { AppRouter } from "api/types";

export const deleteApiKey = (router: AppRouter) => {
    router.delete("/bin/:id/key");
};
