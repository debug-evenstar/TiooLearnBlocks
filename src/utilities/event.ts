
import md5 from "md5";

export interface EventManagerInterface {
    state: { [key: string]: any };
    emit: Function;
    listen: Function;
}


export class EventManager implements EventManagerInterface {
    state: { [key: string]: any; };
    constructor() {
        this.state = {};
    }

    emit( eventName : string, data : any) {
        if( this.state.hasOwnProperty(eventName) ) {
            Object.values<Function>(this.state[eventName]).forEach((handler : Function) => {
                handler(data);
            });
        }
    }

    listen( eventName : string, callback : Function) {
        const callbackHash =  md5(callback.toString());
        if( this.state.hasOwnProperty(eventName) ) {
            this.state[eventName][callbackHash] = callback;
        } else {
            this.state[eventName] = {};
            this.state[eventName][callbackHash] = callback;
        }
    }
}