import { action, observable } from 'mobx'


export class CommonStore {
  @observable isLoading: boolean = false
  @observable isLoaded: boolean = false
  @observable errors: string[] = []

  @action
  startLoading = () => {
    this.errors = []
    this.isLoading = true
  }

  @action
  stopLoading = () => {
    this.isLoading = false
  }

  @action
  completeLoading = () => {
    this.isLoaded = true
  }
}
