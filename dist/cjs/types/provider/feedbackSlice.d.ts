export declare const feedbackSlice: import("@reduxjs/toolkit").Slice<{
    value: {
        optionIndex: number;
        status: boolean;
        type: string;
    };
}, {
    handleSetOptionIndex: (state: {
        value: {
            optionIndex: number;
            status: boolean;
            type: string;
        };
    }, action: {
        payload: any;
        type: string;
    }) => void;
    handleSetFeedbackStatus: (state: {
        value: {
            optionIndex: number;
            status: boolean;
            type: string;
        };
    }, action: {
        payload: any;
        type: string;
    }) => void;
    handleSetFeedbackType: (state: {
        value: {
            optionIndex: number;
            status: boolean;
            type: string;
        };
    }, action: {
        payload: any;
        type: string;
    }) => void;
    handleToggleFeedbackStatus: (state: {
        value: {
            optionIndex: number;
            status: boolean;
            type: string;
        };
    }) => void;
    refreshFeedbackData: (state: {
        value: {
            optionIndex: number;
            status: boolean;
            type: string;
        };
    }) => void;
}, "feedback", "feedback", import("@reduxjs/toolkit").SliceSelectors<{
    value: {
        optionIndex: number;
        status: boolean;
        type: string;
    };
}>>;
export declare const handleSetOptionIndex: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "feedback/handleSetOptionIndex">, handleSetFeedbackStatus: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "feedback/handleSetFeedbackStatus">, handleSetFeedbackType: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "feedback/handleSetFeedbackType">, handleToggleFeedbackStatus: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"feedback/handleToggleFeedbackStatus">, refreshFeedbackData: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"feedback/refreshFeedbackData">;
declare const _default: import("redux").Reducer<{
    value: {
        optionIndex: number;
        status: boolean;
        type: string;
    };
}, import("redux").UnknownAction, {
    value: {
        optionIndex: number;
        status: boolean;
        type: string;
    };
}>;
export default _default;
