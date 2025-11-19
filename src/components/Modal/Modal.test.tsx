import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { Modal } from './Modal'

const MockChild = () => <div data-testid="mock-child">Modal Content</div>

describe('Modal', () => {
  const mockOnCancel = jest.fn()
  const mockOnAccept = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render children correctly', () => {
    render(
      <Modal onCancel={mockOnCancel}>
        <MockChild />
      </Modal>
    )

    expect(screen.getByTestId('mock-child')).toBeInTheDocument()
  })

  it('should render both Accept and Cancel buttons', () => {
    render(
      <Modal onCancel={mockOnCancel} onAccept={mockOnAccept}>
        <MockChild />
      </Modal>
    )

    expect(screen.getByTestId('modal-button-accept')).toBeInTheDocument()
    expect(screen.getByTestId('modal-button-cancel')).toBeInTheDocument()
  })

  it('should call onCancel when Cancel button is clicked', () => {
    render(
      <Modal onCancel={mockOnCancel} onAccept={mockOnAccept}>
        <MockChild />
      </Modal>
    )

    const cancelButton = screen.getByTestId('modal-button-cancel')

    fireEvent.click(cancelButton)

    expect(mockOnCancel).toHaveBeenCalledTimes(1)
  })

  it('should call onAccept when Accept button is clicked', () => {
    render(
      <Modal onCancel={mockOnCancel} onAccept={mockOnAccept}>
        <MockChild />
      </Modal>
    )

    const acceptButton = screen.getByTestId('modal-button-accept')

    fireEvent.click(acceptButton)

    expect(mockOnAccept).toHaveBeenCalledTimes(1)
  })

  it('should not call onAccept when Accept button is clicked and onAccept is not provided', () => {
    render(
      <Modal onCancel={mockOnCancel}>
        <MockChild />
      </Modal>
    )

    const acceptButton = screen.getByTestId('modal-button-accept')

    fireEvent.click(acceptButton)

    expect(mockOnAccept).not.toHaveBeenCalled()
  })

  it('should render with correct icons in buttons', () => {
    render(
      <Modal onCancel={mockOnCancel} onAccept={mockOnAccept}>
        <MockChild />
      </Modal>
    )

    const acceptButton = screen.getByTestId('modal-button-accept')
    const cancelButton = screen.getByTestId('modal-button-cancel')

    expect(acceptButton.querySelector('.fa-check')).toBeInTheDocument()
    expect(cancelButton.querySelector('.fa-times')).toBeInTheDocument()
  })

  it('should render button text with correct labels', () => {
    render(
      <Modal onCancel={mockOnCancel} onAccept={mockOnAccept}>
        <MockChild />
      </Modal>
    )

    const acceptButton = screen.getByTestId('modal-button-accept')
    const cancelButton = screen.getByTestId('modal-button-cancel')

    expect(acceptButton).toHaveTextContent('Accept')
    expect(cancelButton).toHaveTextContent('Cancel')
  })

  it('should have properly enabled buttons', () => {
    render(
      <Modal onCancel={mockOnCancel} onAccept={mockOnAccept}>
        <MockChild />
      </Modal>
    )

    expect(screen.getByTestId('modal-button-accept')).toBeEnabled()
    expect(screen.getByTestId('modal-button-cancel')).toBeEnabled()
  })

  it('should render with correct modal structure', () => {
    const { container } = render(
      <Modal onCancel={mockOnCancel} onAccept={mockOnAccept}>
        <MockChild />
      </Modal>
    )

    expect(container.firstChild).toBeInTheDocument()
    expect(screen.getByTestId('modal-block-content')).toBeInTheDocument()
    expect(screen.getByTestId('modal-block-controls')).toBeInTheDocument()
  })

  it('should handle multiple consecutive clicks correctly', () => {
    render(
      <Modal onCancel={mockOnCancel} onAccept={mockOnAccept}>
        <MockChild />
      </Modal>
    )

    const acceptButton = screen.getByTestId('modal-button-accept')
    const cancelButton = screen.getByTestId('modal-button-cancel')

    // Multiple clicks on Accept
    fireEvent.click(acceptButton)
    fireEvent.click(acceptButton)
    expect(mockOnAccept).toHaveBeenCalledTimes(2)

    // Multiple clicks on Cancel
    fireEvent.click(cancelButton)
    fireEvent.click(cancelButton)
    expect(mockOnCancel).toHaveBeenCalledTimes(2)
  })

  it('should maintain component structure after user interactions', () => {
    render(
      <Modal onCancel={mockOnCancel} onAccept={mockOnAccept}>
        <MockChild />
      </Modal>
    )

    // Verify inxitial structure
    expect(screen.getByTestId('modal-button-accept')).toBeInTheDocument()
    expect(screen.getByTestId('modal-button-cancel')).toBeInTheDocument()
    expect(screen.getByTestId('mock-child')).toBeInTheDocument()

    // Perform interactions
    fireEvent.click(screen.getByTestId('modal-button-accept'))
    fireEvent.click(screen.getByTestId('modal-button-cancel'))

    // Verify structure remains after interactions
    expect(screen.getByTestId('modal-button-accept')).toBeInTheDocument()
    expect(screen.getByTestId('modal-button-cancel')).toBeInTheDocument()
    expect(screen.getByTestId('mock-child')).toBeInTheDocument()
  })
})
