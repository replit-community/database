import { describe, it, expect, beforeAll } from "vitest";

import { requestBuilder } from "./__utils__/RequestBuilder";
import { loginTestUser } from "./__utils__/testUser";

const binTitle = "Testing Grounds";
const binDescription = "Awesome Bin";

describe("bin methods", () => {
    let token: string;
    let binId: string;

    beforeAll(async () => {
        token = await loginTestUser().then((res) => res.text());
    });

    it("should create a new bin", async () => {
        const response = await requestBuilder()
            .post("/bin")
            .setQuery("token", token)
            .exec();

        expect(response.status).toBe(200);
        binId = await response.text();
    });

    it("should not be able to create bin without auth", async () => {
        const response = await requestBuilder().post("/bin").exec();

        expect(response.status).toBe(403);
        expect(await response.text()).toBe("Missing token");
    });

    it("should update bin metadata", async () => {
        const updateResponse = await requestBuilder()
            .put(`/bin/${binId}`)
            .setHeader("Content-Type", "application/json")
            .setQuery("token", token)
            .setBody("title", binTitle)
            .setBody("description", binDescription)
            .exec();

        expect(updateResponse.status).toBe(200);
        expect(await updateResponse.text()).toBe("Successfully updated bin");

        it("should retrieve updated metadata", async () => {
            const getResponse = await requestBuilder()
                .get(`/bin/${binId}`)
                .setHeader("Content-Type", "application/json")
                .setQuery("token", token)
                .exec();

            expect(getResponse.status).toBe(200);
            expect(await getResponse.json()).toEqual(
                expect.objectContaining({
                    _id: binId,
                    title: binTitle,
                    description: binDescription,
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

        it("should make updates impossible", async () => {
            const updateResponse = await requestBuilder()
                .put(`/bin/${binId}`)
                .setHeader("Content-Type", "application/json")
                .setQuery("token", token)
                .setBody("title", binTitle)
                .setBody("description", binDescription)
                .exec();

            expect(updateResponse.status).toBe(404);
            expect(await updateResponse.text()).toBe("Bin does not exist");
        });
    });
});
