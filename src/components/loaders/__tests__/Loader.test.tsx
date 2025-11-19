import React from 'react'
import { render, screen } from '@testing-library/react'

import { Loader } from '../Loader'

describe('Loader', () => {
  it('should have style corresponding to small size by default', () => {
    render(<Loader />)

    const loaderBlock = screen.getByTestId('loader-block-main')

    expect(loaderBlock).toHaveStyle({
      width: '4.8rem',
      height: '4.8rem',
    })
  })
})
