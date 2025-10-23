import { UnknownAction } from 'redux'

import { isApiRawResponse } from 'shared/typeGuards'
import { ApiRawResponse, ApiResponseError } from 'shared/types'
import { AppDispatch } from 'store'

export interface PayloadAction<P> extends UnknownAction {
  payload?: P
}

type ActionCreator<T> = (
  payload?: T | ApiResponseError
) => PayloadAction<T | ApiResponseError>

interface CreateUniThunkParams<T> {
  fetchParams: Parameters<typeof fetch>
  actions: {
    start: ActionCreator<T>
    success: ActionCreator<T>
    fail: ActionCreator<T>
  }
}

// NOTE: 2nd variant - combine action.success and action.fail and use { payload: ApiResponse<T> }

export const createUniThunk =
  <T>({ fetchParams, actions }: CreateUniThunkParams<T>) =>
  async (dispatch: AppDispatch) => {
    dispatch(actions.start())

    try {
      const res = await fetch(...fetchParams)
      const json: ApiRawResponse<T> | T = await res.json()

      if (res.status >= 400 && isApiRawResponse<T>(json)) {
        dispatch(
          actions.fail({
            message: json.error,
            code: res.status,
          })
        )
      } else if (isApiRawResponse<T>(json)) {
        dispatch(actions.success(json.data))
      } else {
        dispatch(actions.success(json))
      }
    } catch (error: unknown) {
      dispatch(
        actions.fail({
          message: 'InternalServerError: ' + (error as Error).message,
          code: 500,
        })
      )
    }
  }
