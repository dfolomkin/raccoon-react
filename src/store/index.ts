import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import articleReducer from './slices/articleSlice'
import articlesReducer from './slices/articlesSlice'
import tagsReducer from './slices/tagsSlice'

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleReducer,
    tags: tagsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
