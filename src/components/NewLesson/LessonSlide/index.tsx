import { FC } from "react";
import gifImg from '../../../img/giphy.png';
import sampleImg from '../../../img/sample.png';

const LessonSlide: FC<any> = () => {
  return (
    <div className="flex flex-col items-center py-10">
      <p className="text-main font-[500] text-[20px]">Computer Shortcuts</p>
      <img src={gifImg} alt="" className="mt-4" />
      <p className="text-sm">Identify the various part the image beow</p>
      <img src={sampleImg} alt="" className="mt-3 w-[60%]" />
      <div>

      </div>
    </div>
  );
}


export default LessonSlide;