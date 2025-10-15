import React from 'react'
import clsx from 'clsx'

import { FormButton, PageLoader } from 'components'
import { getArticles } from 'services'
import { ROUTES } from 'shared/constants'
import { RouterProps, withRouter } from 'shared/hocs'
import { ApiResponse, EmptyObject, IArticle } from 'shared/types'
import { getUrlQueryParamValue, objectIncludes } from 'shared/utils'

import { Article } from './Article'
import { FilterBar } from './FilterBar'

import styles from './Articles.module.less'

interface ArticlesState {
  articles: ApiResponse<IArticle[]>
  filter: string
}

class ArticlesBase extends React.Component<
  EmptyObject & RouterProps,
  ArticlesState
> {
  constructor(props: EmptyObject & RouterProps) {
    super(props)
    this.state = {
      articles: { data: null, error: null },
      filter:
        getUrlQueryParamValue(
          this.props.router.location.search.slice(1),
          'filter'
        ) || '',
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleAddArticleClick = this.handleAddArticleClick.bind(this)
  }

  async componentDidMount(): Promise<void> {
    const response = await getArticles()

    this.setState({ articles: response })
  }

  async handleAddArticleClick() {
    await this.props.router.navigate(ROUTES.articleNew)
  }

  async handleFilterChange(value: string) {
    this.setState({ filter: value })

    await this.props.router.navigate(
      `${ROUTES.articles}${value ? `?filter=${value}` : ''}`
    )
  }

  render() {
    const { data, error } = this.state.articles
    const isLoading = !data && !error
    const filteredData =
      data?.filter((item) =>
        objectIncludes(
          item as unknown as Record<string, unknown>,
          ['author', 'title', 'content', 'date'],
          this.state.filter
        )
      ) || []

    return (
      <>
        <div className={clsx(styles.sectionElem, styles.controlPanel)}>
          <FilterBar
            initValue={this.state.filter}
            onChange={this.handleFilterChange}
          />
          <FormButton
            className={styles.addButton}
            onClick={this.handleAddArticleClick}
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
}

export const Articles = withRouter<EmptyObject>(ArticlesBase)
