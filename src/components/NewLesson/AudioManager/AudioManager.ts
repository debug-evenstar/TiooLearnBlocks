

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
    this.playSound("https://res.cloudinary.com/dbgorivob/video/upload/v1724531976/onxko3tgciatas5tzfqc.mp3");
  }
  public playContinue(){
    this.playSound("https://res.cloudinary.com/dbgorivob/video/upload/v1724531976/dnatog5ulj3gk9gdljn2.mp3");
  }
  public playWrong(){
    this.playSound("https://res.cloudinary.com/dbgorivob/video/upload/v1724531976/ifqdu3wszmmcctnme41t.mp3");
  }
  public playSave() {
    this.playSound("https://res.cloudinary.com/dbgorivob/video/upload/v1724531977/akqquxh60ycfqzd1gpra.mp3");
  }
}



export const audioManager = new AudioManager();
