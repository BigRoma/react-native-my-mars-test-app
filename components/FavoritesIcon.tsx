import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'

import styled from '@emotion/native'

import { photoStore } from '../stores/PhotoStore'
import DisabledIcon from './images/favorites_non_active.png'
import EnabledIcon from './images/favorites_active.png'


interface Props {
  onPress: () => void
}

export const FavoritesIcon: FC<Props> = ({ onPress }) => (
  <TouchableOpacity onPress={photoStore.isLoaded ? onPress : undefined}>
    <Icon source={photoStore.isLoaded ? EnabledIcon : DisabledIcon}/>
  </TouchableOpacity>
)

const Icon = styled.Image`
  width: 24px;
  height: 24px;
`
