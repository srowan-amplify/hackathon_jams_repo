import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class App extends Component {
  render = () => (
    <View style={styles.container}>
      <Text style={styles.text}>Hello Sarah :)</Text>
      <Text style={styles.text}>Hackathon Jams</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'gold',
  },
  text: {
    margin: 50,
    fontSize: 72,
  },
});

export default App;
