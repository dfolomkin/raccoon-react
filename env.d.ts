export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BE_PORT: string
      BE_URL: string
    }
  }
}
