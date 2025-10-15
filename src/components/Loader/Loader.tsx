import React from 'react'

import styles from './Loader.module.less'

interface LoaderProps {
  size?: 'small' | 'medium'
}

const sizeMap = {
  small: '4.8rem',
  medium: '9.6rem',
}

export function Loader({ size = 'small' }: LoaderProps) {
  const calculatedSize = sizeMap[size]

  return (
    <div
      className={styles.loader}
      style={
        { '--width': calculatedSize, '--height': calculatedSize } as unknown
      }
    ></div>
  )
}
