export declare const activeViewboxSlice: import("@reduxjs/toolkit").Slice<{
    value: string;
}, {
    handleSetActiveViewbox: (state: {
        value: string;
    }, action: {
        payload: any;
        type: string;
    }) => void;
    refreshActiveViewbox: (state: {
        value: string;
    }) => void;
}, "activeViewbox", "activeViewbox", import("@reduxjs/toolkit").SliceSelectors<{
    value: string;
}>>;
export declare const handleSetActiveViewbox: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "activeViewbox/handleSetActiveViewbox">, refreshActiveViewbox: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"activeViewbox/refreshActiveViewbox">;
declare const _default: import("redux").Reducer<{
    value: string;
}, import("redux").UnknownAction, {
    value: string;
}>;
export default _default;
