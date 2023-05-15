export interface MiddlewareResponse {
    success: boolean;
    message: string;
    data?: Record<string, unknown>;
}
