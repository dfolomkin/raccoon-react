export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BE_PORT: string
      BE_URL: string
    }
  }
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function
  }
}
