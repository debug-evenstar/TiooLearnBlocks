import { GoRocket } from "react-icons/go";
import catImg from "img/popup/cat.svg"
const StartScreen = () => {
  return (
    <div className="w-full h-full flex items-center justify-center ">

      <div className="flex flex-col items-center gap-y-3">
        <div style={{ width: '100%', height: 0, paddingBottom: '100%', position: 'relative' }}>
          <iframe src="https://giphy.com/embed/Jr2jHbWXSp4k2d7vvb" width="100%" height="100%" style={{ position: "absolute" }} frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
        </div>
        <p className="flex items-center gap-x-3">
          <span>Click on a lesson to get started</span> <GoRocket />
        </p>
      </div>

    </div>
  );
}


export default StartScreen;