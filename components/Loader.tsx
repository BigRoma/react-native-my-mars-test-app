import React, { Component } from 'react'
import * as Animatable from 'react-native-animatable';

import LoaderIcon from './images/progress-bar.png'


export class Loader extends Component {

  render() {
    return (
      <Animatable.Image source={LoaderIcon} animation="rotate" iterationCount="infinite"/>
    )
  }
}
