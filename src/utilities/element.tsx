import React from "react";

export const lastElementNode : any = (element : React.ReactElement) => {
    return element.props.children && React.isValidElement(element.props.children) 
        ? lastElementNode(element.props.children)
        : element;
} 

export const elementIndexInParent  : any = (element : HTMLElement) => {
    const parentChildren = element.parentElement?.children;
    if ( parentChildren ) {
        for (let index = 0; index < parentChildren.length; index++) {
            const child = parentChildren[index];
            if(element == child){
                return index;
            }
        }
    }

}
