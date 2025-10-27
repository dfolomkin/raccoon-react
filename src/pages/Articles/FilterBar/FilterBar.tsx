import React, { useState } from 'react'

import { debounce } from 'shared/utils'

import styles from './FilterBar.module.less'

interface FilterBarProps {
  initValue: string
  onChange: (value: string) => void
}

export const FilterBar: React.FC<FilterBarProps> = ({
  initValue,
  onChange,
}) => {
  const [value, setValue] = useState(initValue)

  const debouncedOnChange = debounce(onChange, 700)

  const handleInputChange = (value: string) => {
    setValue(value)
    debouncedOnChange(value)
  }

  return (
    <div className={styles.filterBar}>
      <input
        className={styles.filterBar__input}
        type="text"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <i className={`${styles.filterBar__icon} fa-solid fa-filter`}></i>
    </div>
  )
}
