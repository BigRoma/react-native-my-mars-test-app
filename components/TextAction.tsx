import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'

import styled from '@emotion/native'


interface Props {
  text: string
  disabled?: boolean
  onPress: () => void
}

export const TextAction: FC<Props> = ({ text, onPress, disabled }) =>
  <TouchableOpacity onPress={onPress} disabled={disabled}>
    <Text disabled={disabled}>{text}</Text>
  </TouchableOpacity>

const Text = styled.Text`
  color: ${({ disabled }) => !disabled ? '#EB5757' : '#CFD8DC'};
  font-size: 16px;
  font-family: IBM-Plex-Medium;
  border-radius: 8px;
  padding: 5px 10px
`

