import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { PageLoader } from 'components'
import { MainLayout } from 'pages'
// NOTE: this causes error with @pmmmwh/react-refresh-webpack-plugin and react-refresh-typescript
// Cannot read properties of undefined (reading 'MainLayout')
// import { MainLayout } from 'pages/MainLayout'
import { ROUTES } from 'shared/constants'

import styles from './App.module.less'

const ArticleEdit = React.lazy(() =>
  import('pages/ArticleEdit/ArticleEdit').then((module) => ({
    default: module.ArticleEdit,
  }))
)
const Articles = React.lazy(() =>
  import('pages/Articles/Articles').then((module) => ({
    default: module.Articles,
  }))
)

export const App = () => (
  <ErrorBoundary
    fallback={
      <div className={styles.message}>
        <i className="fa-regular fa-face-frown"></i>&ensp;Something went wrong!
      </div>
    }
  >
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Articles />} />
            <Route path={ROUTES.articles} element={<Articles />} />
            <Route
              path={`${ROUTES.articleEdit}/:id`}
              element={<ArticleEdit />}
            />
            <Route path={ROUTES.articleNew} element={<ArticleEdit />} />
          </Route>
          <Route
            path="*"
            element={
              <div className={styles.message}>{`Page doesn't exist`}</div>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  </ErrorBoundary>
)
