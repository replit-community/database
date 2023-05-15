import type { AppRouter } from "api/types";

export const getBinData = (router: AppRouter) => {
    router.get("/bin/:id/data");
};
