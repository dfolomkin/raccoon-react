import { combineReducers } from 'redux'

import { readArticlesReducer, updateArticleReducer } from './articles'
import { tagsReducer } from './tags'

export const rootReducer = combineReducers({
  articles: readArticlesReducer,
  lastArticle: updateArticleReducer,
  tags: tagsReducer,
})
