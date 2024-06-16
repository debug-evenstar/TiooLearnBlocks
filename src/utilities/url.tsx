export const baseApiHost = () => {
    if (window.location.href.toLowerCase().includes("beta") ){
        return "https://beta.api.hellotioo.com";
    }
    if (window.location.href.toLowerCase().includes("localhost")) {
        return "http://localhost:8085";
    }
    return "https://api.hellotioo.com";
}