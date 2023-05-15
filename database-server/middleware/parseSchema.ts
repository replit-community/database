import { z } from "zod";

import type { AppContext, AppMiddleware } from "api/types";

/**
 * Ensure payload conforms to a specific schema
 * @param schema Zod body schema to use
 */
export const parseSchema =
    (schema: z.ZodObject<any> | z.ZodRecord<any>): AppMiddleware =>
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
