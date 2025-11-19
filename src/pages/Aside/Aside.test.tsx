import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getTags } from 'services'
import { ITag } from 'shared/types'

import { Aside } from './Aside'

jest.mock('services', () => ({
  getTags: jest.fn().mockResolvedValue({ data: [], error: null }),
}))

const mockGetTags = getTags as jest.MockedFunction<typeof getTags>

jest.mock('components', () => ({
  ...jest.requireActual('components'),
  Loader: () => <div data-testid="aside-component-loader">Loading...</div>,
  Tags: ({ tagsList }: { tagsList: ITag[] }) => (
    <div data-testid="aside-component-tags">
      {tagsList.map((tag) => (
        <span key={tag.id}>{tag.name}</span>
      ))}
    </div>
  ),
}))

const mockProps = {
  isAboutOpen: false,
  isInfoOpen: false,
  isTagsOpen: false,
  onAboutToggle: jest.fn(),
  onInfoToggle: jest.fn(),
  onTagsToggle: jest.fn(),
}

describe('Aside', () => {
  describe('blocks existence', () => {
    it('should render all marked blocks with data-testid', async () => {
      render(<Aside {...mockProps} />)

      await waitFor(() => {
        // Check about section
        expect(screen.getByTestId('aside-block-note:about')).toBeInTheDocument()
        expect(
          screen.getByTestId('aside-block-notetitle:about')
        ).toBeInTheDocument()
        expect(
          screen.getByTestId('aside-block-button:about')
        ).toBeInTheDocument()
        expect(
          screen.getByTestId('aside-block-notebody:about')
        ).toBeInTheDocument()

        // Check info section
        expect(screen.getByTestId('aside-block-note:info')).toBeInTheDocument()
        expect(
          screen.getByTestId('aside-block-notetitle:info')
        ).toBeInTheDocument()
        expect(
          screen.getByTestId('aside-block-button:info')
        ).toBeInTheDocument()
        expect(
          screen.getByTestId('aside-block-notebody:info')
        ).toBeInTheDocument()

        // Check tags section
        expect(screen.getByTestId('aside-block-note:tags')).toBeInTheDocument()
        expect(
          screen.getByTestId('aside-block-notetitle:tags')
        ).toBeInTheDocument()
        expect(
          screen.getByTestId('aside-block-button:tags')
        ).toBeInTheDocument()
        expect(
          screen.getByTestId('aside-block-notebody:tags')
        ).toBeInTheDocument()
      })
    })
  })

  describe('callbacks firing', () => {
    it('should call onAboutToggle when about button is clicked', async () => {
      render(<Aside {...mockProps} />)

      await waitFor(() => {
        const aboutButton = screen.getByTestId('aside-block-button:about')

        fireEvent.click(aboutButton)
        expect(mockProps.onAboutToggle).toHaveBeenCalledTimes(1)
      })
    })

    it('should call onInfoToggle when info button is clicked', async () => {
      render(<Aside {...mockProps} />)

      await waitFor(() => {
        const infoButton = screen.getByTestId('aside-block-button:info')

        fireEvent.click(infoButton)
        expect(mockProps.onInfoToggle).toHaveBeenCalledTimes(1)
      })
    })

    it('should call onTagsToggle when tags button is clicked', async () => {
      render(<Aside {...mockProps} />)

      await waitFor(() => {
        const tagsButton = screen.getByTestId('aside-block-button:tags')

        fireEvent.click(tagsButton)
        expect(mockProps.onTagsToggle).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('block visibility', () => {
    it('should show about block on desktop', async () => {
      render(<Aside {...mockProps} />)

      await waitFor(() => {
        expect(screen.getByTestId('aside-block-note:about')).toHaveStyleRule(
          'opacity',
          '1',
          { media: '(min-width:  1024px)' }
        )
      })
    })

    it('should show info block on desktop', async () => {
      render(<Aside {...mockProps} />)

      await waitFor(() => {
        expect(screen.getByTestId('aside-block-note:info')).toHaveStyleRule(
          'opacity',
          '1',
          { media: '(min-width:  1024px)' }
        )
      })
    })

    it('should show tags block on desktop', async () => {
      render(<Aside {...mockProps} />)

      await waitFor(() => {
        expect(screen.getByTestId('aside-block-note:tags')).toHaveStyleRule(
          'opacity',
          '1',
          { media: '(min-width:  1024px)' }
        )
      })
    })

    it('should hide about block by default on tablet', async () => {
      render(<Aside {...mockProps} />)

      await waitFor(() => {
        expect(screen.getByTestId('aside-block-note:about')).toHaveStyleRule(
          'opacity',
          '0',
          { media: '(min-width:  480px) and (max-width:  1023px)' }
        )
      })
    })

    it('should show about block if it is open on tablet', async () => {
      render(<Aside {...mockProps} isAboutOpen />)

      await waitFor(() => {
        expect(screen.getByTestId('aside-block-note:about')).toHaveStyleRule(
          'opacity',
          '1',
          { media: '(min-width:  480px) and (max-width:  1023px)' }
        )
      })
    })

    it('should hide info block by default on tablet', async () => {
      render(<Aside {...mockProps} />)

      await waitFor(() => {
        expect(screen.getByTestId('aside-block-note:info')).toHaveStyleRule(
          'opacity',
          '0',
          { media: '(min-width:  480px) and (max-width:  1023px)' }
        )
      })
    })

    it('should show info block if it is open on tablet', async () => {
      render(<Aside {...mockProps} isInfoOpen />)

      await waitFor(() => {
        expect(screen.getByTestId('aside-block-note:info')).toHaveStyleRule(
          'opacity',
          '1',
          { media: '(min-width:  480px) and (max-width:  1023px)' }
        )
      })
    })

    it('should show tags block by default on tablet', async () => {
      render(<Aside {...mockProps} />)

      await waitFor(() => {
        expect(screen.getByTestId('aside-block-note:tags')).toHaveStyleRule(
          'opacity',
          '1',
          { media: '(min-width:  480px) and (max-width:  1023px)' }
        )
      })
    })

    it('should show tags block if it is open on tablet', async () => {
      render(<Aside {...mockProps} isTagsOpen />)

      await waitFor(() => {
        expect(screen.getByTestId('aside-block-note:tags')).toHaveStyleRule(
          'opacity',
          '1',
          { media: '(min-width:  480px) and (max-width:  1023px)' }
        )
      })
    })

    it('should hide about block by default on mobile', async () => {
      render(<Aside {...mockProps} />)

      await waitFor(() => {
        expect(screen.getByTestId('aside-block-note:about')).toHaveStyleRule(
          'opacity',
          '0',
          { media: '(max-width:  479px)' }
        )
      })
    })

    it('should show about block if it is open on tablet', async () => {
      render(<Aside {...mockProps} isAboutOpen />)

      await waitFor(() => {
        expect(screen.getByTestId('aside-block-note:about')).toHaveStyleRule(
          'opacity',
          '1',
          { media: '(max-width:  479px)' }
        )
      })
    })

    it('should hide info block by default on mobile', async () => {
      render(<Aside {...mockProps} />)

      await waitFor(() => {
        expect(screen.getByTestId('aside-block-note:info')).toHaveStyleRule(
          'opacity',
          '0',
          { media: '(max-width:  479px)' }
        )
      })
    })

    it('should show info block if it is open on mobile', async () => {
      render(<Aside {...mockProps} isInfoOpen />)

      await waitFor(() => {
        expect(screen.getByTestId('aside-block-note:info')).toHaveStyleRule(
          'opacity',
          '1',
          { media: '(max-width:  479px)' }
        )
      })
    })

    it('should hide tags block by default on mobile', async () => {
      render(<Aside {...mockProps} />)

      await waitFor(() => {
        expect(screen.getByTestId('aside-block-note:tags')).toHaveStyleRule(
          'opacity',
          '0',
          { media: '(max-width:  479px)' }
        )
      })
    })

    it('should show tags block if it is open on mobile', async () => {
      render(<Aside {...mockProps} isTagsOpen />)

      await waitFor(() => {
        expect(screen.getByTestId('aside-block-note:tags')).toHaveStyleRule(
          'opacity',
          '1',
          { media: '(max-width:  479px)' }
        )
      })
    })
  })

  describe('tags block data', () => {
    it('should call getTags service on component mount', async () => {
      mockGetTags.mockResolvedValue({ data: [], error: null })

      render(<Aside {...mockProps} />)

      await waitFor(() => {
        expect(getTags).toHaveBeenCalledTimes(1)
      })
    })

    it('should show loader when tags are loading', async () => {
      mockGetTags.mockImplementation(() => new Promise(() => {}))

      render(<Aside {...mockProps} />)

      await waitFor(() => {
        expect(screen.getByTestId('aside-component-loader')).toBeInTheDocument()
      })
    })

    it('should show error message when tags service fails', async () => {
      const errorMessage = 'Failed to fetch tags'

      mockGetTags.mockResolvedValue({
        data: null,
        error: { message: errorMessage, code: 500 },
      })

      render(<Aside {...mockProps} />)

      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument()
      })
    })

    it('should show Tags component with data when tags service succeeds', async () => {
      mockGetTags.mockResolvedValue({
        data: [
          { id: 1, name: 'React' },
          { id: 2, name: 'TypeScript' },
        ],
        error: null,
      })

      render(<Aside {...mockProps} />)

      await waitFor(() => {
        expect(screen.getByTestId('aside-component-tags')).toBeInTheDocument()
        expect(screen.getByText('React')).toBeInTheDocument()
        expect(screen.getByText('TypeScript')).toBeInTheDocument()
      })
    })
  })
})
