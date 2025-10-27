import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router-dom'

import { FormButton, PageLoader } from 'components'
import { getArticles } from 'services'
import { ROUTES } from 'shared/constants'
import { ApiResponse, IArticle } from 'shared/types'
import { getUrlQueryParamValue, objectIncludes } from 'shared/utils'

import { Article } from './Article'
import { FilterBar } from './FilterBar'

import styles from './Articles.module.less'

export const Articles: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [articles, setArticles] = useState<ApiResponse<IArticle[]>>({
    data: null,
    error: null,
  })
  const [filter, setFilter] = useState(
    getUrlQueryParamValue(location.search.slice(1), 'filter') || ''
  )

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await getArticles()

      setArticles(response)
    }

    void fetchArticles()
  }, [])

  const handleAddArticleClick = async () => {
    await navigate(ROUTES.articleNew)
  }

  const handleFilterChange = async (value: string) => {
    setFilter(value)

    await navigate(`${ROUTES.articles}${value ? `?filter=${value}` : ''}`)
  }

  const { data, error } = articles
  const isLoading = !data && !error
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
      <div className={clsx(styles.sectionElem, styles.controlPanel)}>
        <FilterBar initValue={filter} onChange={handleFilterChange} />
        <FormButton
          className={styles.addButton}
          onClick={handleAddArticleClick}
        >
          <i className="fa-solid fa-plus"></i>&emsp; Add article
        </FormButton>
      </div>

      {isLoading && <PageLoader />}
      {error && <div>{error.message}</div>}
      {data &&
        filteredData.map((item) => (
          <div key={item.id} className={styles.sectionElem}>
            <Article articleData={item} />
          </div>
        ))}
    </>
  )
}
