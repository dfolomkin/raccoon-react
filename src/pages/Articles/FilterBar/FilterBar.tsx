import React from 'react'

import { debounce } from 'shared/utils'

import styles from './FilterBar.module.less'

interface FilterBarProps {
  initValue: string
  onChange: (value: string) => void
}

interface FilterBarState {
  value: string
}

export class FilterBar extends React.Component<FilterBarProps, FilterBarState> {
  constructor(props: FilterBarProps) {
    super(props)
    this.state = {
      value: props.initValue,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.debouncedOnChange = this.debouncedOnChange.bind(this)
  }

  debouncedOnChange = debounce(this.props.onChange, 700)

  handleInputChange(value: string) {
    this.setState({ value })
    this.debouncedOnChange(value)
  }

  render() {
    return (
      <div className={styles.filterBar}>
        <input
          className={styles.filterBar__input}
          type="text"
          value={this.state.value}
          onChange={(e) => this.handleInputChange(e.target.value)}
        />
        <i className={`${styles.filterBar__icon} fa-solid fa-filter`}></i>
      </div>
    )
  }
}
