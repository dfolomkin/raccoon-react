import { action, makeAutoObservable, runInAction } from 'mobx'

import { getTags } from 'services'
import { ApiResponseError, ITag } from 'shared/types'

export class TagsStore {
  data: ITag[] | null = null
  error: ApiResponseError | null = null
  isLoading: boolean = false

  constructor() {
    makeAutoObservable(this, {
      fetchTags: action.bound,
    })
  }

  async fetchTags() {
    this.isLoading = true

    try {
      const { data, error } = await getTags()

      runInAction(() => {
        this.data = data
        this.error = error
        this.isLoading = false
      })
    } catch (error) {
      //  NOTE: this is not needed, errors handling is in api service already
      runInAction(() => {
        this.error = error.message
        this.isLoading = false
      })
    }
  }
}

export const tagsStore = new TagsStore()
