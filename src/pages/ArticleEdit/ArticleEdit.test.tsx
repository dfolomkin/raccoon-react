import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { getArticle, postArticle, putArticle } from 'services'

import { ArticleEdit } from './ArticleEdit'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '1' }),
  useNavigate: () => mockNavigate,
}))

jest.mock('services', () => ({
  getArticle: jest.fn().mockResolvedValue({ data: null, error: null }),
  putArticle: jest.fn().mockResolvedValue({ data: null, error: null }),
  postArticle: jest.fn().mockResolvedValue({ data: null, error: null }),
}))

const mockGetArticle = getArticle as jest.MockedFunction<typeof getArticle>
const mockPutArticle = putArticle as jest.MockedFunction<typeof putArticle>
const mockPostArticle = postArticle as jest.MockedFunction<typeof postArticle>

const mockArticleData = {
  id: 1,
  author: 'John Doe',
  title: 'First Article',
  content: 'Content 1',
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

describe('ArticleEdit', () => {
  beforeEach(() => {
    jest.resetModules()

    jest.doMock('react-router-dom', () => ({
      useNavigate: () => jest.fn(),
      useParams: jest.fn().mockReturnValue({ id: '1' }),
    }))
  })

  it('should render form with all form fields', async () => {
    mockGetArticle.mockResolvedValue({ data: mockArticleData, error: null })

    render(<ArticleEdit />)

    await waitFor(() => {
      expect(screen.getByTestId('articleedit-form-main')).toBeInTheDocument()
      expect(screen.getByTestId('articleedit-input-file')).toBeInTheDocument()
      expect(screen.getByTestId('articleedit-input-author')).toBeInTheDocument()
      expect(screen.getByTestId('articleedit-input-title')).toBeInTheDocument()
      expect(
        screen.getByTestId('articleedit-textarea-content')
      ).toBeInTheDocument()
      expect(screen.getByTestId('articleedit-input-tags')).toBeInTheDocument()
    })
  })

  it('should populate form with article data when editing', async () => {
    mockGetArticle.mockResolvedValue({ data: mockArticleData, error: null })

    render(<ArticleEdit />)

    await waitFor(() => {
      expect(screen.getByTestId('articleedit-input-file')).toHaveValue('')
      expect(screen.getByTestId('articleedit-input-author')).toHaveValue(
        'John Doe'
      )
      expect(screen.getByTestId('articleedit-input-title')).toHaveValue(
        'First Article'
      )
      expect(screen.getByTestId('articleedit-textarea-content')).toHaveValue(
        'Content 1'
      )
      expect(screen.getByTestId('articleedit-input-tags')).toHaveValue(
        'tagOne, tagTwo'
      )
    })
  })

  it('should show image preview when imageFileName exists', async () => {
    mockGetArticle.mockResolvedValue({ data: mockArticleData, error: null })

    render(<ArticleEdit />)

    await waitFor(() => {
      expect(screen.getByTestId('articleedit-img-image')).toBeInTheDocument()
      expect(screen.getByTestId('articleedit-img-image')).toHaveAttribute(
        'alt',
        'test-image.jpg'
      )
    })
  })

  it('should show content length counter', async () => {
    mockGetArticle.mockResolvedValue({ data: mockArticleData, error: null })

    render(<ArticleEdit />)

    await waitFor(() => {
      expect(
        screen.getByTestId('articleedit-block-contentlength')
      ).toHaveTextContent('9 / 100')
    })
  })

  it('should disable save button initially when no changes made', async () => {
    mockGetArticle.mockResolvedValue({ data: mockArticleData, error: null })

    render(<ArticleEdit />)

    await waitFor(() => {
      const saveButton = screen.getByTestId('articleedit-button-save')

      expect(saveButton).toBeDisabled()
    })
  })

  it('should enable save button when form changes are made', async () => {
    mockGetArticle.mockResolvedValue({ data: mockArticleData, error: null })

    render(<ArticleEdit />)

    await waitFor(() => {
      const authorInput = screen.getByTestId('articleedit-input-author')

      fireEvent.change(authorInput, { target: { value: 'Updated Author' } })
    })

    await waitFor(() => {
      const saveButton = screen.getByTestId('articleedit-button-save')

      expect(saveButton).toBeEnabled()
    })
  })

  it('should submit form and call putArticle when editing existing article', async () => {
    mockGetArticle.mockResolvedValue({ data: mockArticleData, error: null })
    mockPutArticle.mockResolvedValue({ data: mockArticleData, error: null })

    render(
      <MemoryRouter initialEntries={['/article-edit/1']}>
        <Routes>
          <Route path="/article-edit/:id" element={<ArticleEdit />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      const authorInput = screen.getByTestId('articleedit-input-author')

      fireEvent.change(authorInput, { target: { value: 'Updated Author' } })
    })

    const saveButton = screen.getByTestId('articleedit-button-save')

    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(mockPutArticle).toHaveBeenCalledTimes(1)
      expect(mockNavigate).toHaveBeenCalledWith('/articles')
    })
  })

  xit('should submit form and call postArticle when creating new article', async () => {
    mockPostArticle.mockResolvedValue({ data: mockArticleData, error: null })

    render(
      <MemoryRouter initialEntries={['/article-new']}>
        <Routes>
          <Route path="/article-new" element={<ArticleEdit />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      const authorInput = screen.getByTestId('articleedit-input-author')

      fireEvent.change(authorInput, { target: { value: 'New Author' } })
    })

    const saveButton = screen.getByTestId('articleedit-button-save')

    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(mockPostArticle).toHaveBeenCalledTimes(1)
      expect(mockNavigate).toHaveBeenCalledWith('/articles')
    })
  })

  it('should navigate to articles when cancel button is clicked', async () => {
    mockGetArticle.mockResolvedValue({ data: mockArticleData, error: null })

    render(<ArticleEdit />)

    await waitFor(() => {
      const cancelButton = screen.getByTestId('articleedit-button-cancel')

      fireEvent.click(cancelButton)
    })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/articles')
    })
  })

  it('should show error message when article fetch fails', async () => {
    const mockError = { message: 'Failed to fetch article', code: 500 }

    mockGetArticle.mockResolvedValue({ data: null, error: mockError })

    render(<ArticleEdit />)

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch article')).toBeInTheDocument()
    })
  })

  it('should update tags when tags input changes', async () => {
    mockGetArticle.mockResolvedValue({ data: mockArticleData, error: null })

    render(<ArticleEdit />)

    await waitFor(() => {
      const tagsInput = screen.getByTestId('articleedit-input-tags')

      fireEvent.change(tagsInput, { target: { value: 'newTag, anotherTag' } })
    })

    await waitFor(() => {
      const saveButton = screen.getByTestId('articleedit-button-save')

      expect(saveButton).toBeEnabled()
    })
  })

  xit('should handle content textarea change and update counter', async () => {
    mockGetArticle.mockResolvedValue({ data: mockArticleData, error: null })

    render(<ArticleEdit />)

    await waitFor(() => {
      const contentTextarea = screen.getByTestId('articleedit-textarea-content')

      fireEvent.change(contentTextarea, {
        target: { value: 'Updated content with more text' },
      })
    })

    await waitFor(() => {
      expect(
        screen.getByTestId('articleedit-block-contentlength')
      ).toHaveTextContent('33 / 100')
    })
  })
})
