import { describe, it, expect, beforeAll, afterAll } from "vitest";

import { createApp, type DisposeApp } from "createApp";
import { requestBuilder } from "./utils/RequestBuilder";
import { loginTestUser } from "./utils/testUser";

describe("bin API key", () => {
    let disposeApp: DisposeApp;
    let token: string;
    let binId: string;
    let apiKey: string;

    beforeAll(async () => {
        disposeApp = await createApp();
        token = await loginTestUser().then((res) => res.text());
        binId = await requestBuilder()
            .post("/bin")
            .setQuery("token", token)
            .exec()
            .then((res) => res.text());
    });

    afterAll(async () => {
        if (disposeApp) {
            disposeApp();
        }
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

    it("should create api key", async () => {
        const response = await requestBuilder()
            .post(`/bin/${binId}/key`)
            .setQuery("token", token)
            .exec();

        expect(response.status).toBe(200);
        apiKey = await response.text();
    });

    it("it should update the api key", async () => {
        const updateResponse = await requestBuilder()
            .put(`/bin/${binId}/key/${apiKey}`)
            .setQuery("token", token)
            .setBody("allowedIPs", ["127.0.0.1"])
            .setBody("permissions", ["READ", "WRITE"])
            .exec();

        expect(updateResponse.status).toBe(200);
        expect(await updateResponse.text()).toBe("Updated API Key");

        it("should retrieve updated api key contents", async () => {
            const getResponse = await requestBuilder()
                .get(`/bin/${binId}/key/${apiKey}`)
                .setQuery("token", token)
                .exec();

            expect(getResponse.status).toBe(200);
            expect(await getResponse.json()).toEqual(
                expect.objectContaining({
                    allowedIPs: ["127.0.0.1", "*"],
                    permissions: ["READ", "WRITE"],
                })
            );
        });
    });

    it("should delete bin", async () => {
        const deleteResponse = await requestBuilder()
            .delete(`/bin/${binId}`)
            .setQuery("token", token)
            .exec();

        expect(deleteResponse.status).toBe(200);
        expect(await deleteResponse.text()).toBe("Deleted bin");

        it("should make bin unretrievable", async () => {
            const getResponse = await requestBuilder()
                .get(`/bin/${binId}`)
                .setHeader("Content-Type", "application/json")
                .setQuery("token", token)
                .exec();

            expect(getResponse.status).toBe(404);
            expect(await getResponse.text()).toBe("Bin does not exist");
        });
    });
});
