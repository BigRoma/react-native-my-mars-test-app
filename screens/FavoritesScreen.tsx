import React from 'react'
import { NavigationContainerProps } from 'react-navigation'

import { observer } from 'mobx-react'
import styled from '@emotion/native'
import Gallery from 'react-native-image-gallery'
import moment from 'moment'

import { Header } from '../components/Header'
import { TextAction } from '../components/TextAction'
import { photoStore } from '../stores/PhotoStore'


interface State {
  index: number
}

@observer
export class FavoritesScreen extends React.Component<NavigationContainerProps, State> {
  state = {
    index: 0
  }

  render() {
    const photo = photoStore.likedImages.length > 0 ? photoStore.likedImages[this.state.index] : null

    return (
      <Container>
        <Header
          title="Favorites"
          leftButton={<TextAction text="Back" onPress={this.goToHome}/>}
          rightButton={photoStore.likedImages.length > 0 && <TextAction text="Dislike" onPress={this.dislike}/>}
        />
        <Gallery
          images={photoStore.likedImages}
          onPageSelected={this.selectImage}
        />
        {photo &&
          <Overlay>
            <TitleText>{photo.roverName}</TitleText>
            <SubtitleText>{photo.cameraName}</SubtitleText>
            <SubtitleText>{moment(photo.date).format('MMM DD, YYYY')}</SubtitleText>
          </Overlay>
        }
        {photo &&
          <Counter>{this.state.index + 1} / {photoStore.likedImages.length}</Counter>
        }
      </Container>
    )
  }

  private goToHome = () => this.props.navigation.navigate('Home')

  private selectImage = (index: number) => {
    this.setState({ index })
  }

  private dislike = () => {
    photoStore.likedImages[this.state.index].dislike()
  }
}

const Container = styled.View`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-family: "IBM-Plex-Light";
`

const TitleText = styled.Text`
  color: white;
  font-size: 20px;
  line-height: 28px;
  font-family: "IBM-Plex-SemiBold";
`

const SubtitleText = styled.Text`
  color: white;
  font-size: 14px;
  line-height: 20px;
`
const Overlay = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`

const Counter = styled.Text`
  position: absolute;
  top: 65px;
  width: 100%;
  z-index: 1;
  text-align: center;
  padding: 5px 10px;
  font-family: "IBM-Plex-Medium";
`
