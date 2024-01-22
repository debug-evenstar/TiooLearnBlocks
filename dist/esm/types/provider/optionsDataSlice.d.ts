export declare const optionsDataSlice: import("@reduxjs/toolkit").Slice<{
    value: {
        identifier: string;
        correctOption: string;
        wrongOption: string;
        objectiveIndex: number;
    };
}, {
    handleSetIdentifier: (state: {
        value: {
            identifier: string;
            correctOption: string;
            wrongOption: string;
            objectiveIndex: number;
        };
    }, action: {
        payload: any;
        type: string;
    }) => void;
    handleSetCorrectOption: (state: {
        value: {
            identifier: string;
            correctOption: string;
            wrongOption: string;
            objectiveIndex: number;
        };
    }, action: {
        payload: any;
        type: string;
    }) => void;
    handleSetWrongOption: (state: {
        value: {
            identifier: string;
            correctOption: string;
            wrongOption: string;
            objectiveIndex: number;
        };
    }, action: {
        payload: any;
        type: string;
    }) => void;
    handleSetObjectiveIndex: (state: {
        value: {
            identifier: string;
            correctOption: string;
            wrongOption: string;
            objectiveIndex: number;
        };
    }, action: {
        payload: any;
        type: string;
    }) => void;
    refreshOptionsData: (state: {
        value: {
            identifier: string;
            correctOption: string;
            wrongOption: string;
            objectiveIndex: number;
        };
    }) => void;
}, "optionsData", "optionsData", import("@reduxjs/toolkit").SliceSelectors<{
    value: {
        identifier: string;
        correctOption: string;
        wrongOption: string;
        objectiveIndex: number;
    };
}>>;
export declare const handleSetIdentifier: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "optionsData/handleSetIdentifier">, handleSetCorrectOption: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "optionsData/handleSetCorrectOption">, handleSetWrongOption: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "optionsData/handleSetWrongOption">, refreshOptionsData: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"optionsData/refreshOptionsData">, handleSetObjectiveIndex: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "optionsData/handleSetObjectiveIndex">;
declare const _default: import("redux").Reducer<{
    value: {
        identifier: string;
        correctOption: string;
        wrongOption: string;
        objectiveIndex: number;
    };
}, import("redux").UnknownAction, {
    value: {
        identifier: string;
        correctOption: string;
        wrongOption: string;
        objectiveIndex: number;
    };
}>;
export default _default;
