class EventsStorage{
    store : {[key : string] : Function[]};
    constructor(){
        this.store = {};
    }
    addFunctionToStore(eventName : string, func : Function){
        if(!this.store[eventName]){
            this.store[eventName] = [];
        }
        this.store[eventName].push(func);
    }
    callEventFunctions(eventName : string, data : any){
        const functions  = this.store[eventName];
        functions.forEach(func => {
            func(data.detail);
        });
    }
}

export const GlobalEventStorage = new EventsStorage();

export const SlideEvents = {
    NEXT_FIELD : "NEXT_FIELD",
    PROGRESS_UPDATE : "PROGRESS_UPDATE"
}