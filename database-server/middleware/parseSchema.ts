import { z } from "zod";

import type { AppContext, AppMiddleware } from "api/types";

export const parseSchema =
    (schema: z.ZodObject<any>): AppMiddleware =>
    async (ctx: AppContext, next) => {
        // get result & construct error message, if available
        const result = schema.safeParse(ctx.request.body);
        const message =
            "error" in result
                ? result.error.issues
                      .map(
                          ({ path, message }) => `${path.join(".")}: ${message}`
                      )
                      .join("; ")
                : "Failed to parse body";

        ctx.assert(result.success, 400, message);

        // save result into state
        ctx.state.body = result.data;
        await next();
    };
