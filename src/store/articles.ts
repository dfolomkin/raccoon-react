import { action, makeAutoObservable, runInAction } from 'mobx'

import { getArticles } from 'services'
import { ApiResponseError, IArticle } from 'shared/types'

export class ArticlesStore {
  data: IArticle[] | null = null
  error: ApiResponseError | null = null
  isLoading: boolean = false

  constructor() {
    makeAutoObservable(this, {
      fetchArticles: action.bound,
    })
  }

  async fetchArticles() {
    this.isLoading = true

    try {
      const { data, error } = await getArticles()

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

export const articlesStore = new ArticlesStore()
