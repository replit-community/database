import { describe, it, expect, beforeAll, afterAll } from "vitest";

import { requestBuilder } from "../lib/RequestBuilder";
import { createApp, type DisposeApp } from "createApp";

const username = "testUser";
const password = "testUserPassword";

describe("User routes", () => {
    let disposeApp: DisposeApp;

    beforeAll(async () => {
        disposeApp = await createApp();

        // ensure test user exists by creating it
        await requestBuilder()
            .post("/user")
            .header("Content-Type", "application/json")
            .set("username", username)
            .set("password", password)
            .set("confirmPassword", password)
            .exec();
    });

    afterAll(async () => {
        await disposeApp();
    });

    it("Logs into the test user", async () => {
        const result = await requestBuilder()
            .post("/user/login")
            .header("Content-Type", "application/json")
            .set("username", username)
            .set("password", password)
            .exec();

        expect(result.status).toBe(200);
        expect(await result.text()).toBe("Successfully logged in");
    });

    it("Logs out of the new user", async () => {
        const result = await requestBuilder().get("/user/logout").exec();

        expect(result.status).toBe(200);
        expect(await result.text()).toBe("Successfully logged out");
    });
});
