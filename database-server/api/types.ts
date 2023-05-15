import type { Middleware, ParameterizedContext } from "koa";
import type Router from "@koa/router";
import type { IBin } from "models/Bin";
import type { IUser } from "models/User";
import type { HydratedDocument } from "mongoose";

export interface State {
    bin?: HydratedDocument<IBin>;
    user?: HydratedDocument<IUser>;
    body?: Record<string, unknown>;
}

export type AppMiddleware = Middleware<State>;
export type AppContext = ParameterizedContext<State>;
export type AppRouter<T = void> = Router<State & T, AppContext>;
