import React from 'react'
import { render, screen } from '@testing-library/react'

import { Tag } from './Tag'

describe('Tag', () => {
  it('should render the caption text', () => {
    const testCaption = 'React'

    render(<Tag caption={testCaption} />)

    expect(screen.getByText(testCaption)).toBeInTheDocument()
  })
})
