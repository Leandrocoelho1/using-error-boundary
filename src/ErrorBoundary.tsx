import {AxiosError} from 'axios'
import React, {ComponentType} from 'react'

interface ErrorBoundaryProps {
  FallbackComponent: ComponentType<{error: AxiosError}>
}

interface State {
  error: AxiosError | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  state: State = {error: null}
  static getDerivedStateFromError(error: AxiosError | null) {
    return {error}
  }
  render() {
    const {error} = this.state
    if (error) {
      return <this.props.FallbackComponent error={error} />
    }

    return this.props.children
  }
}
