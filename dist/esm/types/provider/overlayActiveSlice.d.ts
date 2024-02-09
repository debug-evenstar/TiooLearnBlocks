export declare const overlayActiveSlice: import("@reduxjs/toolkit").Slice<{
    value: boolean;
}, {
    handleToggleOverlayState: (state: {
        value: boolean;
    }) => void;
    handleSetOverlayState: (state: {
        value: boolean;
    }, action: {
        payload: any;
        type: string;
    }) => void;
    refreshToggleOverlayState: (state: {
        value: boolean;
    }) => void;
}, "overlayActive", "overlayActive", import("@reduxjs/toolkit").SliceSelectors<{
    value: boolean;
}>>;
export declare const handleToggleOverlayState: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"overlayActive/handleToggleOverlayState">, handleSetOverlayState: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "overlayActive/handleSetOverlayState">, refreshToggleOverlayState: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"overlayActive/refreshToggleOverlayState">;
declare const _default: import("redux").Reducer<{
    value: boolean;
}, import("redux").UnknownAction, {
    value: boolean;
}>;
export default _default;
