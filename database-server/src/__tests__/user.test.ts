import { describe, it, expect, beforeAll } from "vitest";

import { requestBuilder } from "./__utils__/RequestBuilder";
import { createTestUser, loginTestUser } from "./__utils__/testUser";

describe("User routes", () => {
    beforeAll(async () => {
        await createTestUser();
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
