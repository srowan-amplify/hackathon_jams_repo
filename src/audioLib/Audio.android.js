import Sound from 'react-native-sound';

class Audio {
  static unload() {
    // android needs to match .web implementation
  }

  constructor(audio, desc, options = {}) {
    // do we need this? or can this be set in index.ios.js?
    Sound.setCategory('Playback');

    // function binding
    this.play = this.play.bind(this);

    this.desc = desc;
    this.sound = new Sound(
      audio,
      Sound.MAIN_BUNDLE,
      this.loadCallback.bind(this),
    );

    this.logAudioEvent = this.logAudioEvent.bind(this);

    // set default callbacks if not specified
    this.onPlayEnd = 'onend' in options ? options.onend : () => {};
    this.onPlay = 'onplay' in options ? options.onplay : () => {};
  }

  logAudioEvent(i) {
    this.lintsucks = i;
    // console.log(`${this.desc}: ${i}`);
  }

  play() {
    // FIXME: horrible hack to wait until audio is fully loaded
    if (!this.sound.isLoaded()) {
      // console.log(`Attempting to play ${this.desc}, but sound isn't fully loaded.`);
      setTimeout(() => {
        this.logAudioEvent('re-loading track');
        this.play();
      }, 100);
      return;
    }

    this.logAudioEvent('track loaded successfully');

    this.onPlay();

    this.logAudioEvent('starting playing');
    this.sound.play((success) => {
      if (!success) {
        this.logAudioEvent('playing failed');
        // console.log(`Playback of ${this.desc} audio failed due to audio decoding error`);
      } else {
        this.logAudioEvent('playing finished');
      }

      this.onPlayEnd();
    });

    // FIXME: one more hack: sometimes on android audio is never finished
    // practically it is finished, but it's never marked as finished
    // so the page which should be displayed after audio is finished - just never gets displayed
    // here we just terminate audio if it wasn't started or stuck
    const interval = setInterval(() => {
      this.sound.getCurrentTime((seconds, isPlaying) => {
        if (isPlaying && seconds && seconds < this.sound.getDuration()) {
          // this.logAudioEvent('playing is in progress - ' + seconds + ' second');
        }
        if (!seconds) {
          clearInterval(interval);

          this.onPlayEnd();

          this.logAudioEvent('terminated by interval - was not started');
        } else if (seconds > this.sound.getDuration()) {
          // actually this happens very rarely
          clearInterval(interval);

          this.onPlayEnd();

          this.logAudioEvent('terminated by interval - time exceeded');
        }
      });
    }, 500);
  }

  playWithDelay(delay) {
    setTimeout(this.play, delay);
  }

  loadCallback(error) {
    this.lintsucks = true;
    if (error) {
      // console.log(`Failed to load ${this.desc} audio: `, error.code, error.description);
    }
  }
}

export default Audio;
