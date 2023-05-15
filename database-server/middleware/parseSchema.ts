import type { Middleware } from "koa";
import { z } from "zod";

import type { MiddlewareResponse } from "./types";
import type { State } from "api/types";

export const parseSchema =
    (schema: z.ZodObject<any>): Middleware<State> =>
    async (ctx, next) => {
        const result = schema.safeParse(ctx.request.body);
        if (!result.success) {
            // return stringified zod error
            ctx.status = 400;
            ctx.body = {
                success: false,
                message: result.error.issues
                    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
                    .join("; "),
            } satisfies MiddlewareResponse;

            return;
        }

        // save result into state
        ctx.state.body = result.data;
        await next();
    };
