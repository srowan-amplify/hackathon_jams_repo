import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import Audio from './audioLib/Audio';
import audioMap from './assets/audioMap';
import imageMap from './assets/images/imageMap';

import emotions from './genreRules/emotions.json';
import genres from './genreRules/genres.json';

const genreList = ['pop', 'country', 'experimental'];
let genreIndex = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      melodyNote: 0, // the index of the last-played note in the melody
      emotion: '', // the desired emotion of the music
      genre: genreList[genreIndex], // the desired genre of the music
      instrument: genres[genreList[genreIndex]].instrument,
    }

    this.onBeat = 0;
    this.onBeatTimer = null;
    this.testAudio = null;
  }

  componentDidMount = () => {
    this.setBPM();
  }

  playNote = () => {
    const randomNote = emotions[this.state.emotion][Math.floor(Math.random() * emotions[this.state.emotion].length)]; // audioMap[this.state.instrument].length);
    console.log("note: " + randomNote);
    this.audio = new Audio(
      audioMap[this.state.instrument][randomNote].note,
      'note',
      {onend: null}
    );

    this.audio.play();
  }

  switchEmotion = (emotion) => {
    console.log("switching emotion! " + emotion);
    this.stopSound();
    this.setState({emotion: emotion});
  }

  // select a random BPM for the music every time a relevant field is changed
  setBPM = () => {
    const bpmRange = genres[this.state.genre].bpm;
    // random BPM within range
    let milisecondBpm = Math.floor(Math.random() * (bpmRange[1] - bpmRange[0])) + bpmRange[0];
    console.log(milisecondBpm + " bpm");
    milisecondBpm = 60 / milisecondBpm; // how many beats in a second?
    milisecondBpm *= 1000; // how many miliseconds between beats?
    this.onBeat = milisecondBpm;
  }

  // begin playing music!
  startMusic = () => {
    if(this.state.emotion !== '')
    {
      this.stopSound();
      this.onBeatTimer = setInterval(() => {
        this.playNote();
      }, this.onBeat);
    }
  }

  // stops all current intervals so sound stops
  stopSound = () => {
    clearInterval(this.onBeatTimer);
  }

  // shift the genre option one to the left in the genreList array.
  // if we have gone below zero, cycle back to the last element and continue
  cycleGenreLeft = () => {
    // don't be playing music while we recalculate things
    this.stopSound();

    genreIndex--;
    if(genreIndex === -1)
      genreIndex = genreList.length - 1;

    this.setState({
      genre: genreList[genreIndex],
      instrument: genres[genreList[genreIndex]].instrument,
    });
    this.setBPM();
  }

  // shift the genre option one to the right in the genreList array.
  // if we have reached the last element, shift back to zero and continue
  cycleGenreRight = () => {
    // don't be playing music while we recalculate things
    this.stopSound();

    genreIndex++;
    if(genreIndex === genreList.length)
      genreIndex = 0;

    this.setState({
      genre: genreList[genreIndex],
      instrument: genres[genreList[genreIndex]].instrument,
    });
    this.setBPM();
  }

  render = () => (
    <View style={styles.container}>
      <Image source={imageMap.background} style={styles.background} />
      <TouchableOpacity style={[styles.button, {left: 24}]} onPress={this.startMusic}>
        <Image source={imageMap.startButton} style={{width: 200, height: 80}} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, {left: 813}]} onPress={this.stopSound}>
        <Image source={imageMap.stopButton} style={{width: 200, height: 80}} />
      </TouchableOpacity>

      <View>
        <TouchableOpacity onPress={this.cycleGenreLeft}>
          <Image source={imageMap.leftButton} style={[styles.genreButtons, {left: 409}]} />
        </TouchableOpacity>

        <Image source={imageMap[this.state.genre]} style={styles.genreImage} />

        <TouchableOpacity onPress={this.cycleGenreRight}>
          <Image source={imageMap.rightButton} style={[styles.genreButtons, {left: 617}]} />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={()=> {this.switchEmotion('happy');}}>
          <Image source={imageMap.happyButton} style={[styles.moodButton, {left: 337}]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {this.switchEmotion('curious');}}>
          <Image source={imageMap.curiousButton} style={[styles.moodButton, {left: 468}]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {this.switchEmotion('surprised');}}>
          <Image source={imageMap.surprisedButton} style={[styles.moodButton, {left: 602}]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#f9bd00', // 'gold',
  },
  background: {
    position: 'absolute',
    width: 1025,
    height: 576,
    zIndex: -1,
  },
  text: {
    margin: 50,
    fontSize: 72,
  },
  buttonText: {
    fontSize: 30,
    alignSelf: 'center',
  },
  button: {
    position: 'absolute',
    width: 200,
    height: 100,
    top: 25,
    left: 10,
  },
  moodButton: {
    position: 'absolute',
    width: 117,
    height: 117,
    top: 404,
  },

  genreImage: {
    position: 'absolute',
    left: 451,
    top: 175,
    width: 153,
    height: 153,
  },
  genreButtons: {
    position: 'absolute',
    top: 224,
    width: 29,
    height: 52,
  },
});

export default App;
