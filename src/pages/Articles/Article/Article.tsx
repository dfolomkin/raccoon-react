import React, { useState } from 'react'
import clsx from 'clsx'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

import { Button, Icon, Modal, Socials } from 'components'
import { deleteArticle } from 'services'
import { ROUTES, UPLOADS_BASE_URL } from 'shared/constants'
import { IArticle } from 'shared/types'

import styles from './Article.module.less'

interface ArticleProps {
  articleData: IArticle
}

export const Article: React.FC<ArticleProps> = ({ articleData }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const navigate = useNavigate()

  const handleEditClick = async () => {
    await navigate(`${ROUTES.articleEdit}/${articleData.id}`)
  }

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true)
  }

  const handleDeleteModalAccept = async () => {
    const { id } = articleData

    await deleteArticle(id)
    setIsDeleteModalOpen(false)
    await navigate(0)
  }

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false)
  }

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
          <Button className={styles.article__button} onClick={handleEditClick}>
            <i className="fa-solid fa-pencil"></i>
          </Button>
          <Button
            className={styles.article__button}
            onClick={handleDeleteClick}
          >
            <i className="fa-solid fa-trash"></i>
          </Button>
        </div>
      </article>
      {isDeleteModalOpen && (
        <Modal
          onCancel={handleDeleteModalCancel}
          onAccept={handleDeleteModalAccept}
        >
          Do you really want to delete this article?
        </Modal>
      )}
    </>
  )
}
