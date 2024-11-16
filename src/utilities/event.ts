
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


class KeyCombination {
    activeKeys: string[];
    targetKeys: string[];
    element? : HTMLElement;
    callback? : Function;
    constructor(Element? : HTMLElement) {
        this.element = Element;
        this.activeKeys = [];
        this.targetKeys = [];
    }
    listen(keys : string[]){
        const entity = this.element ?? document;
        entity.addEventListener("keydown", (e:any)=>{
            if (!this.activeKeys.includes(e.key.toLowerCase())) {
                this.activeKeys.push(e.key.toLowerCase());
            }
            this.verify();
        });
        entity.addEventListener("keyup", (e:any)=>{
            if (this.activeKeys.includes(e.key.toLowerCase())) {
                const keyIndex = this.activeKeys.indexOf(e.key.toLowerCase());
                this.activeKeys.splice(keyIndex, 1);
            }
        });
    }
    capture(keys : string[], callback : Function){
        this.targetKeys = keys.map((k:string) => k.toLowerCase());
        this.listen(keys)
        this.callback = callback;
    }
    verify() {
        if (JSON.stringify(this.activeKeys) == JSON.stringify(this.targetKeys)) {
            this.callback && this.callback();
            // Clear key stack
            setTimeout(() => {
                this.activeKeys = [];
            },4000)
        }
    }
}

export const onKeyCombination = (element: HTMLElement, keys : string[], callback : Function) => {
    (new KeyCombination(element)).capture(keys,callback);
}