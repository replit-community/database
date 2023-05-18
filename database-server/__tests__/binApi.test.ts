import { describe, it, expect, beforeAll } from "vitest";

import { requestBuilder } from "./utils/RequestBuilder";
import { loginTestUser } from "./utils/testUser";
import type { IBin } from "models/Bin";

describe("bin API key", () => {
    let token: string;
    let binId: string;
    let apiKey: string;

    beforeAll(async () => {
        token = await loginTestUser().then((res) => res.text());
        binId = await requestBuilder()
            .post("/bin")
            .setQuery("token", token)
            .exec()
            .then((res) => res.text());
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
            .setHeader("Content-Type", "application/json")
            .setQuery("token", token)
            .setBody("allowedIPs", ["*"])
            .setBody("permissions", ["READ", "WRITE"])
            .exec();

        expect(updateResponse.status).toBe(200);
        expect(await updateResponse.text()).toBe("Updated API Key");

        it("should retrieve updated api key contents", async () => {
            const getResponse = await requestBuilder()
                .get(`/bin/${binId}`)
                .setQuery("token", token)
                .exec();

            const json = (await getResponse.json()) as IBin;

            expect(getResponse.status).toBe(200);
            expect(json.apiKeys.find(({ key }) => key === apiKey)).toEqual(
                expect.objectContaining({
                    key: apiKey,
                    allowedIPs: ["*"],
                    permissions: ["READ", "WRITE"],
                })
            );
        });
    });

    it("should set data", async () => {
        const setResponse = await requestBuilder()
            .put(`/bin/${binId}/path`)
            .setHeader("Authorization", `Bearer ${apiKey}`)
            .setHeader("Content-Type", "application/json")
            .setBody("test", "Hello")
            .setBody("testKey", "Hello World")
            .exec();

        expect(setResponse.status).toBe(200);
        expect(await setResponse.text()).toBe("Added keys to data");

        it("should get key", async () => {
            const getResponse = await requestBuilder()
                .get(`/bin/${binId}/path/test`)
                .setHeader("Authorization", `Bearer ${apiKey}`)
                .exec();

            expect(getResponse.status).toBe(200);
            expect(await getResponse.text()).toBe("Hello");
        });

        it("should get all data", async () => {
            const getResponse = await requestBuilder()
                .get(`/bin/${binId}/path`)
                .setHeader("Authorization", `Bearer ${apiKey}`)
                .exec();

            expect(getResponse.status).toBe(200);
            expect(await getResponse.json()).toEqual({
                test: "Hello",
                testKey: "Hello World",
            });
        });

        it("should get key with prefix", async () => {
            const getResponse = await requestBuilder()
                .get(`/bin/${binId}/path/prefix/testK`)
                .setHeader("Authorization", `Bearer ${apiKey}`)
                .exec();

            expect(getResponse.status).toBe(200);
            expect(await getResponse.json()).toEqual({
                testKey: "Hello World",
            });
        });
    });

    it("should delete data", async () => {
        const deleteResponse = await requestBuilder()
            .delete(`/bin/${binId}/path/test`)
            .setHeader("Authorization", `Bearer ${apiKey}`)
            .exec();

        expect(await deleteResponse.text()).toBe("Deleted path");
        expect(deleteResponse.status).toBe(200);

        it("should get nothing", async () => {
            const getResponse = await requestBuilder()
                .get(`/bin/${binId}/path/test`)
                .setHeader("Authorization", `Bearer ${apiKey}`)
                .exec();

            expect(getResponse.status).toBe(404);
            expect(await getResponse.text()).toBe("Path does not exist");
        });

        it("should delete nothing", async () => {
            const deleteResponse = await requestBuilder()
                .delete(`/bin/${binId}/path/test`)
                .setHeader("Authorization", `Bearer ${apiKey}`)
                .exec();

            expect(deleteResponse.status).toBe(404);
            expect(await deleteResponse.text()).toBe("Path does not exist");
        });
    });

    it("should delete bin", async () => {
        const deleteResponse = await requestBuilder()
            .delete(`/bin/${binId}`)
            .setQuery("token", token)
            .exec();

        expect(deleteResponse.status).toBe(200);
        expect(await deleteResponse.text()).toBe("Deleted bin");
    });

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
