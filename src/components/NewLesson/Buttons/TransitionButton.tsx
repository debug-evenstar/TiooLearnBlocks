
import { useState, FC, useEffect } from 'react';

const TransitionButton = ({ strings, handleShowAI }: any) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      const nextIndex = (index >= (strings.length - 1)) ? 0 : index + 1;
      console.log(index)
      setIndex(nextIndex)
    }, 3000);
    // return () => clearTimeout(interval); // 
  }, [index]);


  return (
    <button onClick={handleShowAI} className="text-[#7E1593] px-4 font-[500] w-[150px] h-[30px] flex items-center justify-center text-sm rounded-full flex-col border-[#7E1593] border">
      <span
        className="text-xs"
      >
        {strings[index]}
      </span>

    </button>
  );
};

export default TransitionButton;
