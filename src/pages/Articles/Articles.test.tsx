import React from 'react'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'

import { getArticles } from 'services'

import { ArticleProps } from './Article/Article'
import { Articles } from './Articles'
import { FilterBarProps } from './FilterBar'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    search: '',
  }),
}))

jest.mock('services', () => ({
  getArticles: jest.fn().mockResolvedValue({ data: [], error: null }),
}))

const mockGetArticles = getArticles as jest.MockedFunction<typeof getArticles>

const mockGetUrlQueryParamValue = jest.fn(() => '')

jest.mock('shared/utils', () => ({
  getUrlQueryParamValue: () => mockGetUrlQueryParamValue(),
  objectIncludes: jest.fn(() => true),
}))

jest.mock('./FilterBar', () => ({
  FilterBar: ({ initValue, onChange }: FilterBarProps) => (
    <div data-testid="filterbar">
      <input
        data-testid="filterbar-input"
        value={initValue}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  ),
}))

jest.mock('components', () => ({
  ...jest.requireActual('components'),
  PageLoader: () => <div data-testid="page-loader">Loading...</div>,
}))

jest.mock('./Article', () => ({
  Article: ({ articleData }: ArticleProps) => (
    <div data-testid={`article-${articleData.id}`}>{articleData.title}</div>
  ),
}))

const mockArticlesData = [
  {
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
  },
  {
    id: 2,
    author: 'Jane Smith',
    title: 'Second Article',
    content: 'Content 2',
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
  },
]

describe('Articles', () => {
  it('should render control panel with FilterBar and AddButton', async () => {
    mockGetArticles.mockResolvedValue({ data: [], error: null })

    render(<Articles />)

    await waitFor(() => {
      expect(screen.getByTestId('articles-block-controls')).toBeInTheDocument()
      expect(screen.getByTestId('filterbar')).toBeInTheDocument()

      const addButton = screen.getByTestId('articles-button-addarticle')

      expect(addButton).toBeInTheDocument()
      expect(addButton).toHaveTextContent('Add article')
    })
  })

  it('should show loading state when data is fetching', async () => {
    mockGetArticles.mockImplementation(() => new Promise(() => {}))

    render(<Articles />)

    await waitFor(() => {
      expect(screen.getByTestId('page-loader')).toBeInTheDocument()
    })
  })

  it('should show error message when articles fetch fails', async () => {
    const mockError = { message: 'Failed to fetch articles', code: 500 }

    mockGetArticles.mockResolvedValue({ data: null, error: mockError })

    render(<Articles />)

    await waitFor(() => {
      const errorBlock = screen.getByTestId('articles-block-error')

      expect(errorBlock).toBeInTheDocument()
      expect(errorBlock).toHaveTextContent('Failed to fetch articles')
    })
  })

  it('should render articles list when data is loaded', async () => {
    mockGetArticles.mockResolvedValue({ data: mockArticlesData, error: null })

    render(<Articles />)

    await waitFor(() => {
      const articalOne = screen.getByTestId('article-1')

      expect(articalOne).toBeInTheDocument()
      expect(within(articalOne).getByText('First Article')).toBeInTheDocument()

      const articleTwo = screen.getByTestId('article-2')

      expect(articleTwo).toBeInTheDocument()
      expect(within(articleTwo).getByText('Second Article')).toBeInTheDocument()
    })
  })

  it('should navigate to new article page when add button is clicked', async () => {
    mockGetArticles.mockResolvedValue({ data: [], error: null })

    render(<Articles />)

    const addButton = screen.getByTestId('articles-button-addarticle')

    fireEvent.click(addButton)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/article-new')
    })
  })

  it('should update filter and navigate when FilterBar onChange is called', async () => {
    mockGetArticles.mockResolvedValue({ data: [], error: null })

    render(<Articles />)

    const filterInput = screen.getByTestId('filterbar-input')

    fireEvent.change(filterInput, { target: { value: 'test' } })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/articles?filter=test')
    })
  })

  it('should navigate without filter when empty value is provided', async () => {
    mockGetArticles.mockResolvedValue({ data: [], error: null })

    render(<Articles />)

    const filterInput = screen.getByTestId('filterbar-input')

    fireEvent.change(filterInput, { target: { value: 'test' } })
    fireEvent.change(filterInput, { target: { value: '' } })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/articles')
    })
  })

  it('should initialize filter from URL query parameter', async () => {
    mockGetUrlQueryParamValue.mockReturnValue('initial-filter')
    mockGetArticles.mockResolvedValue({ data: [], error: null })

    render(<Articles />)

    await waitFor(() => {
      const filterInput = screen.getByTestId('filterbar-input')

      expect(filterInput).toHaveValue('initial-filter')
    })
  })

  it('should call getArticles on component mount', async () => {
    mockGetArticles.mockResolvedValue({ data: [], error: null })

    render(<Articles />)

    await waitFor(() => {
      expect(mockGetArticles).toHaveBeenCalledTimes(1)
    })
  })
})
