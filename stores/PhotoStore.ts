import { action, computed, observable } from 'mobx'
import axios from 'axios'

import { filter } from 'lodash'

import { CommonStore } from './CommonStore'
import { PhotoModel } from './PhotoModel'


const APIKey = 'W6kMMitN0CrxlIFOgyveR1L9z0cGovJRJNWaUhuu'
const defaultParams = { api_key: APIKey }

export interface Photo {
  id: number
  img_src: string
  rover: {
    name: string
  }
  earth_date: string
  camera: {
    full_name: string
  }
}

export class PhotoStore extends CommonStore {
  private api = axios.create({
    baseURL: 'https://api.nasa.gov',
  })

  @observable photos: PhotoModel[] = []
  @observable current: number = 0
  @observable highlighted = null

  @action
  load = async () => {
    this.startLoading()

    try {
      const { data } = await this.api.get('/mars-photos/api/v1/rovers/curiosity/photos', {
        params: {
          ...defaultParams,
          camera: 'MAST',
          earth_date: '2015-05-30',
          page: 1,
        }
      })

      const requestPhotos: Photo[] = data.photos

      this.completeLoading()

      this.photos = requestPhotos.map(photo => new PhotoModel(photo))
    } catch (err) {
      console.error(err)
    } finally {
      this.stopLoading()
    }
  }

  @action
  swipeIndex = () => {
    if (this.current < this.photos.length) {
      this.current++
    }
  }

  @action
  undo = () => {
    this.current--
    this.photos[this.current].undo()
  }

  @action
  like = () => {
    if (this.current < this.photos.length) {
      this.highlightAction('like')
      this.photos[this.current].like()
      this.swipeIndex()
    }
  }

  @action
  dislike = () => {
    if (this.current < this.photos.length) {
      this.highlightAction('dislike')
      this.photos[this.current].dislike()
      this.swipeIndex()
    }
  }

  @action
  highlightAction = (type: 'like' | 'dislike') => {
    this.highlighted = type

    setTimeout(this.clearHighlightAction, 500)
  }

  @action
  clearHighlightAction = () => {
    this.highlighted = null
  }

  @computed get statusText() {
    if (this.isLoading) {
      return 'Downloading'
    }

    if (this.isLoaded && this.current < this.photos.length) {
      return `${this.photos.length - this.current} cards left`
    }

    if (this.isLoaded && this.current === this.photos.length) {
      return 'No more cards'
    }
  }

  @computed get likedImages() {
    return filter(this.photos, 'isLiked')
  }
}

export const photoStore = new PhotoStore()
