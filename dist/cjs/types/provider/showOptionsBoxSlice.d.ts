export declare const showOptionsBoxSlice: import("@reduxjs/toolkit").Slice<{
    value: boolean;
}, {
    handleToggleShowOptionBox: (state: {
        value: boolean;
    }) => void;
    handleSetShowOptionBox: (state: {
        value: boolean;
    }, action: {
        payload: any;
        type: string;
    }) => void;
    refreshToggleShowOptionBox: (state: {
        value: boolean;
    }) => void;
}, "showOptionsBox", "showOptionsBox", import("@reduxjs/toolkit").SliceSelectors<{
    value: boolean;
}>>;
export declare const handleToggleShowOptionBox: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"showOptionsBox/handleToggleShowOptionBox">, handleSetShowOptionBox: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "showOptionsBox/handleSetShowOptionBox">, refreshToggleShowOptionBox: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"showOptionsBox/refreshToggleShowOptionBox">;
declare const _default: import("redux").Reducer<{
    value: boolean;
}, import("redux").UnknownAction, {
    value: boolean;
}>;
export default _default;
