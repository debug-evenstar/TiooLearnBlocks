declare class AudioManager {
    sound_on: boolean;
    sound_store: any;
    constructor();
    toggleSound(): void;
    loadSound(key: string, url: string): void;
    playSound(key: string): void;
    playCorrect(): void;
    playContinue(): void;
    playWrong(): void;
    playSave(): void;
}
export declare const audioManager: AudioManager;
export {};
