export declare const sliderSlice: import("@reduxjs/toolkit").Slice<{
    value: {
        activeCompName: string;
        activeCompIndex: number;
    };
}, {
    handleSetActiveCompName: (state: {
        value: {
            activeCompName: string;
            activeCompIndex: number;
        };
    }, action: {
        payload: any;
        type: string;
    }) => void;
    handleSetActiveCompIndex: (state: {
        value: {
            activeCompName: string;
            activeCompIndex: number;
        };
    }, action: {
        payload: any;
        type: string;
    }) => void;
    refreshslider: (state: {
        value: {
            activeCompName: string;
            activeCompIndex: number;
        };
    }) => void;
}, "slider", "slider", import("@reduxjs/toolkit").SliceSelectors<{
    value: {
        activeCompName: string;
        activeCompIndex: number;
    };
}>>;
export declare const handleSetActiveCompName: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "slider/handleSetActiveCompName">, handleSetActiveCompIndex: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "slider/handleSetActiveCompIndex">, refreshslider: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"slider/refreshslider">;
declare const _default: import("redux").Reducer<{
    value: {
        activeCompName: string;
        activeCompIndex: number;
    };
}, import("redux").UnknownAction, {
    value: {
        activeCompName: string;
        activeCompIndex: number;
    };
}>;
export default _default;
