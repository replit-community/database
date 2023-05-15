export interface MiddlewareResponse {
    success: boolean;
    message: string;
    data?: Record<string, unknown>;
}

// state keys
export const BIN = "bin";
export const USER = "user";
