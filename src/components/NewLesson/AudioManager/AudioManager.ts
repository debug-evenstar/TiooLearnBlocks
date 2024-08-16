import correctAudio from "audio/correct.mp3";
import saveAudio from "audio/save.mp3";
import wrongAudio from "audio/wrong.mp3";
import continueAudio from "audio/continue.mp3";



class AudioManager {
  sound_on = false;

  constructor(){
    const settings = localStorage.getItem('sound_settings');
    if(settings){
      const config = JSON.parse(settings);
      this.sound_on = config.sound_on;
    }
  }

  public toggleSound(){
    const settings = {
      sound_on: !this.sound_on,
    }
    this.sound_on = !this.sound_on;
    localStorage.setItem('sound_settings',JSON.stringify(settings));
  }

  public playSound(sound: any) {
    const player = new Audio(sound);
    player.volume = 0.7
    this.sound_on && player.play();
    // player.play();
  }

  public playCorrect() {
    this.playSound(correctAudio);
  }
  public playContinue(){
    this.playSound(continueAudio);
  }
  public playWrong(){
    this.playSound(wrongAudio);
  }

  public playSave() {
    this.playSound(saveAudio);
  }
}



export const audioManager = new AudioManager();