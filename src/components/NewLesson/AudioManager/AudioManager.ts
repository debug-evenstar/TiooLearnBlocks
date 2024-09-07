

class AudioManager {
  sound_on = false;
  sound_store: any = {};
  constructor(){
    // const settings = localStorage.getItem('sound_settings');
    // if(settings){
    //   const config = JSON.parse(settings);
    //   this.sound_on = config.sound_on;
    // }
    this.loadSound("correct","https://res.cloudinary.com/dbgorivob/video/upload/v1724531976/onxko3tgciatas5tzfqc.mp3");
    this.loadSound("continue","https://res.cloudinary.com/dbgorivob/video/upload/v1724531976/dnatog5ulj3gk9gdljn2.mp3");
    this.loadSound("wrong","https://res.cloudinary.com/dbgorivob/video/upload/v1724531977/akqquxh60ycfqzd1gpra.mp3");
    this.loadSound("save","https://res.cloudinary.com/dbgorivob/video/upload/v1724531976/ifqdu3wszmmcctnme41t.mp3");
    
  }

  public toggleSound(){
    const settings = {
      sound_on: !this.sound_on,
    }
    this.sound_on = !this.sound_on;
    localStorage.setItem('sound_settings',JSON.stringify(settings));
  }


  public loadSound(key: string, url: string ){
    this.sound_store[key] = new Audio(url);
  }

  public playSound(key: string) {
    const player = this.sound_store[key];
    player.volume = 0.7
    player.play();
}

  public playCorrect() {
    this.playSound("correct");
  }
  public playContinue(){
    this.playSound("continue");
  }
  public playWrong(){
    this.playSound("wrong");
  }
  public playSave() {
    this.playSound("save");
  }
}



export const audioManager = new AudioManager();
