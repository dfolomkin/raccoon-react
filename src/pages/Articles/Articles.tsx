import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { PageLoader } from 'components'
import { FETCH_STATUS, ROUTES } from 'shared/constants'
import { getUrlQueryParamValue, objectIncludes } from 'shared/utils'
import { useAppDispatch, useAppSelector } from 'store'
import { fetchArticles } from 'store/slices/articlesSlice'

import { Article } from './Article'
import { AddButton, ArticleWrapper, ControlPanel } from './Articles.styled'
import { FilterBar } from './FilterBar'

export const Articles: React.FC = () => {
  const dispatch = useAppDispatch()

  const location = useLocation()
  const navigate = useNavigate()

  const { status, data, error } = useAppSelector((state) => state.articles)
  const [filter, setFilter] = useState(
    getUrlQueryParamValue(location.search.slice(1), 'filter') || ''
  )

  useEffect(() => {
    dispatch(fetchArticles())
  }, [dispatch])

  const handleAddArticleClick = async () => {
    await navigate(ROUTES.articleNew)
  }

  const handleFilterChange = async (value: string) => {
    setFilter(value)

    await navigate(`${ROUTES.articles}${value ? `?filter=${value}` : ''}`)
  }

  const filteredData =
    data?.filter((item) =>
      objectIncludes(
        item as unknown as Record<string, unknown>,
        ['author', 'title', 'content', 'date'],
        filter
      )
    ) || []

  return (
    <>
      <ControlPanel data-testid="articles-block-controls">
        <FilterBar initValue={filter} onChange={handleFilterChange} />
        <AddButton
          onClick={handleAddArticleClick}
          data-testid="articles-button-addarticle"
        >
          <i className="fa-solid fa-plus"></i>&emsp; Add article
        </AddButton>
      </ControlPanel>

      {status === FETCH_STATUS.loading && <PageLoader />}
      {error && <div data-testid="articles-block-error">{error.message}</div>}
      {data &&
        filteredData.map((item) => (
          <ArticleWrapper key={item.id}>
            <Article articleData={item} />
          </ArticleWrapper>
        ))}
    </>
  )
}
