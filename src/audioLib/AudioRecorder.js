import Microm from 'microm';

/**
 * Uses microm to record from user microphone in browser.
 */

const microm = new Microm();

export const startRecording = () => {
  microm.record().then(() => {
    console.log('Recording Audio in Browser');
  }).catch((e) => {
    console.log(e);
    console.log('Error Recording Audio in Browser');
  });
};

/**
 * Stops the recording.
 * @param {function} callback
 */
export async function stopRecording(callback) {
  await microm.stop();
  const base64Audio = await microm.getBase64();
  callback(base64Audio);
}

export const isRecording = () => microm.isRecording;

export const playRecording = () => {
  microm.play();
};

export const downloadRecording = () => {
  const fileName = 'AquaAudioRecording';
  microm.download(fileName);
};
