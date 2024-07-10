import muteImg from "../../../img/mute.svg";

const AudioButton = () => (
  <button className="absolute w-fit right-[3rem] outline-none top-[7rem]">
    <img src={muteImg} className="w-[25px]" alt="" />
  </button>
);

export default AudioButton;