import { ISocial, Theme } from './types'

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

export const THEME: Record<string, Theme> = {
  light: 'light',
  dark: 'dark',
}

export const THEME_SPEC = {
  light: {
    colorNavbar: '#6b9ad0',
    colorNavbarButton: '#7ca8d9',
    colorNavbarBorder: '#c1dcfe',
    colorTextHeader: '#6695ba',
    colorSocialDefault: '#d5dce6',
    colorGrayscale1: '#111111',
    colorGrayscale5: '#999999',
    colorGrayscale6: '#aaaaac',
    colorGrayscale7: '#cccccc',
    colorGrayscale9: '#ffffff',
    colorTint1: '#666678',
    colorTransparent2: 'rgba(255, 255, 255, 0.2)',
    colorTransparentDark2: 'rgba(0, 0, 0, 0.2)',
    colorTransparent3: 'rgba(255, 255, 255, 0.3)',
    colorTransparent5: 'rgba(255, 255, 255, 0.5)',
    colorTransparent75: 'rgba(255, 255, 255, 0.75)',
    colorTransparentDark75: 'rgba(0, 0, 0, 0.75)',
    colorTransparent95: 'rgba(255, 255, 255, 0.95)',
  },
  dark: {
    colorNavbar: '#6695ba',
    colorNavbarButton: '#75a8cf',
    colorNavbarBorder: '#999999',
    colorTextHeader: '#6695ba',
    colorSocialDefault: '#444444',
    colorGrayscale1: '#ffffff',
    colorGrayscale5: '#999999',
    colorGrayscale6: '#aaaaac',
    colorGrayscale7: '#cccccc',
    colorGrayscale9: '#222222',
    colorTint1: '#aaaaac',
    colorTransparent2: 'rgba(255, 255, 255, 0.2)',
    colorTransparentDark2: 'rgba(0, 0, 0, 0.2)',
    colorTransparent3: 'rgba(255, 255, 255, 0.3)',
    colorTransparent5: 'rgba(255, 255, 255, 0.5)',
    colorTransparent75: 'rgba(0, 0, 0, 0.75)',
    colorTransparentDark75: 'rgba(0, 0, 0, 0.75)',
    colorTransparent95: 'rgba(255, 255, 255, 0.95)',
  },
}

export const SOCIALS_COLOR_MAP: Record<ISocial, string> = {
  facebook: '#3b5998',
  gplus: '#dd4b39',
  twitter: '#00aced',
  vk: '#45668e',
  yaru: '#cb2027',
}

const FETCH_STATUS_BASE = {
  uninitialized: 'uninitialized',
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed',
}

export const FETCH_STATUS = FETCH_STATUS_BASE as Record<
  keyof typeof FETCH_STATUS_BASE,
  keyof typeof FETCH_STATUS_BASE
>

const FETCH_TYPE_BASE = {
  create: 'create',
  read: 'read',
  update: 'update',
  delete: 'delete',
}

export const FETCH_TYPE = FETCH_TYPE_BASE as Record<
  keyof typeof FETCH_TYPE_BASE,
  keyof typeof FETCH_TYPE_BASE
>
