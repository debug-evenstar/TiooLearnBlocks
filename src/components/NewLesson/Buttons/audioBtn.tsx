import { useState } from "react";
import muteImg from "../../../img/mute.svg";
import { audioManager } from "../AudioManager/AudioManager";

const AudioButton = () => {

  const handleSoundToggleClick = () => {
    audioManager.toggleSound();
  }
  return (
    <button onClick={handleSoundToggleClick} className="absolute w-fit right-[3rem] outline-none top-[7rem]">
    <img src={muteImg} className="w-[25px]" alt="" />
  </button>
  );
}


export default AudioButton;