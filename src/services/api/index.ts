import { baseApiHost } from "utilities/url";

const Request = async (
    method: string,
    url: string,
    body?: FormData | { [key: string]: string },
    callback?: Function
) => {
    const fullUrl = `${baseApiHost()}/${url}`;
    const response = await fetch(fullUrl, {
        method: method,
        headers: {
            ...(body instanceof FormData
                ? {}
                : { "Content-Type": "application/json" }),
        },
        body: body instanceof FormData ? body : JSON.stringify(body),
    });
    if (!response.ok) {
        callback && callback();
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    callback && callback();
    return response.json();
};

export class Api {
    static async get(url: string) {
        return Request("GET", url);
    }
    static async post(url: string, data: any) {
        return Request("POST", url, data);
    }
    static async put(url: string, data: any) {
        return Request("PUT", url, data);
    }
}
