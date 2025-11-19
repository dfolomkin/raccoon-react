import React from 'react'
import { render, screen } from '@testing-library/react'

import { Tags } from './Tags'

jest.mock('./Tag', () => ({
  Tag: ({ caption }: { caption: string }) => (
    <div data-testid="tag">{caption}</div>
  ),
}))

describe('Tags', () => {
  const mockTagsList = [
    { id: 1, name: 'React' },
    { id: 2, name: 'TypeScript' },
    { id: 3, name: 'Testing' },
  ]

  it('should render all tags from the tagsList', () => {
    render(<Tags tagsList={mockTagsList} />)

    const tags = screen.getAllByTestId('tag')

    expect(tags).toHaveLength(3)
  })

  it('should render tags with correct captions', () => {
    render(<Tags tagsList={mockTagsList} />)

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Testing')).toBeInTheDocument()
  })

  it('should render correctly when tagsList is empty', () => {
    render(<Tags tagsList={[]} />)

    const tags = screen.queryAllByTestId('tag')

    expect(tags).toHaveLength(0)
  })

  it('should render without errors when tagsList contains single tag', () => {
    const singleTag = [{ id: 1, name: 'Single' }]

    render(<Tags tagsList={singleTag} />)

    const tags = screen.getAllByTestId('tag')

    expect(tags).toHaveLength(1)
    expect(screen.getByText('Single')).toBeInTheDocument()
  })

  it('should maintain consistent structure with varying tag counts', () => {
    const { rerender } = render(<Tags tagsList={mockTagsList} />)

    // Initial render with 3 tags
    expect(screen.getAllByTestId('tag')).toHaveLength(3)

    // Re-render with more tags
    const moreTags = [
      ...mockTagsList,
      { id: 4, name: 'JavaScript' },
      { id: 5, name: 'Python' },
    ]

    rerender(<Tags tagsList={moreTags} />)
    expect(screen.getAllByTestId('tag')).toHaveLength(5)

    // Re-render with fewer tags
    const fewerTags = [mockTagsList[0]]

    rerender(<Tags tagsList={fewerTags} />)
    expect(screen.getAllByTestId('tag')).toHaveLength(1)
  })
})
