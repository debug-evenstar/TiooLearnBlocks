import Configuration from "setup/configure"

export const baseApiHost = () => {
    const config = Configuration.load();
    return config?.baseUrl;
}