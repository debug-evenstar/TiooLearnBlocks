declare class AudioManager {
    sound_on: boolean;
    constructor();
    toggleSound(): void;
    playSound(sound: any): void;
    playCorrect(): void;
    playContinue(): void;
    playWrong(): void;
    playSave(): void;
}
export declare const audioManager: AudioManager;
export {};
