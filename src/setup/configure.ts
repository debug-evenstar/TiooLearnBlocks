
interface ConfigurationOptions {
    baseUrl : string;
}

const Configuration = {
    save( config : ConfigurationOptions) {
        localStorage.setItem("LB_CONFIG", JSON.stringify(config));
    },
    load() : ConfigurationOptions | null {
        const getConfig = localStorage.getItem("LB_CONFIG");
        return getConfig ? JSON.parse(getConfig) : null;
    }
}

export default Configuration;