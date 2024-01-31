import React, { FC, ReactElement, useEffect, useState } from "react";
import { EditorialManagerInterface } from "./EditorialManager";

interface Props {
  children: ReactElement;
  manager: EditorialManagerInterface;
}

const EditorialStateManager: FC<Props> = ({ children, manager }) => {
  const [editorialState, setEditorialState] = useState(manager.states);

  useEffect(() => {
    setEditorialState(manager.states);
  }, [manager.states]);

  return <div>{children}</div>;
};

export default EditorialStateManager;
