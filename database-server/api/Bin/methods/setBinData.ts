import type { AppRouter } from "api/types";

export const setBinData = (router: AppRouter) => {
    router.put("/bin/:id/data");
};
