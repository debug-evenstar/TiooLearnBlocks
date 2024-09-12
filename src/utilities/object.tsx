export const objectsAreIdentical = (obj1: any, obj2: any) => {
    return (
        !Object.keys(obj1).filter((key: string) => {
            return !obj2.hasOwnProperty(key) || obj2[key] !== obj1[key];
        }).length || Object.keys(obj1).length !== Object.keys(obj2).length
    );
};

export const objectsAreEqual = (...args: any[]) => {
    let objectString;
    for (let i = 0; i < args.length; i++) {
        if (objectString && objectString !== JSON.stringify(args[i])) {
            return false;
        }
    }
    return true;
};
