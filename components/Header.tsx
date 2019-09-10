import React, { FC } from 'react'
import { NativeModules, Platform, StatusBar, View } from 'react-native'

import styled from '@emotion/native'


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : NativeModules.StatusBarManager.HEIGHT

interface Props {
  title?: string
  leftButton?: React.ReactNode
  rightButton?: React.ReactNode
}

const HeaderComponent: FC<Props> = ({ title = 'My Mars', leftButton, rightButton }) => {
  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <TopBar>
        {leftButton || <View/>}
        <Title>{title}</Title>
        {rightButton}
      </TopBar>
    </Container>
  )
}

export const Header = HeaderComponent

const Container = styled.View`
  position: absolute;
  top: ${() => STATUSBAR_HEIGHT + 'px'};
  width: 100%;
  height: 60px;
  padding: 0 20px;
  z-index: 10;
`

const TopBar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`

const Title = styled.Text`
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-grow: 1;
  text-align: center;
  font-family: IBM-Plex-SemiBold;
  z-index: -1;
`
