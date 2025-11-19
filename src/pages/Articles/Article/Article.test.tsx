import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { ModalProps } from 'components/Modal'
import { SocialsProps } from 'components/Socials'
import { deleteArticle } from 'services'

import { Article } from './Article'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

jest.mock('moment', () => {
  return () => ({
    format: () => '17:09 Sep 29, 2017',
  })
})

jest.mock('services', () => ({
  deleteArticle: jest.fn(),
}))

const mockDeleteArticle = deleteArticle as jest.MockedFunction<
  typeof deleteArticle
>

jest.mock('components/Modal', () => ({
  Modal: ({ children, onCancel, onAccept }: ModalProps) => (
    <div data-testid="modal">
      <div>{children}</div>
      <button onClick={onCancel} data-testid="modal-button-cancel">
        Cancel
      </button>
      <button onClick={onAccept} data-testid="modal-button-accept">
        Accept
      </button>
    </div>
  ),
}))

jest.mock('components/Socials', () => ({
  Socials: ({ countsMap }: SocialsProps) => (
    <div data-testid="socials" data-counts={JSON.stringify(countsMap)}>
      Socials Component
    </div>
  ),
}))

jest.mock('./Article.styled', () => ({
  ...jest.requireActual('./Article.styled'),
  ClockIcon: () => <svg data-testid="article-icon-clock">Clock</svg>,
  FoostepIcon: () => <svg data-testid="article-icon-footstep">Foostep</svg>,
}))

const mockArticleData = {
  id: 1,
  author: 'John Doe',
  title: 'Test Article Title',
  content: 'This is the article content',
  tags: ['tagOne', 'tagTwo'],
  socials: {
    facebook: 16,
    gplus: 7,
    twitter: 15,
    vk: 16,
    yaru: 1,
  },
  date: 1506694140000,
  imageFileName: 'test-image.jpg',
}

describe('Article', () => {
  it('should render all article blocks with correct content', () => {
    render(<Article articleData={mockArticleData} />)

    // Check image
    const image = screen.getByTestId(`article-img-image:${mockArticleData.id}`)

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining(mockArticleData.imageFileName)
    )
    expect(image).toHaveAttribute('alt', mockArticleData.imageFileName)

    // Check title
    const title = screen.getByTestId(
      `article-header-title:${mockArticleData.id}`
    )

    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(mockArticleData.title)

    // Check info block
    expect(
      screen.getByTestId(`article-block-info:${mockArticleData.id}`)
    ).toBeInTheDocument()

    // Check time
    const time = screen.getByTestId(`article-block-time:${mockArticleData.id}`)

    expect(time).toBeInTheDocument()
    expect(time).toHaveTextContent('17:09 Sep 29, 2017')
    expect(screen.getByTestId('article-icon-clock')).toBeInTheDocument()

    // Check author
    const author = screen.getByTestId(
      `article-block-author:${mockArticleData.id}`
    )

    expect(author).toBeInTheDocument()
    expect(author).toHaveTextContent(mockArticleData.author)
    expect(screen.getByTestId('article-icon-footstep')).toBeInTheDocument()

    // Check content
    const content = screen.getByTestId(
      `article-block-content:${mockArticleData.id}`
    )

    expect(content).toBeInTheDocument()
    expect(content).toHaveTextContent(mockArticleData.content)

    // Check control panel
    expect(
      screen.getByTestId(`article-block-controls:${mockArticleData.id}`)
    ).toBeInTheDocument()

    // Check edit button
    const editButton = screen.getByTestId(
      `article-button-edit:${mockArticleData.id}`
    )

    expect(editButton).toBeInTheDocument()
    expect(editButton.querySelector('.fa-pencil')).toBeInTheDocument()

    // Check delete button
    const deleteButton = screen.getByTestId(
      `article-button-delete:${mockArticleData.id}`
    )

    expect(deleteButton).toBeInTheDocument()
    expect(deleteButton.querySelector('.fa-trash')).toBeInTheDocument()

    // Check Socials component
    const socials = screen.getByTestId('socials')

    expect(socials).toBeInTheDocument()
    expect(socials).toHaveAttribute(
      'data-counts',
      JSON.stringify(mockArticleData.socials)
    )
  })

  it('should navigate to edit page when edit button is clicked', async () => {
    render(<Article articleData={mockArticleData} />)

    const editButton = screen.getByTestId(
      `article-button-edit:${mockArticleData.id}`
    )

    fireEvent.click(editButton)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        `/article-edit/${mockArticleData.id}`
      )
    })
  })

  it('should open delete modal when delete button is clicked', () => {
    render(<Article articleData={mockArticleData} />)

    const deleteButton = screen.getByTestId(
      `article-button-delete:${mockArticleData.id}`
    )

    fireEvent.click(deleteButton)

    expect(screen.getByTestId('modal')).toBeInTheDocument()
    expect(
      screen.getByText('Do you really want to delete this article?')
    ).toBeInTheDocument()
  })

  it('should close delete modal when cancel is clicked', async () => {
    render(<Article articleData={mockArticleData} />)

    // Open modal
    const deleteButton = screen.getByTestId(
      `article-button-delete:${mockArticleData.id}`
    )

    fireEvent.click(deleteButton)
    expect(screen.getByTestId('modal')).toBeInTheDocument()

    // Close modal
    const cancelButton = screen.getByTestId('modal-button-cancel')

    fireEvent.click(cancelButton)

    await waitFor(() => {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
    })
  })

  it('should delete article and refresh when modal accept is clicked', async () => {
    render(<Article articleData={mockArticleData} />)

    // Open modal
    const deleteButton = screen.getByTestId(
      `article-button-delete:${mockArticleData.id}`
    )

    fireEvent.click(deleteButton)

    // Accept deletion
    const acceptButton = screen.getByTestId('modal-button-accept')

    fireEvent.click(acceptButton)

    await waitFor(() => {
      expect(mockDeleteArticle).toHaveBeenCalledTimes(1)
      expect(mockNavigate).toHaveBeenCalledWith(0)
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
    })
  })

  it('should not render modal initially', () => {
    render(<Article articleData={mockArticleData} />)

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  it('should handle different article data correctly', () => {
    const differentArticleData = {
      ...mockArticleData,
      id: 2,
      title: 'Different Title',
      author: 'Jane Smith',
    }

    render(<Article articleData={differentArticleData} />)

    expect(screen.getByTestId('article-header-title:2')).toHaveTextContent(
      'Different Title'
    )
    expect(screen.getByTestId('article-block-author:2')).toHaveTextContent(
      'Jane Smith'
    )
  })
})
