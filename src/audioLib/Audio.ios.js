/* eslint-disable arrow-parens */
import Sound from 'react-native-sound';

class Audio {
  static unload() {
    // ios needs to match .web implementation
  }

  constructor(audio, desc, options = {}) {
    // do we need this? or can this be set in index.ios.js?
    Sound.setCategory('Playback');

    // function binding
    this.stop = this.stop.bind(this);
    this.seek = this.seek.bind(this);
    this.play = this.play.bind(this);
    this.loadCallback = this.loadCallback.bind(this);

    this.desc = desc;

    this.sound = new Sound(audio, this.loadCallback); // for sound clips that are used from require.
    this.sound.playing = () => this.playing; // to match web package this needs to be a getter function
    // which all of our games use anyway from sound maps

    // set default callbacks if not specified
    this.onPlayEnd = 'onend' in options ? options.onend : () => { };
    this.onPlay = 'onplay' in options ? options.onplay : () => { };
  }

  play() {
    // FIXME: horrible hack to wait until audio is fully loaded
    if (!this.sound.isLoaded()) {
      setTimeout(this.play, 100);
      return;
    }

    this.playing = true;
    this.onPlay();

    this.sound.play(success => {
      if (success && this.onPlayEnd) {
        this.playing = false;
        this.onPlayEnd();
      }
    });
  }

  /**
   * Set the position of playback for a sound.
   *
   * @param {number} time The position to move current playback to (in milliseconds).
   */
  seek(time) {
    this.sound.setCurrentTime(time / 1000);
  }

  stop() {
    this.sound.stop(() => { });
    this.playing = false;
  }

  // duration of loaded track. will return 0 if track hasn't loaded yet
  duration() {
    return this.sound.getDuration();
  }

  playWithDelay(delay) {
    setTimeout(this.play, delay);
  }

  /* eslint-disable no-unused-vars, class-methods-use-this */
  loadCallback(error, sound) {
    if (error) {
      console.log(
        `Failed to load ${this.desc} audio: `,
        error.code,
        error.description,
      );
    }
  }

  // newVolume should be between 0(silent) and 1(full volume)
  setVolume(newVolume) {
    this.sound.setVolume(newVolume);
  }

  // newVolume should be between 0(silent) and 1(full volume)
  fadeVolume(newVolume, duration) {
    // seems like react-native-sound doesn't offer tools for smoothly adjusting volume of a sound.
    this.sound.setVolume(newVolume);
  }
}

export default Audio;
