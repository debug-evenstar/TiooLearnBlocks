export const hasIdenticalIndex = (a : any[], b : any[]) => {
    let identical = false;
    a.forEach((item, index) => {
        if(item === b[index]) {
            identical = true;
        }
    });
    return identical;
}