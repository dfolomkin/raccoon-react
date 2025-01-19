declare module '*.module.css' {
  const classNames: {
    [key: string]: string
  }
  export default classNames
}

declare module '*.module.less' {
  const classNames: {
    [key: string]: string
  }
  export default classNames
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'

declare module '*.url.svg' {
  const content: string
  export default content
}

declare module '*.svg' {
  import { FC, SVGProps } from 'react'
  const content: FC<SVGProps<SVGSVGElement>>
  export default content
}

declare const __VERSION__: string
