import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import {
  API_BASE_URL,
  API_ROUTES,
  FETCH_STATUS,
  FETCH_TYPE,
} from 'shared/constants'
import { ApiResponseError, IArticle } from 'shared/types'

interface ArticleSliceState {
  fetchType: keyof typeof FETCH_TYPE | null
  status: keyof typeof FETCH_STATUS
  data: IArticle | null
  error: ApiResponseError | null
}

const initialState: ArticleSliceState = {
  fetchType: null,
  status: FETCH_STATUS.uninitialized,
  data: null,
  error: null,
}

export const fetchArticle = createAsyncThunk(
  'article/fetchArticle',
  async (id: string) => {
    const res = await axios.get(`${API_BASE_URL}${API_ROUTES.articles}/${id}`)

    return res.data
  }
)

export const updateArticle = createAsyncThunk(
  'article/updateArticle',
  async ({ id, formData }: { id: string; formData: FormData }) => {
    const res = await axios.put(
      `${API_BASE_URL}${API_ROUTES.articles}/${id}`,
      formData
    )

    return res.data
  }
)

export const createArticle = createAsyncThunk(
  'article/createArticle',
  async (formData: FormData) => {
    const res = await axios.post(
      `${API_BASE_URL}${API_ROUTES.articles}`,
      formData
    )

    return res.data
  }
)

export const deleteArticle = createAsyncThunk(
  'article/deleteArticle',
  async (id: string) => {
    const res = await axios.delete(
      `${API_BASE_URL}${API_ROUTES.articles}/${id}`
    )

    return res.data
  }
)

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    resetArticleSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // fetchArticle
      .addCase(fetchArticle.pending, (state) => {
        state.status = FETCH_STATUS.loading
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.status = FETCH_STATUS.succeeded
        state.fetchType = FETCH_TYPE.read
        state.data = action.payload
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.status = FETCH_STATUS.failed
        state.error.message = action.error.message
        state.error.code = Number(action.error.code)
      })
      // updateArticle
      .addCase(updateArticle.pending, (state) => {
        state.status = FETCH_STATUS.loading
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.status = FETCH_STATUS.succeeded
        state.fetchType = FETCH_TYPE.update

        const { data, error } = action.payload

        if (error) {
          state.error = {
            message: error,
            code: 500,
          }
        } else {
          state.data = data
        }
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.status = FETCH_STATUS.failed
        state.error = {
          message: action.error.message,
          code: 500,
        }
      })
      // createArticle
      .addCase(createArticle.pending, (state) => {
        state.status = FETCH_STATUS.loading
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.status = FETCH_STATUS.succeeded
        state.fetchType = FETCH_TYPE.create

        const { data, error } = action.payload

        if (error) {
          state.error = {
            message: error,
            code: 500,
          }
        } else {
          state.data = data
        }
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.status = FETCH_STATUS.failed
        state.error = {
          message: action.error.message,
          code: 500,
        }
      })
      // deleteArticle
      .addCase(deleteArticle.pending, (state) => {
        state.status = FETCH_STATUS.loading
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.status = FETCH_STATUS.succeeded
        state.fetchType = FETCH_TYPE.delete
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.status = FETCH_STATUS.failed
        state.error.message = action.error.message
        state.error.code = Number(action.error.code)
      })
  },
})

export const { resetArticleSlice } = articleSlice.actions
export default articleSlice.reducer
