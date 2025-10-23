import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from 'redux'
import { thunk, ThunkDispatch } from 'redux-thunk'

import { PayloadAction } from './actions/utils'
import { rootReducer } from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  composeEnhancers(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  PayloadAction<unknown>
>
