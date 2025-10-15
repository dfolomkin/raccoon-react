import React from 'react'

import styles from './Tag.module.less'

interface TagProps {
  caption: string
}

export function Tag({ caption }: TagProps) {
  return <div className={styles.tag}>{caption}</div>
}
