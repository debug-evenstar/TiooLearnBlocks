declare class EventsStorage {
    store: {
        [key: string]: Function[];
    };
    constructor();
    addFunctionToStore(eventName: string, func: Function): void;
    callEventFunctions(eventName: string, data: any): void;
}
export declare const GlobalEventStorage: EventsStorage;
export declare const SlideEvents: {
    NEXT_FIELD: string;
    PROGRESS_UPDATE: string;
};
export {};
