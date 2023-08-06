import React, { FC,  useState } from "react";
interface TextFieldProps {
  id?: string;
  manager?: any;
}

const TextFieldComponent: FC<TextFieldProps> = ({id, manager}) => {
  const [value, setValue] = useState("");
  const handleChange = (e: any) => {
    setValue(e.target.value);
    manager.setFieldValue(id, e.target.value)
  };

  return (
    <>
      <input
        type="text"
        name="value"
        id={id}
        className="border border-[#4F46E5] px-3 mx-2 input-style w-24 rounded-[20px] "
        onChange={handleChange}
        disabled
      />
    </>
  );
};

export default TextFieldComponent;
