import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useLocation, useNavigate } from 'react-router-dom'

import { PageLoader } from 'components'
import { ROUTES } from 'shared/constants'
import { getUrlQueryParamValue, objectIncludes } from 'shared/utils'
import { ArticlesStore, articleStore } from 'store'

import { Article } from './Article'
import { AddButton, ArticleWrapper, ControlPanel } from './Articles.styled'
import { FilterBar } from './FilterBar'

export const Articles: React.FC<{ articlesStore: ArticlesStore }> = observer(
  ({ articlesStore }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const { data, error, isLoading, fetchArticles } = articlesStore
    const [filter, setFilter] = useState(
      getUrlQueryParamValue(location.search.slice(1), 'filter') || ''
    )

    useEffect(() => {
      fetchArticles()
    }, [fetchArticles])

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

        {isLoading && <PageLoader />}
        {error && <div data-testid="articles-block-error">{error.message}</div>}
        {data &&
          filteredData.map((item) => (
            <ArticleWrapper key={item.id}>
              <Article articleData={item} articleStore={articleStore} />
            </ArticleWrapper>
          ))}
      </>
    )
  }
)
