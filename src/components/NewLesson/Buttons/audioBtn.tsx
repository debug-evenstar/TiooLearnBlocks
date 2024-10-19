import muteImg from "../../../img/mute.svg";
import { audioManager } from "../AudioManager/AudioManager";
import { audioButtonStyle } from "./styles";

const AudioButton = () => {
    const handleSoundToggleClick = () => {
        audioManager.toggleSound();
    };
    return (
        <button
            onClick={handleSoundToggleClick}
            className={audioButtonStyle()}
        >
            <img src={muteImg} className="w-[25px]" alt="" />
        </button>
    );
};

export default AudioButton;
