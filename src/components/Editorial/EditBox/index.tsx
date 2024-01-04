import { FC, useRef, useState } from "react";

const EditBox: FC<any> = ({ id, children, boxConfiguration }) => {
  return (
    <div
      className="m-5 p-2 dasheds rounded"
      style={{
        width: boxConfiguration.width + "px",
        height: boxConfiguration.height + "px",
      }}
    >
      {children}
    </div>
  );
};

export default EditBox;
