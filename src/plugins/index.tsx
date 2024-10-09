import React, {
    FC,
    forwardRef,
    useImperativeHandle,
    useState,
} from "react";

const SetupPlugins: FC<{
    plugins: any[];
    ref: React.ForwardedRef<{ togglePlugin: Function }>;
}> = forwardRef(({ plugins }, ref) => {
    const [pluginConfig, setPluginConfig] = useState<any>(
        plugins.reduce((prev: any, curr: any) => {
            prev[curr.name] = { show: false, element: curr.element };
            return prev;
        }, {})
    );
    const [callbacks, setCallbacks] = useState<any>({});

    const togglePluginState = (pluginName: string) => {
        setPluginConfig(() => ({
            ...pluginConfig,
            [pluginName]: {
                ...pluginConfig[pluginName],
                show: !pluginConfig[pluginName].show,
            },
        }));
    };

    useImperativeHandle(ref, () => ({
        togglePlugin(pluginName: string, callback: Function = () => {}) {
            togglePluginState(pluginName);
            setCallbacks((prev: any) => ({ ...prev, [pluginName]: callback }));
        },
    }));

    return (
        <>
            {Object.keys(pluginConfig).map((pluginName: string) => {
                const plugin = pluginConfig[pluginName];
                const PluginElement = plugin.element;
                return (
                    <>
                        {plugin.show && (
                            <PluginElement
                                close={() => togglePluginState(pluginName)}
                                callback={callbacks[pluginName] ?? (() => {})}
                            />
                        )}
                    </>
                );
            })}
        </>
    );
});

export default SetupPlugins;
