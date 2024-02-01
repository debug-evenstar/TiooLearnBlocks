import React, { FC, ReactElement, useEffect, useState } from "react";
import { EditorialManagerInterface } from "./EditorialManager";

interface Props {
  children: Function;
  manager: EditorialManagerInterface;
}

const EditorialStateManager: FC<Props> = ({ children, manager }) => {
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

export default EditorialStateManager;
