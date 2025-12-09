import { action, makeAutoObservable, runInAction } from 'mobx'

import { deleteArticle, getArticle, postArticle, putArticle } from 'services'
import { FETCH_TYPE } from 'shared/constants'
import { ApiResponseError, EmptyObject, IArticle } from 'shared/types'

export class ArticleStore {
  data: IArticle | EmptyObject | null = null
  error: ApiResponseError | null = null
  isLoading: boolean = false
  fetchType: keyof typeof FETCH_TYPE | null = null

  constructor() {
    makeAutoObservable(this, {
      resetArticle: action.bound,
      fetchArticle: action.bound,
      updateArticle: action.bound,
      createArticle: action.bound,
      deleteArticle: action.bound,
    })
  }

  resetArticle() {
    this.data = null
    this.error = null
    this.isLoading = false
    this.fetchType = null
  }

  async fetchArticle(id: string) {
    this.isLoading = true

    try {
      const { data, error } = await getArticle(id)

      runInAction(() => {
        this.data = data
        this.error = error
        this.isLoading = false
        this.fetchType = FETCH_TYPE.read
      })
    } catch (error) {
      //  NOTE: this is not needed, errors handling is in api service already
      runInAction(() => {
        this.error = error.message
        this.isLoading = false
      })
    }
  }

  async updateArticle(id: number, formData: FormData) {
    this.isLoading = true

    try {
      const { data, error } = await putArticle(id, formData)

      runInAction(() => {
        this.data = data
        this.error = error
        this.isLoading = false
        this.fetchType = FETCH_TYPE.update
      })
    } catch (error) {
      //  NOTE: this is not needed, errors handling is in api service already
      runInAction(() => {
        this.error = error.message
        this.isLoading = false
      })
    }
  }

  async createArticle(formData: FormData) {
    this.isLoading = true

    try {
      const { data, error } = await postArticle(formData)

      runInAction(() => {
        this.data = data
        this.error = error
        this.isLoading = false
        this.fetchType = FETCH_TYPE.create
      })
    } catch (error) {
      //  NOTE: this is not needed, errors handling is in api service already
      runInAction(() => {
        this.error = error.message
        this.isLoading = false
      })
    }
  }

  async deleteArticle(id: number) {
    this.isLoading = true

    try {
      const { data, error } = await deleteArticle(id)

      runInAction(() => {
        this.data = data
        this.error = error
        this.isLoading = false
        this.fetchType = FETCH_TYPE.delete
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

export const articleStore = new ArticleStore()
