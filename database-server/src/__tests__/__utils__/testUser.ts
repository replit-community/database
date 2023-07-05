import { requestBuilder } from "./RequestBuilder";

export const testUsername = "testUser";
export const testPassword = "testUserPassword";

/**
 * Ensure test user exists by creating it
 * @returns Fetch response
 */
export const createTestUser = () =>
    requestBuilder()
        .post("/user")
        .setHeader("Content-Type", "application/json")
        .setBody("username", testUsername)
        .setBody("password", testPassword)
        .setBody("confirmPassword", testPassword)
        .exec();

/**
 * Log into the test user
 * @returns Token
 */
export const loginTestUser = () =>
    requestBuilder()
        .post("/user/login")
        .setHeader("Content-Type", "application/json")
        .setBody("username", testUsername)
        .setBody("password", testPassword)
        .exec();
