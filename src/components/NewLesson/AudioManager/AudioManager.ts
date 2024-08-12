import correctAudio from "audio/correct.mp3";
import saveAudio from "audio/save.mp3";
import wrongAudio from "audio/wrong.mp3";

export class AudioManager {
  playSound(sound: any) {
    const player = new Audio(sound);
    player.play();
  }
  playCorrect() {
    this.playSound(correctAudio);
  }

  playWrong(){
    this.playSound(wrongAudio);
  }

  playSave() {
    this.playSound(saveAudio);
  }
}