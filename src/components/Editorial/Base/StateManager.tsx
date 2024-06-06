import React, { FC, ReactElement, useEffect, useState } from "react";
import { ManagerInterface } from "./Manager";

interface Props {
  children: Function;
  manager: ManagerInterface;
}

const StateManager: FC<Props> = ({ children, manager }) => {
  const [editorialState, setEditorialState] = useState(manager.states);

  useEffect(()=>{
    manager.triggerRender = () => {;
      setEditorialState({
        ...manager.states
      });
    }
  },[manager]);

  return <div>{children()}</div>;
};

export default StateManager;
