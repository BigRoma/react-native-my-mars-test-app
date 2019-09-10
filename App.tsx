import React, { Component } from 'react'
import { StyleSheet, YellowBox, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import * as Font from 'expo-font'
import ignoreWarnings from 'ignore-warnings';

import { HomeScreen } from './screens/HomeScreen'
import { FavoritesScreen } from './screens/FavoritesScreen'
import { Loader } from './components/Loader'
import { RNWindow } from './utils/screen'

YellowBox.ignoreWarnings(['draggable', 'cellKey'])
ignoreWarnings(['draggable', 'cellKey'])


const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Favorites: { screen: FavoritesScreen },
}, {
  defaultNavigationOptions: {
    header: null,
  },
})

const AppContainer = createAppContainer(MainNavigator)

class App extends Component {
  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'IBM-Plex-Light': require('./assets/fonts/IBMPlexSans-Light.ttf'),
      'IBM-Plex-Medium': require('./assets/fonts/IBMPlexSans-Medium.ttf'),
      'IBM-Plex-Regular': require('./assets/fonts/IBMPlexSans-Regular.ttf'),
      'IBM-Plex-SemiBold': require('./assets/fonts/IBMPlexSans-SemiBold.ttf'),
      'IBM-Plex-Bold': require('./assets/fonts/IBMPlexSans-Bold.ttf'),
    })

    this.setState({ fontLoaded: true })
  }


  render() {
    if (!this.state.fontLoaded) {
      return (
        <View style={s.loader}>
          <Loader />
        </View>
      )
    }

    return <AppContainer/>
  }
}

const s = StyleSheet.create({
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: RNWindow.height,
    width: RNWindow.width,
  }
})

export default App
