import { describe, it, expect, beforeAll, afterAll } from "vitest";

import { createApp, type DisposeApp } from "createApp";
import { requestBuilder } from "./utils/RequestBuilder";
import { loginTestUser } from "./utils/testUser";

describe("bin methods", () => {
    let disposeApp: DisposeApp;
    let token: string;
    let binId: string;

    beforeAll(async () => {
        disposeApp = await createApp();
        token = await loginTestUser().then((res) => res.text());
    });

    afterAll(async () => {
        if (disposeApp) {
            disposeApp();
        }

        // remove bin since we're done with it
        await requestBuilder()
            .delete(`/bin/${binId}`)
            .setQuery("token", token)
            .exec();
    });

    it("should fetch bin", async () => {
        const response = await requestBuilder()
            .get(`/bin/${binId}`)
            .setHeader("Content-Type", "application/json")
            .setQuery("token", token)
            .exec();

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual(
            expect.objectContaining({
                _id: binId,
            })
        );
    });
});
