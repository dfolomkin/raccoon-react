import React from 'react'
import { render, screen } from '@testing-library/react'

import { PageLoader } from '../PageLoader'

describe('PageLoader', () => {
  it('should have style corresponding to medium size by default', () => {
    render(<PageLoader />)

    const loaderBlock = screen.getByTestId('loader-block-main')

    expect(loaderBlock).toHaveStyle({
      width: '9.6rem',
      height: '9.6rem',
    })
  })

  it('should have full page wrapper', () => {
    render(<PageLoader />)

    const loaderBlock = screen.getByTestId('loader-block-wrapper')

    expect(loaderBlock).toBeInTheDocument()
    expect(loaderBlock).toHaveStyle({
      height: '100%',
    })
  })
})
