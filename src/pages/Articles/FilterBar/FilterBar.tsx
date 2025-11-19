import React, { useMemo, useState } from 'react'

import { debounce } from 'shared/utils'

import { FilterBarWrapper, FilterInput } from './FilterBar.styled'

import styles from './FilterBar.module.less'

export interface FilterBarProps {
  initValue: string
  onChange: (value: string) => void
}

export const FilterBar: React.FC<FilterBarProps> = ({
  initValue,
  onChange,
}) => {
  const [value, setValue] = useState(initValue)

  const debouncedOnChange = useMemo(() => debounce(onChange, 700), [onChange])

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
        data-testid="filterbar-input-filtervalue"
      />
      <i className={`${styles.icon} fa-solid fa-filter`}></i>
    </FilterBarWrapper>
  )
}
