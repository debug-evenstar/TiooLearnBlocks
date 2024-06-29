/// <reference types="redux-persist/types/persistreducer" />
/// <reference types="redux-persist/types/types" />
/// <reference types="redux-persist" />
declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    rightSidebarState: {
        value: boolean;
    };
    dragItems: {
        value: never[];
    };
    activeViewbox: {
        value: string;
    };
    showOptionsBox: {
        value: boolean;
    };
    optionsData: {
        value: {
            identifier: string;
            correctOption: string;
            wrongOption: string;
            objectiveIndex: number;
        };
    };
    feedback: {
        value: {
            optionIndex: number;
            status: boolean;
            type: string;
        };
    };
    trigger: {
        value: boolean;
    };
} & import("redux-persist/es/persistReducer").PersistPartial, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        rightSidebarState: {
            value: boolean;
        };
        dragItems: {
            value: never[];
        };
        activeViewbox: {
            value: string;
        };
        showOptionsBox: {
            value: boolean;
        };
        optionsData: {
            value: {
                identifier: string;
                correctOption: string;
                wrongOption: string;
                objectiveIndex: number;
            };
        };
        feedback: {
            value: {
                optionIndex: number;
                status: boolean;
                type: string;
            };
        };
        trigger: {
            value: boolean;
        };
    } & import("redux-persist/es/persistReducer").PersistPartial, undefined, import("redux").UnknownAction>;
}, {}>, import("redux").StoreEnhancer<{}, {}>]>>;
export declare const persistor: import("redux-persist").Persistor;
export default store;
