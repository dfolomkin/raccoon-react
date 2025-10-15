import React from 'react'
import clsx from 'clsx'
import moment from 'moment'

import { Button, Icon, Modal, Socials } from 'components'
import { deleteArticle } from 'services'
import { ROUTES, UPLOADS_BASE_URL } from 'shared/constants'
import { RouterProps, withRouter } from 'shared/hocs'
import { IArticle } from 'shared/types'

import styles from './Article.module.less'

interface ArticleProps {
  articleData: IArticle
}

interface ArticleState {
  isDeleteModalOpen: boolean
}

class ArticleBase extends React.PureComponent<
  ArticleProps & RouterProps,
  ArticleState
> {
  constructor(props: ArticleProps & RouterProps) {
    super(props)
    this.state = {
      isDeleteModalOpen: false,
    }

    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleDeleteModalAccept = this.handleDeleteModalAccept.bind(this)
    this.handleDeleteModalCancel = this.handleDeleteModalCancel.bind(this)
  }

  async handleEditClick() {
    await this.props.router.navigate(
      `${ROUTES.articleEdit}/${this.props.articleData.id}`,
      {
        state: this.props.articleData,
      }
    )
  }

  handleDeleteClick() {
    this.setState({
      isDeleteModalOpen: true,
    })
  }

  async handleDeleteModalAccept() {
    const { id } = this.props.articleData

    await deleteArticle(id)

    this.setState({
      isDeleteModalOpen: false,
    })

    await this.props.router.navigate(0)
  }

  handleDeleteModalCancel() {
    this.setState({
      isDeleteModalOpen: false,
    })
  }

  render() {
    const { articleData } = this.props

    return (
      <>
        <article className={styles.article}>
          <img
            className={styles.article__image}
            src={`${UPLOADS_BASE_URL}/${articleData.imageFileName}`}
            alt={articleData.imageFileName}
          />

          <h1 className={styles.article__title}>{articleData.title}</h1>

          <div className={clsx(styles.article__info, styles.infoPanel)}>
            <div className={styles.infoPanel__group}>
              <div className={styles.infoElem}>
                <Icon.Clock className={styles.infoElem__icon} />
                <time>
                  {moment(articleData.date).format('HH:mm MMM DD, YYYY')}
                </time>
              </div>
              <div className={styles.infoElem}>
                <Icon.Footstep className={styles.infoElem__icon} />
                <address>{articleData.author}</address>
              </div>
            </div>

            <div className={styles.infoPanel__group}>
              <Socials countsMap={articleData.socials} />
            </div>
          </div>

          <div className={styles.article__content}>{articleData.content}</div>

          <div className={styles.article__controlPanel}>
            <Button
              className={styles.article__button}
              onClick={this.handleEditClick}
            >
              <i className="fa-solid fa-pencil"></i>
            </Button>
            <Button
              className={styles.article__button}
              onClick={this.handleDeleteClick}
            >
              <i className="fa-solid fa-trash"></i>
            </Button>
          </div>
        </article>
        {this.state.isDeleteModalOpen && (
          <Modal
            onCancel={this.handleDeleteModalCancel}
            onAccept={this.handleDeleteModalAccept}
          >
            Do you really want to delete this article?
          </Modal>
        )}
      </>
    )
  }
}

export const Article = withRouter<ArticleProps>(ArticleBase)
