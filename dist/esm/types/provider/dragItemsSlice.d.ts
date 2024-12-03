export declare const dragItemsSlice: import("@reduxjs/toolkit").Slice<{
    value: never[];
}, {
    handleSetDragItems: (state: {
        value: never[];
    }, action: {
        payload: any;
        type: string;
    }) => void;
    refreshDragItems: (state: {
        value: never[];
    }) => void;
}, "dragItems", "dragItems", import("@reduxjs/toolkit").SliceSelectors<{
    value: never[];
}>>;
export declare const handleSetDragItems: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "dragItems/handleSetDragItems">, refreshDragItems: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"dragItems/refreshDragItems">;
declare const _default: import("redux").Reducer<{
    value: never[];
}, import("redux").UnknownAction, {
    value: never[];
}>;
export default _default;
