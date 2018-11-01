import Audio from 'root/lib/Audio';
import TaskSequence from 'root/lib/TaskSequence';
import { noop } from './utilityFunctions';

/**
 * Play audio
 *
 * @param audioTrack {string} - base64 audio track
 * /
 * @param audioTrack {{track: string, name: string}} - base64 audio track, name
 * @param onStart {Function} - onStart cb
 * @param onEnd {Function} - onEnd cb
 */
export function playAudio(audioTrack, onStart = noop, onEnd = noop) {
  const track = typeof audioTrack === 'string' ? audioTrack : audioTrack.track;
  const name = typeof audioTrack === 'string' ? 'audioTrack' : audioTrack.name;
  const sfx = new Audio(track, name, {
    onplay: onStart,
    onend: onEnd,
  });
  sfx.play();
  return sfx;
}

/**
 * Run audio sequence
 *
 * @param audioTracks {Array} - list of tracks
 * @param options
 * @param options:onStart {Function} - onStart cb
 * @param options:onEnd {Function} - onEnd cb
 * @param options:delayBefore {Number} - delay before first audio
 * @param options:delay {Number} - delay between audio tracks
 * @param options:delayAfter {Number} - delay after last audio
 */
export function playAudioSequence(audioTracks, options) {
  const onStart = options.onStart || noop;
  const onEnd = options.onEnd || noop;
  const delay = options.delay || 0;
  const delayBefore = options.delayBefore || 0;
  const delayAfter = options.delayAfter || 0;
  const audioSequence = new TaskSequence();

  if (delayBefore) audioSequence.addTimeout(delayBefore);
  audioSequence.addConsecutiveTask({
    type: 'action',
    start: onStart,
  });
  if (Array.isArray(audioTracks)) {
    audioTracks.forEach((audioTrack, i) => {
      const trackDelay = i === 0 ? 0 : delay; // don't add delay for first track
      audioSequence.addConsecutiveTask({
        type: 'audiotrack',
        audioTrack,
        audioDesc: 'Audiotrack',
        delay: trackDelay,
      });
    });
  } else {
    console.warn('The sequence must be an array');
  }
  if (delayAfter) audioSequence.addTimeout(delayAfter);
  audioSequence.addConsecutiveTask({
    type: 'action',
    start: onEnd,
  });
  audioSequence.startBatch();

  return audioSequence;
}

export { Audio, TaskSequence };
