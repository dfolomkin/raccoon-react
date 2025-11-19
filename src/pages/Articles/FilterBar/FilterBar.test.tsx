import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { FilterBar } from './FilterBar'

describe('FilterBar', () => {
  const mockOnChange = jest.fn()
  const defaultProps = {
    initValue: '',
    onChange: mockOnChange,
  }

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should render filter input with initial value', () => {
    render(<FilterBar {...defaultProps} initValue="initial" />)

    const input = screen.getByTestId('filterbar-input-filtervalue')

    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('initial')
  })

  it('should update input value when user types', () => {
    render(<FilterBar {...defaultProps} />)

    const input = screen.getByTestId('filterbar-input-filtervalue')

    fireEvent.change(input, { target: { value: 'test' } })

    expect(input).toHaveValue('test')
  })

  it('should call onChange with debounced value when user types', () => {
    render(<FilterBar {...defaultProps} />)

    const input = screen.getByTestId('filterbar-input-filtervalue')

    fireEvent.change(input, { target: { value: 'search query' } })

    // Should not call immediately due to debounce
    expect(mockOnChange).not.toHaveBeenCalled()

    // Fast-forward time
    jest.runAllTimers()

    // Should call after debounce delay
    expect(mockOnChange).toHaveBeenCalledWith('search query')
    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it('should debounce multiple rapid changes', () => {
    render(<FilterBar {...defaultProps} />)

    const input = screen.getByTestId('filterbar-input-filtervalue')

    // Rapid successive changes
    fireEvent.change(input, { target: { value: 'a' } })
    fireEvent.change(input, { target: { value: 'ab' } })
    fireEvent.change(input, { target: { value: 'abc' } })

    // Should not call immediately
    expect(mockOnChange).not.toHaveBeenCalled()

    // Fast-forward time
    jest.runAllTimers()

    // Should only call once with the last value
    expect(mockOnChange).toHaveBeenCalledWith('abc')
    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it('should handle empty initial value', () => {
    render(<FilterBar {...defaultProps} initValue="" />)

    const input = screen.getByTestId('filterbar-input-filtervalue')

    expect(input).toHaveValue('')
  })
})
