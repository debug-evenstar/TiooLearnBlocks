const EventBus = (() => {
    return {
        on : (eventName : string, callback : Function) => {
            document.addEventListener(eventName, (e : any) => {
                callback(e.detail);
            });
        },
        emit : (eventName : string, data : any) => {
            const event = new CustomEvent(eventName, {
                detail : data
            });
            document.dispatchEvent(event);
        }
    }
})();
export default EventBus;