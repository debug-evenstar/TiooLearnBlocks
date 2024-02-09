export declare const triggerSlice: import("@reduxjs/toolkit").Slice<{
    value: boolean;
}, {
    handleToggleTrigger: (state: {
        value: boolean;
    }) => void;
    handleSetTrigger: (state: {
        value: boolean;
    }, action: {
        payload: any;
        type: string;
    }) => void;
    refreshToggleTrigger: (state: {
        value: boolean;
    }) => void;
}, "trigger", "trigger", import("@reduxjs/toolkit").SliceSelectors<{
    value: boolean;
}>>;
export declare const handleToggleTrigger: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"trigger/handleToggleTrigger">, handleSetTrigger: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "trigger/handleSetTrigger">, refreshToggleTrigger: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"trigger/refreshToggleTrigger">;
declare const _default: import("redux").Reducer<{
    value: boolean;
}, import("redux").UnknownAction, {
    value: boolean;
}>;
export default _default;
