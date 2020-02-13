import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import PlayerInfo from '../components/PlayerInfo';

class Scoreboard extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0.4)'} />
        <PlayerInfo settings={this.props.navigation.state.params.scoreboardInfo} />
      </View>
    );
  }
}

export default Scoreboard;