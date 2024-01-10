export const baseApiHost = () => {
    return window.location.href.toLowerCase().includes("beta") || window.location.href.toLowerCase().includes("localhost")
        ? "https://beta.api.hellotioo.com"
        : "https://api.hellotioo.com";
}