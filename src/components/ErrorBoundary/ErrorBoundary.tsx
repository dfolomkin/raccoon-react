import React from 'react'

interface ErrorBoundaryProps {
  fallback: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<ErrorBoundaryProps>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: unknown) {
    // eslint-disable-next-line no-console
    console.error(error)

    return { hasError: true }
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // eslint-disable-next-line no-console
    console.error(error, errorInfo)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}
