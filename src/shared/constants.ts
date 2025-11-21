export const API_ROUTES = {
  articles: '/articles',
  tags: '/tags',
}

export const ROUTES = {
  articles: '/articles',
  articleEdit: '/article-edit',
  articleNew: '/article-new',
}

export const API_BASE_URL = process.env.IS_NETLIFY
  ? '/api'
  : `${process.env.BE_URL}/api`

export const UPLOADS_BASE_URL = process.env.IS_NETLIFY
  ? '/uploads'
  : `${process.env.BE_URL}/uploads`
