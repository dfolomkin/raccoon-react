import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { PageLoader } from 'components'
import { ROUTES } from 'shared/constants'
import { getUrlQueryParamValue, objectIncludes } from 'shared/utils'
import { useGetArticlesQueryCustom } from 'store/api'

import { Article } from './Article'
import { AddButton, ArticleWrapper, ControlPanel } from './Articles.styled'
import { FilterBar } from './FilterBar'

export const Articles: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { data, error, isFetching, isSuccess, isError, refetch } =
    useGetArticlesQueryCustom()
  const [filter, setFilter] = useState(
    getUrlQueryParamValue(location.search.slice(1), 'filter') || ''
  )

  useEffect(() => {
    refetch()
  }, [refetch])

  const handleAddArticleClick = () => {
    navigate(ROUTES.articleNew)
  }

  const handleFilterChange = (value: string) => {
    setFilter(value)
    navigate(`${ROUTES.articles}${value ? `?filter=${value}` : ''}`)
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

      {isFetching && <PageLoader />}
      {isError && <div data-testid="articles-block-error">{error.message}</div>}
      {isSuccess &&
        filteredData.map((item) => (
          <ArticleWrapper key={item.id}>
            <Article articleData={item} />
          </ArticleWrapper>
        ))}
    </>
  )
}
