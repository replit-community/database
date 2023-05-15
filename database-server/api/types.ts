import type { Middleware, ParameterizedContext } from "koa";
import type Router from "@koa/router";
import type { IApiKey, IBin } from "models/Bin";
import type { IUser } from "models/User";
import type { HydratedDocument } from "mongoose";

export interface AppState {
    bin: HydratedDocument<IBin>;
    binApiKey: IApiKey;
    user: HydratedDocument<IUser>;
    body: Record<string, unknown>;
}

export type AppMiddleware<T = void> = Middleware<AppState & T>;
export type AppContext<T = void> = ParameterizedContext<AppState & T>;
export type AppRouter = Router<AppState, AppContext>;
