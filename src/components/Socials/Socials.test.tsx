import React from 'react'
import { render, screen } from '@testing-library/react'

import { ISocial } from 'shared/types'

import { Socials } from './Socials'

jest.mock('./Social', () => ({
  Social: ({ variant, count }: { variant: string; count: number }) => (
    <div data-testid="social" data-variant={variant} data-count={count}>
      {variant}: {count}
    </div>
  ),
}))

describe('Socials', () => {
  const mockCountsMap: Record<ISocial, number> = {
    facebook: 150,
    gplus: 7,
    twitter: 89,
    vk: 245,
    yaru: 42,
  }

  it('should render all social items from countsMap', () => {
    render(<Socials countsMap={mockCountsMap} />)

    const socialItems = screen.getAllByTestId('social')

    expect(socialItems).toHaveLength(5)
  })

  it('should pass correct variant and count props to each Social component', () => {
    render(<Socials countsMap={mockCountsMap} />)

    const socialItems = screen.getAllByTestId('social')

    expect(socialItems[0]).toHaveAttribute('data-variant', 'facebook')
    expect(socialItems[0]).toHaveAttribute('data-count', '150')
    expect(socialItems[1]).toHaveAttribute('data-variant', 'gplus')
    expect(socialItems[1]).toHaveAttribute('data-count', '7')
    expect(socialItems[2]).toHaveAttribute('data-variant', 'twitter')
    expect(socialItems[2]).toHaveAttribute('data-count', '89')
    expect(socialItems[3]).toHaveAttribute('data-variant', 'vk')
    expect(socialItems[3]).toHaveAttribute('data-count', '245')
    expect(socialItems[4]).toHaveAttribute('data-variant', 'yaru')
    expect(socialItems[4]).toHaveAttribute('data-count', '42')
  })

  it('should render correctly when countsMap is empty', () => {
    render(<Socials countsMap={{} as Record<ISocial, number>} />)

    const socialItems = screen.queryAllByTestId('social')

    expect(socialItems).toHaveLength(0)
  })

  it('should handle countsMap with single social platform', () => {
    const singleSocialMap = { facebook: 100 } as Record<ISocial, number>

    render(<Socials countsMap={singleSocialMap} />)

    const socialItems = screen.getAllByTestId('social')

    expect(socialItems).toHaveLength(1)
    expect(socialItems[0]).toHaveAttribute('data-variant', 'facebook')
    expect(socialItems[0]).toHaveAttribute('data-count', '100')
  })

  it('should handle social counts of zero', () => {
    const zeroCountsMap = {
      facebook: 0,
      twitter: 0,
    } as Record<ISocial, number>

    render(<Socials countsMap={zeroCountsMap} />)

    const socialItems = screen.getAllByTestId('social')

    expect(socialItems).toHaveLength(2)
    expect(socialItems[0]).toHaveAttribute('data-count', '0')
    expect(socialItems[1]).toHaveAttribute('data-count', '0')
  })

  it('should handle negative counts if they occur', () => {
    const negativeCountsMap = {
      facebook: -5,
      twitter: 10,
    } as Record<ISocial, number>

    render(<Socials countsMap={negativeCountsMap} />)

    const socialItems = screen.getAllByTestId('social')

    expect(socialItems[0]).toHaveAttribute('data-count', '-5')
    expect(socialItems[1]).toHaveAttribute('data-count', '10')
  })

  it('should maintain correct order of social platforms', () => {
    render(<Socials countsMap={mockCountsMap} />)

    const socialItems = screen.getAllByTestId('social')
    const variants = socialItems.map((item) =>
      item.getAttribute('data-variant')
    )

    expect(variants).toEqual(['facebook', 'gplus', 'twitter', 'vk', 'yaru'])
  })
})
