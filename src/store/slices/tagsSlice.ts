import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { API_BASE_URL, API_ROUTES, FETCH_STATUS } from 'shared/constants'
import { ApiResponseError, ITag } from 'shared/types'

interface TagsSliceState {
  status: keyof typeof FETCH_STATUS
  data: ITag[] | null
  error: ApiResponseError | null
}

const initialState: TagsSliceState = {
  status: FETCH_STATUS.uninitialized,
  data: null,
  error: null,
}

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const res = await axios.get(`${API_BASE_URL}${API_ROUTES.tags}`)

  return res.data
})

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = FETCH_STATUS.loading
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = FETCH_STATUS.succeeded
        state.data = action.payload
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = FETCH_STATUS.failed
        state.data = null
        state.error.message = action.error.message
        state.error.code = Number(action.error.code)
      })
  },
})

export default tagsSlice.reducer
