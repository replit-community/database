import type { Middleware, ParameterizedContext } from "koa";
import type Router from "@koa/router";
import type { IBin } from "models/Bin";
import type { IUser } from "models/User";
import type { HydratedDocument } from "mongoose";

export interface AppState {
    bin?: HydratedDocument<IBin>;
    user?: HydratedDocument<IUser>;
    body?: Record<string, unknown>;
}

export type AppMiddleware = Middleware<AppState>;
export type AppContext<T = void> = ParameterizedContext<T & AppState>;
export type AppRouter = Router<AppState, AppContext>;
