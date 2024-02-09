export declare const rightSidebarSlice: import("@reduxjs/toolkit").Slice<{
    value: boolean;
}, {
    handleToggleSidebarState: (state: {
        value: boolean;
    }) => void;
    handleSetSidebarState: (state: {
        value: boolean;
    }, action: {
        payload: any;
        type: string;
    }) => void;
    refreshToggleSidebarState: (state: {
        value: boolean;
    }) => void;
}, "rightSidebar", "rightSidebar", import("@reduxjs/toolkit").SliceSelectors<{
    value: boolean;
}>>;
export declare const handleToggleSidebarState: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"rightSidebar/handleToggleSidebarState">, handleSetSidebarState: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "rightSidebar/handleSetSidebarState">, refreshToggleSidebarState: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"rightSidebar/refreshToggleSidebarState">;
declare const _default: import("redux").Reducer<{
    value: boolean;
}, import("redux").UnknownAction, {
    value: boolean;
}>;
export default _default;
