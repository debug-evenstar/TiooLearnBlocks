interface ConfigurationOptions {
    baseUrl: string;
    token: string;
    authType: string;
}
declare const Configuration: {
    save(config: ConfigurationOptions): void;
    load(): ConfigurationOptions | null;
};
export default Configuration;
