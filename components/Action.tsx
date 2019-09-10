import React, { FC, useCallback, useState } from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import posed from 'react-native-pose'
import styled from '@emotion/native'

import LikeIcon from './images/like.png'
import DislikeIcon from "./images/dislike.png"


interface Props {
  type: 'like' | 'dislike'
  active: boolean
  onPress: () => void
}

export const Action: FC<Props> = ({ type, active, onPress }) =>  {
  const [pressed, setPressed] = useState(false)
  const onPressIn = useCallback(() => setPressed(true), [])
  const onPressOut = useCallback(() => setPressed(false), [])

  const icon = type === 'like' ? LikeIcon : DislikeIcon
  const buttonStyle = type === 'like' ? s.like : s.dislike

  return (
    <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
      <Button style={[buttonStyle, s.shadow]} pose={(pressed || active) ? 'active' : 'default'} poseKey={pressed}>
        <Image source={icon} style={s.image}/>
      </Button>
    </TouchableWithoutFeedback>
  )
}


const Btn = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 100px;
`

const Button = posed(Btn)({
  default: {
    scale: 1,
    transition: {
      scale: { ease: 'easeInOut', duration: 300 },
    }
  },
  active: {
    scale: 1.2,
    transition: {
      scale: { ease: 'easeInOut', duration: 300 },
    }
  }
})


const s = StyleSheet.create({
  like: {
    backgroundColor: '#EB5757',
    paddingBottom: 2,
  },
  dislike: {
    backgroundColor: '#000',
    paddingTop: 2,
  },
  image: {
    width: 24,
    height: 24,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  }
})
