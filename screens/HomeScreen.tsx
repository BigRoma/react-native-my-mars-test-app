import React from 'react'
import { NavigationContainerProps } from 'react-navigation'
import { observer } from 'mobx-react'

import styled from '@emotion/native'
import posed from 'react-native-pose'

import { photoStore } from '../stores/PhotoStore'
import { PhotoModel } from '../stores/PhotoModel'
import { PhotoComponent } from '../components/Photo'
import { Loader } from '../components/Loader'
import { Action } from '../components/Action'
import { Header } from '../components/Header'
import { Status } from '../components/Status'
import { TextAction } from '../components/TextAction'
import { FavoritesIcon } from '../components/FavoritesIcon'


@observer
export class HomeScreen extends React.Component<NavigationContainerProps> {
  componentDidMount() {
    if (!photoStore.isLoaded) {
      photoStore.load()
    }
  }

  render() {
    return (
      <Container>
        <Header
          leftButton={<TextAction text="Undo" onPress={photoStore.undo} disabled={!photoStore.current}/>}
          rightButton={<FavoritesIcon onPress={this.goToFavorites}/>}
        />
        {photoStore.isLoading &&
          <LoaderContainer style={{ height: '100%' }}>
            <Loader/>
          </LoaderContainer>
        }
        {photoStore.isLoaded &&
          <PhotoContainer>
            {photoStore.photos.map(this.renderItem)}
          </PhotoContainer>
        }
        {photoStore.isLoaded &&
          <Buttons pose={photoStore.current !== photoStore.photos.length ? 'visible' : 'hidden'}>
            <Action type="like" active={photoStore.highlighted === 'like'} onPress={photoStore.like}/>
            <Action type="dislike" active={photoStore.highlighted === 'dislike'} onPress={photoStore.dislike}/>
          </Buttons>
        }
        <Status/>
      </Container>
    )
  }

  private renderItem = (photo: PhotoModel, index: number) =>
    <PhotoComponent key={photo.id} photo={photo} index={index}/>

  private goToFavorites = () => this.props.navigation.navigate('Favorites')
}

const Container = styled.View`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const PhotoContainer = styled.View`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 100px;
  width: 100%; 
  height: 100%;
  z-index: 1;
`

const LoaderContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; 
  height: 100%;
`

const ButtonsStyled = styled.View`
  position: absolute;
  bottom: 22px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  z-index: 2;
`

const Buttons = posed(ButtonsStyled)({
  visible: {
    opacity: 1,
    transition: { duration: 300 },
  },
  hidden: {
    opacity: 0,
    transition: { duration: 300 },
  }
})

