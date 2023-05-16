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
     * Set header name and value
     * @param name Header name
     * @param value Header value
     * @returns Instance of builder
     */
    header(name: string, value: string) {
        this.headers[name] = value;

        return this;
    }

    /**
     * Set body key and value
     * @param name Body key
     * @param value Body value
     * @returns Instance of builder
     */
    set(name: string, value: string) {
        if (this.method === Method.GET) {
            throw new Error("Cannot add body to GET method");
        }

        this.body[name] = value;

        return this;
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

        const groundedPath = this.path.startsWith("/")
            ? this.path
            : "/" + this.path;

        return fetch(`${baseUrl}${groundedPath}`, options);
    }
}

export const requestBuilder = () => new RequestBuilder();
