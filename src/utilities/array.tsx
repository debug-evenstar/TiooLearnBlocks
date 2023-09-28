export const hasIdenticalIndex = (a : any[], b : any[]) => {
    let identical = false;
    a.forEach((item, index) => {
        if(item === b[index]) {
            identical = true;
        }
    });
    return identical;
}

export const functionsWithDelay = (dataList : any[], action : Function, delay : number) => {
    if (dataList.length > 0) {
        action(dataList[0]);
        if(dataList.length > 1){
            setTimeout(()=>{
                functionsWithDelay(dataList.slice(1), action, delay);
            }, delay);
        }
    }
}