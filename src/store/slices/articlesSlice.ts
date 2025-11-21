import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { API_BASE_URL, API_ROUTES, FETCH_STATUS } from 'shared/constants'
import { ApiResponseError, IArticle } from 'shared/types'

interface ArticlesSliceState {
  status: keyof typeof FETCH_STATUS
  data: IArticle[] | null
  error: ApiResponseError | null
}

const initialState: ArticlesSliceState = {
  status: FETCH_STATUS.uninitialized,
  data: null,
  error: null,
}

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async () => {
    const res = await axios.get(`${API_BASE_URL}${API_ROUTES.articles}`)

    return res.data
  }
)

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = FETCH_STATUS.loading
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = FETCH_STATUS.succeeded
        state.data = action.payload
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = FETCH_STATUS.failed
        state.data = null
        state.error.message = action.error.message
        state.error.code = Number(action.error.code)
      })
  },
})

export default articlesSlice.reducer
