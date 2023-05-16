import { describe, it, expect, beforeAll, afterAll } from "vitest";

import { createApp, type DisposeApp } from "createApp";
import { requestBuilder } from "./utils/RequestBuilder";
import { createTestUser, loginTestUser } from "./utils/testUser";

describe("User routes", () => {
    let disposeApp: DisposeApp;

    beforeAll(async () => {
        disposeApp = await createApp();
    });

    afterAll(async () => {
        if (disposeApp) {
            disposeApp();
        }
    });

    it("Logs into the test user", async () => {
        const result = await loginTestUser();

        expect(result.status).toBe(200);
    });

    it("Logs out of the new user", async () => {
        const result = await requestBuilder().get("/user/logout").exec();

        expect(result.status).toBe(200);
        expect(await result.text()).toBe("Successfully logged out");
    });
});
