import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  AppRegistry
} from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';

var StopWatch = React.createClass({
  getInitialState: function(){
    return {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    }
  },
  render: function(){
    return <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timeWrapper}>
          <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>
      <View style={styles.footer}>
        {this.laps()}
      </View>
    </View>
  },

  laps: function(){
     return this.state.laps.map(function(time, index){
       return <View style={styles.lap}>
         <Text style={styles.lapText}>
           Lap #{index + 1}
         </Text>
         <Text style={styles.lapText}>
           {formatTime(time)}
         </Text>
       </View>
     });
  },

  startStopButton: function(){
    var style = this.state.running ? styles.stopButton : styles.startButton;

    return <TouchableHighlight
    underlayColor="grey"
    onPress = {this.handleStartPress}
    style={[styles.button, style]}>
      <Text>
        {this.state.running ? 'Stop' : 'Start'}
      </Text>
    </TouchableHighlight>
  },
  lapButton: function(){
    return <TouchableHighlight style={styles.button}
    underlayColor='gray'
    onPress={this.handleLapPress}>
      <Text>
        Lap
      </Text>
    </TouchableHighlight>
  },
  handleLapPress: function(){
    var lap = this.state.timeElapsed;
    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    });
  },
  handleStartPress: function(){
    if (this.state.running){
      clearInterval(this.interval);
      this.setState({running: false});
      return
    }

    this.setState({startTime: new Date()});

    this.interval = setInterval(() => {
    this.setState({
      timeElapsed: new Date() - this.state.startTime,
      running:true
    });
  },30);
  }
});

var styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'stretch'
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  timeWrapper:{
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonWrapper:{
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  timer:{
    fontSize: 60
  },
  button:{
    borderWidth: 2,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  },
  startButton:{
    borderColor:'#00CC00'
  },
  stopButton:{
    borderColor: '#CC0000'
  },
  lap:{
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText:{
    fontSize: 30
  }

});

AppRegistry.registerComponent('stopwatch', () => StopWatch);
