export const objectsAreIdentical = (obj1 : any, obj2 : any) => {
    return !Object.keys(obj1).filter((key : string) => {
        return !obj2.hasOwnProperty(key) || (obj2[key] !== obj1[key])
    }).length || (Object.keys(obj1).length !== Object.keys(obj2).length);
}