import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

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

import { Header } from './components/Header'

export function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<Articles />} />
        <Route path="articles" element={<Articles />} />
        <Route path="article/:id" element={<ArticleEdit />} />
        <Route path="article" element={<ArticleEdit />} />
        <Route path="*" element={<div>not found</div>} />
      </Routes>
      <div>{__VERSION__}</div>
    </Router>
  )
}
