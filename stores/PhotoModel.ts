import { action, computed, observable } from 'mobx'

import { Photo } from './PhotoStore'


export class PhotoModel {
  id: number
  uri: string
  cameraName: string
  roverName: string
  date: string
  @observable isLiked: boolean = null

  constructor(photo: Photo) {
    this.uri = photo.img_src;
    this.id = photo.id
    this.roverName = photo.rover.name
    this.date = photo.earth_date
    this.cameraName = photo.camera.full_name
  }


  @action
  like = () => {
    this.isLiked = true
  }

  @action
  dislike = () => {
    this.isLiked = false
  }

  @action
  undo = () => {
    this.isLiked = null
  }

  @computed get isVisible() {
    return this.isLiked === null
  }

  @computed get source() {
    return { uri: this.uri }
  }
}
