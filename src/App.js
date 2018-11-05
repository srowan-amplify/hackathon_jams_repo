import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import Audio from './audioLib/Audio';
import audioMap from './assets/audioMap';
import imageMap from './assets/images/imageMap';

import emotions from './genreRules/emotions.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      melodyNote: 0, // the index of the last-played note in the melody
      emotion: '', // the desired emotion of the music
      genre: '', // the desired genre of the music
      instrument: 'banjo',
    }

    this.onBeat = 0;
    this.onBeatTimer = null;
    this.testAudio = null;
  }

  componentWillMount = () => {

  }

  componentDidMount = () => {
    // TESTER CODE
    const bpmTest = [60, 130];
    // random BPM within range
    let milisecondBpm = Math.floor(Math.random() * (bpmTest[1] - bpmTest[0])) + bpmTest[0];
    console.log(milisecondBpm + " bpm");
    milisecondBpm = 60 / milisecondBpm; // how many beats in a second?
    milisecondBpm *= 1000; // how many miliseconds between beats?
    this.onBeat = milisecondBpm;
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
    this.setState({emotion: emotion});
  }

  switchGenre = (genre) => {
    console.log("switching genre!");

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
});

export default App;
