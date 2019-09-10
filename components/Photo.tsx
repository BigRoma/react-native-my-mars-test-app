import React, { Component } from 'react'
import { Animated, Platform, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'

import { debounce } from 'lodash'
import moment from 'moment'

import styled from '@emotion/native'
import posed from 'react-native-pose'
import { LinearGradient } from 'expo-linear-gradient'

import { RNScreen, RNWindow } from '../utils/screen'
import { PhotoModel } from '../stores/PhotoModel'
import { photoStore } from '../stores/PhotoStore'


const IS_IOS = Platform.OS === 'ios'

interface Props {
  photo: PhotoModel
  index: number
}

@observer
export class PhotoComponent extends Component<Props> {

  render() {
    const { photo, index } = this.props

    const indexOffset = index - photoStore.current

    if (indexOffset > 2) return null

    return (
      <Container
        onDragEnd={this.handleDragEnd}
        pose={[
          photo.isVisible ? 'visible' : 'hidden',
          indexOffset === -1 && photoStore.highlighted
        ]}
        style={[{ zIndex: -index }, s.shadow]}
        indexOffset={indexOffset}
        poseKey={photoStore.current}
      >
        <Overlay colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0)']}>
          <TitleText>{photo.roverName}</TitleText>
          <SubtitleText>{photo.cameraName}</SubtitleText>
          <SubtitleText>{moment(photo.date).format('MMM DD, YYYY')}</SubtitleText>
        </Overlay>
        <Image source={{ uri: photo.uri }}/>
      </Container>
    )
  }

  private handleDragEnd = (e, gestureState) => {
    const indexOffset = this.props.index - photoStore.current

    if (gestureState.dx > 50 && !indexOffset) {
      this.dislike()
    }

    if (gestureState.dx < -50 && !indexOffset) {
      this.like()
    }
  }

  private like = debounce(photoStore.like, 150)

  private dislike = debounce(photoStore.dislike, 150)
}


const PhotoContainer = styled.View({
  position: 'absolute',
  width: RNWindow.width - 40,
  height: RNWindow.height - 200,
  borderRadius: 8,
  overflow: 'hidden',
})

const Overlay = styled(LinearGradient)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  z-index: 1;
`

const TitleText = styled.Text`
  color: #fff;
  font-size: 20px;
  line-height: 28px;
  font-family: "IBM-Plex-SemiBold";
`

const SubtitleText = styled.Text`
  color: #fff;
  font-size: 14px;
  line-height: 20px;
`

const Container = posed(PhotoContainer)({
  draggable: 'x',
  visible: {
    x: 0,
    y: ({ indexOffset }) => -indexOffset * RNWindow.height * 0.06,
    scale: ({ indexOffset }) => 1 - indexOffset * 0.1,
    transition: {
      x: ({ value, toValue }) => Animated.spring(value, { toValue }),
      y: ({ value, toValue }) => Animated.spring(value, { toValue }),
      scale: ({ value, toValue }) => Animated.spring(value, { toValue }),
    },
  },
  like: {
    x: -RNScreen.width,
    transition: ({ value, toValue }) => Animated.spring(value, { toValue }),
  },
  dislike: {
    x: RNScreen.width,
    transition: ({ value, toValue }) => Animated.spring(value, { toValue }),
  },
  dragEnd: {
    x: 0,
    transition: ({ value, toValue, gestureState, indexOffset }) => {
      return (gestureState.dx > 50 || gestureState.dx < -50) && !indexOffset
        ? Animated.spring(value, {
          toValue: (gestureState.dx > 0 ? 1 : -1) * RNScreen.width,
        })
        : Animated.spring(value, { toValue })
    }
  },
  passive: {
    opacity: ['x', {
      inputRange: [-RNScreen.width, 0, RNScreen.width],
      outputRange: [0, 1, 0]
    }]
  },
})

const Image = styled.Image({
  ...StyleSheet.absoluteFillObject,
  flex: 1,
  marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
  backgroundColor: 'white',
  resizeMode: 'cover',
})


const s = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  }
})
