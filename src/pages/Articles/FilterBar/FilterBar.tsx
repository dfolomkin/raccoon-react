import React, { useState } from 'react'

import { debounce } from 'shared/utils'

import { FilterBarWrapper, FilterInput } from './FilterBar.styled'

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
    <FilterBarWrapper>
      <FilterInput
        type="text"
        value={value}
        onChange={(event) => handleInputChange(event.target.value)}
      />
      <i className={`${styles.icon} fa-solid fa-filter`}></i>
    </FilterBarWrapper>
  )
}
