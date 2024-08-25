
import { useState, FC, useEffect } from 'react';

const TransitionButton = ({handleShowAI}: any) => {

  const [isToggled, setIsToggled] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsToggled((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval); // 
  }, []);


  return (
      <button onClick={handleShowAI} className="text-[#7E1593] px-4 font-[500] w-[150px] h-[30px] py-3 text-sm rounded-full flex flex-col border-[#7E1593] border absolute right-10 -top-11"> 
        <span
          className={`absolute inset-0 text-xs flex items-center justify-center transition-opacity duration-300 ease-in-out ${
            isToggled ? 'opacity-0' : 'opacity-100'
          }`}
        >
          AI TUTOR
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
            isToggled ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Explain this screen
        </span>
      </button> 
    );
};

export default TransitionButton;
