import { Howl, Howler } from 'howler';

class Audio {
  static unload() {
    Howler.unload();
  }

  constructor(soundSource, desc, options) {
    this.loaded = false;
    this.loadFailed = false;

    this.onerror = options && options.onerror ? options.onerror : () => { };
    if (options) {
      this.onLoadCallBack = options.onLoadCallBack;
    }

    this.desc = desc;

    this.sound = new Howl({
      src: [soundSource],
      onloaderror: this.onLoadError,
      onload: () => {
        this.loaded = true;
        if (this.onLoadCallBack) {
          this.onLoadCallBack();
        }
      },
      format: ['mp3'],
      ...options,
    });
    this.sound.load();
  }

  /**
   * Play the audio file
   */
  play = () => {
    this.sound.play();
  }

  /**
   * Play an audio file after a specified delay
   * @param delay ms to wait before playing sound
   */
  playWithDelay(delay) {
    setTimeout(this.play, delay);
  }

  /**
   * Set the position of playback for a sound.
   * @param {number} time The position to move current playback to (in milliseconds).
   */
  seek = (time) => {
    this.sound.seek(time / 1000);
  }

  /**
   * stop the sound that is playing
   */
  stop = () => {
    if (this.sound.playing()) {
      this.sound.stop();
    }
  }

  // duration of loaded track. will return 0 if track hasn't loaded yet
  duration() {
    return this.sound.duration();
  }

  /**
   * Called if audio file failed to load
   * @param soundId id of sound that failed to load
   * @param message error message
   */
  onLoadError = (soundId, message) => {
    this.loadFailed = true;
    this.loadError = message;

    console.warn(`There was a problem loading ${this.desc} for playback: `, message);
    this.onerror(); // callback to alert original caller that the load failed
  }

  // newVolume should be between 0(silent) and 1(full volume)
  setVolume(newVolume) {
    this.sound.volume(newVolume);
  }

  // newVolume should be between 0(silent) and 1(full volume)
  fadeVolume(newVolume, duration) {
    this.sound.fade(this.sound.volume(), newVolume, duration);
  }
}

export default Audio;
