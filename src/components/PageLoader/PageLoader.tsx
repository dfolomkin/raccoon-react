import React from 'react'

import { Loader } from 'components/Loader'

import styles from './PageLoader.module.less'

export function PageLoader() {
  return (
    <div className={styles.pageLoader}>
      <Loader size="medium" />
    </div>
  )
}
