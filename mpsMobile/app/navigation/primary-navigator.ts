import { createStackNavigator } from 'react-navigation';
import { AuthScreen } from '../screens/auth-screen';
import { ContestsScreen } from '../screens/contests-screen';
import { color } from '../theme/color';

const stackOptions = {};

export const PrimaryNavigator = createStackNavigator(
  {
    auth: {
      screen: AuthScreen,
      navigationOptions: {
        header: null,
      },
    },
    contests: { screen: ContestsScreen },
  },
  {
    headerMode: 'screen',
    initialRouteName: 'contests',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: color.primaryDarker,
      },
      headerTintColor: color.primary,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ['auth'];
