import React, { FC } from 'react'
import { observer } from 'mobx-react'

import styled from '@emotion/native'
import { photoStore } from '../stores/PhotoStore'


export const Status: FC = observer(() => {
  return (
    <Container>
      <Text>{photoStore.statusText}</Text>
    </Container>
  )
})

const Container = styled.View`
  position: absolute;
  bottom: 16px;
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Text = styled.Text`
  color: #727C81;
`
