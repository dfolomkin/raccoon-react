import React from 'react'

import styles from './Tag.module.less'

interface TagProps {
  caption: string
}

export const Tag: React.FC<TagProps> = ({ caption }) => (
  <div className={styles.tag}>{caption}</div>
)
