import React from "react";

export const lastElementNode : any = (element : React.ReactElement) => {
    return element.props.children && React.isValidElement(element.props.children) 
        ? lastElementNode(element.props.children)
        : element;
} 
