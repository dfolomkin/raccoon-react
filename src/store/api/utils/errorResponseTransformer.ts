import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react'

export const errorResponseTransformer = (
  error: SerializedError | FetchBaseQueryError
) => {
  let errorMessage = 'Unknown error occurred'
  const errorCode = 500

  if ('status' in error) {
    if (error.status === 'FETCH_ERROR') {
      errorMessage = 'Network error: Failed to fetch'
    }
    if (error.status === 'TIMEOUT_ERROR') {
      errorMessage = 'Request timeout'
    }
    if (error.status === 'PARSING_ERROR') {
      errorMessage = `Parsing error: ${error.data}`
    }
    if (typeof error.status === 'number') {
      const errorData: { message?: string; error?: string } = error.data

      errorMessage =
        errorData?.message || errorData?.error || `HTTP Error ${error.status}`
    }
  }

  if ('message' in error && error.message) {
    errorMessage = error.message
  }

  return {
    message: errorMessage,
    code: errorCode,
  }
}
