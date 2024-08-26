import { GoRocket } from "react-icons/go";
import catImg from "img/popup/cat.webp"
const StartScreen = () => {
  return (
    <div className="w-full h-full flex items-center justify-center ">

      <div className="flex flex-col items-center gap-y-3">
        <img src={catImg} alt="" className="w-1/2"/>
        <p className="flex items-center gap-x-3">
          <span>Click on a lesson to get started</span> <GoRocket />
        </p>
      </div>

    </div>
  );
}


export default StartScreen;