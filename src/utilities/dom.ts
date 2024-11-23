import md5 from "md5";

export const includeScript = (scriptUrl : string) => {
    if (!document.getElementById(md5(scriptUrl))) {
        const script = document.createElement("script");
        script.src = scriptUrl;
        script.id = md5(scriptUrl);
        document.body.appendChild(script)
    }
}