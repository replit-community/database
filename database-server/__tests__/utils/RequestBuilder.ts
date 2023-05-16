import fetch, { type RequestInit } from "node-fetch";

const baseUrl = "http://127.0.0.1:3000/api/v1";

enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

class RequestBuilder {
    private path = "/";
    private method = Method.GET;
    private headers: Record<string, string> = {};
    private query = new URLSearchParams();
    private body: Record<string, unknown> = {};

    /**
     * Set request builder method to GET
     * Set path of request
     * @param path Request path
     * @returns Instance of builder
     */
    get(path: string) {
        this.path = path;
        this.method = Method.GET;

        return this;
    }

    /**
     * Set request builder method to POST
     * Set path of request
     * @param path Request path
     * @returns Instance of builder
     */
    post(path: string) {
        this.path = path;
        this.method = Method.POST;

        return this;
    }

    /**
     * Set request builder method to PUT
     * Set path of request
     * @param path Request path
     * @returns Instance of builder
     */
    put(path: string) {
        this.path = path;
        this.method = Method.PUT;

        return this;
    }

    /**
     * Set request builder method to DELETE
     * Set path of request
     * @param path Request path
     * @returns Instance of builder
     */
    delete(path: string) {
        this.path = path;
        this.method = Method.DELETE;

        return this;
    }

    /**
     * Set header key and value
     * @param key Header key
     * @param value Header value
     * @returns Instance of builder
     */
    setHeader(key: string, value: string) {
        this.headers[key] = value;

        return this;
    }

    /**
     * Set query key and value
     * @param key Query key
     * @param value Query value
     * @returns Instance of builder
     */
    setQuery(key: string, value: string) {
        this.query.set(key, value);

        return this;
    }

    /**
     * Set body key and value
     * @param key Body key
     * @param value Body value
     * @returns Instance of builder
     */
    setBody(key: string, value: string) {
        if (this.method === Method.GET) {
            throw new Error("Cannot add body to GET method");
        }

        this.body[key] = value;

        return this;
    }

    /**
     * Assemble the final URL that is fetched
     * @returns Final URL
     */
    getURL() {
        const path = this.path.startsWith("/") ? this.path : "/" + this.path;
        const query = this.query.toString();
        const url = `${baseUrl}${path}${query.length > 0 ? "?" + query : ""}`;

        return url;
    }

    /**
     * Execute request with options
     * @returns Request result
     */
    async exec() {
        const options: RequestInit = {
            method: this.method,
            headers: this.headers,
        };

        // add body if necessary
        if (this.method !== Method.GET && Object.keys(this.body).length > 0) {
            options.body = JSON.stringify(this.body);
        }

        return fetch(this.getURL(), options);
    }
}

export const requestBuilder = () => new RequestBuilder();
