import React from 'react'
import clsx from 'clsx'
import { connect, ConnectedProps } from 'react-redux'
import { compose } from 'redux'

import { FormButton, PageLoader } from 'components'
import { ROUTES } from 'shared/constants'
import { RouterProps, withRouter } from 'shared/hocs'
import { EmptyObject } from 'shared/types'
import { getUrlQueryParamValue, objectIncludes } from 'shared/utils'
import { RootState } from 'store'
import { readArticlesThunk } from 'store/actions/articles'

import { Article } from './Article'
import { FilterBar } from './FilterBar'

import styles from './Articles.module.less'

const connector = connect(
  (state: RootState) => ({ articles: state.articles }),
  {
    readArticlesThunk,
  }
)
const enhance = compose<React.ComponentType<EmptyObject>>(withRouter, connector)

type ReduxProps = ConnectedProps<typeof connector>
type ArticlesProps = RouterProps & ReduxProps
interface ArticlesState {
  filter: string
}

class ArticlesBase extends React.Component<ArticlesProps, ArticlesState> {
  constructor(props: ArticlesProps) {
    super(props)
    this.state = {
      filter:
        getUrlQueryParamValue(
          this.props.router.location.search.slice(1),
          'filter'
        ) || '',
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleAddArticleClick = this.handleAddArticleClick.bind(this)
  }

  async componentDidMount() {
    await this.props.readArticlesThunk()
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
    const { data, error, isLoading } = this.props.articles
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

export const Articles = enhance(ArticlesBase)
