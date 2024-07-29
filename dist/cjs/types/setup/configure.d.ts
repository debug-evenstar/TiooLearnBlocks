interface ConfigurationOptions {
    baseUrl: string;
}
declare const Configuration: {
    save(config: ConfigurationOptions): void;
    load(): ConfigurationOptions | null;
};
export default Configuration;
