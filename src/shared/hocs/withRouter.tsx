import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export interface RouterProps {
  router: {
    location: ReturnType<typeof useLocation>
    navigate: ReturnType<typeof useNavigate>
    params: ReturnType<typeof useParams>
  }
}

export const withRouter = <P extends object>(
  Component: React.ComponentType<P & RouterProps>
) => {
  const EnhancedComponent = (props: P) => {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()

    return <Component {...props} router={{ location, navigate, params }} />
  }

  return EnhancedComponent
}
