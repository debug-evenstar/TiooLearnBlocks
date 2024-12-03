export interface EventManagerInterface {
    state: {
        [key: string]: any;
    };
    emit: Function;
    listen: Function;
}
export declare class EventManager implements EventManagerInterface {
    state: {
        [key: string]: any;
    };
    constructor();
    emit(eventName: string, data: any): void;
    listen(eventName: string, callback: Function): void;
}
export declare const onKeyCombination: (element: HTMLElement, keys: string[], callback: Function) => void;
