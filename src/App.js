import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Settings from './screens/Settings';
import Scoreboard from './screens/Scoreboard';

const AppNavigator = createSwitchNavigator({
  SettingsScreen: { screen: Settings },
  ScoreboardScreen: { screen: Scoreboard }
});

export default createAppContainer(AppNavigator);