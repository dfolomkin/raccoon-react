import { TextDecoder, TextEncoder } from 'node:util'

import '@testing-library/jest-dom'
import 'jest-styled-components'

global.TextEncoder = TextEncoder as typeof global.TextEncoder
global.TextDecoder = TextDecoder as typeof global.TextDecoder

const consoleErrorSpy = jest.spyOn(console, 'error')

global.beforeEach(() => {
  consoleErrorSpy.mockImplementation((message) => {
    if (
      !message.includes('React does not recognize the') ||
      !message.includes('prop on a DOM element')
    ) {
      // eslint-disable-next-line no-console
      console.warn(message)
    }
  })
})

global.afterEach(() => {
  consoleErrorSpy.mockRestore()
})
