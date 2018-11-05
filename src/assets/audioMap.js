

const audioMap = {
  cronch: require('./goblins_feedback_correct.mp3'),

  cronchTest: [
    {cronchTestAudio: require('./goblins_feedback_correct.mp3')},
    {cronchTestAudio: require('./goblins_feedback_correct.mp3')},
    {cronchTestAudio: require('./goblins_feedback_correct.mp3')},
  ],

  piano: [
    {note: require('./Piano/C3.mp3')},
    {note: require('./Piano/Cs3.mp3')},
    {note: require('./Piano/D3.mp3')},
    {note: require('./Piano/Ds3.mp3')},
    {note: require('./Piano/E3.mp3')},
    {note: require('./Piano/F3.mp3')},
    {note: require('./Piano/G3.mp3')},
    {note: require('./Piano/Ab3.mp3')},
    {note: require('./Piano/A3.mp3')},
  ],

  acousticGuitar: [
    {note: require('./AcousticGuitar/C3.mp3')},
    {note: require('./AcousticGuitar/Cs3.mp3')},
    {note: require('./AcousticGuitar/D3.mp3')},
    {note: require('./AcousticGuitar/Ds3.mp3')},
    {note: require('./AcousticGuitar/E3.mp3')},
    {note: require('./AcousticGuitar/F3.mp3')},
    {note: require('./AcousticGuitar/G3.mp3')},
    {note: require('./AcousticGuitar/Ab3.mp3')},
    {note: require('./AcousticGuitar/A3.mp3')},
    {note: require('./AcousticGuitar/Bb3.mp3')},
    {note: require('./AcousticGuitar/B3.mp3')},
  ],

  electricGuitar: [
    {note: require('./ElectricGuitar/C3.mp3')},
    {note: require('./ElectricGuitar/Cs3.mp3')},
    {note: require('./ElectricGuitar/D3.mp3')},
    {note: require('./ElectricGuitar/Ds3.mp3')},
    {note: require('./ElectricGuitar/E3.mp3')},
    {note: require('./ElectricGuitar/F3.mp3')},
    {note: require('./ElectricGuitar/G3.mp3')},
    {note: require('./ElectricGuitar/Ab3.mp3')},
    {note: require('./ElectricGuitar/A3.mp3')},
    {note: require('./ElectricGuitar/Bb3.mp3')},
    {note: require('./ElectricGuitar/B3.mp3')},
  ],

  banjo: [
    {note: require('./Banjo/C3.mp3')},
    {note: require('./Banjo/Cs3.mp3')},
    {note: require('./Banjo/D3.mp3')},
    {note: require('./Banjo/Ds3.mp3')},
    {note: require('./Banjo/E3.mp3')},
    {note: require('./Banjo/F3.mp3')},
    {note: require('./Banjo/G3.mp3')},
    {note: require('./Banjo/Ab3.mp3')},
    {note: require('./Banjo/A3.mp3')},
    {note: require('./Banjo/Bb3.mp3')},
    {note: require('./Banjo/B3.mp3')},
  ],

  // Drums -----------------------

  cajon: [
    {note: require('./Cajon/CajonKick.mp3')},
    {note: require('./Cajon/CajonSnare.mp3')},
  ],

  eDrum: [
    {note: require('./eDrums/eKick.mp3')},
    {note: require('./eDrums/eSnare.mp3')},
  ],
};

export default audioMap;
