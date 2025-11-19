import React, { useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

import { Modal, Socials } from 'components'
import { Box } from 'components/flexbox'
import { deleteArticle } from 'services'
import { ROUTES, UPLOADS_BASE_URL } from 'shared/constants'
import { IArticle } from 'shared/types'

import {
  ArticleContent,
  ArticleControlPanel,
  ArticleImage,
  ArticleInfo,
  ArticleTitle,
  ClockIcon,
  ControlPanelButton,
  FoostepIcon,
  InfoElement,
  InfoGroup,
} from './Article.styled'

export interface ArticleProps {
  articleData: IArticle
}

export const Article: React.FC<ArticleProps> = ({ articleData }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const navigate = useNavigate()

  const { id } = articleData

  const handleEditClick = async () => {
    await navigate(`${ROUTES.articleEdit}/${id}`)
  }

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true)
  }

  const handleDeleteModalAccept = async () => {
    await deleteArticle(id)
    setIsDeleteModalOpen(false)
    await navigate(0)
  }

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false)
  }

  return (
    <>
      <Box position="relative">
        <ArticleImage
          src={`${UPLOADS_BASE_URL}/${articleData.imageFileName}`}
          alt={articleData.imageFileName}
          data-testid={`article-img-image:${id}`}
        />

        <ArticleTitle data-testid={`article-header-title:${id}`}>
          {articleData.title}
        </ArticleTitle>

        <ArticleInfo data-testid={`article-block-info:${id}`}>
          <InfoGroup>
            <InfoElement data-testid={`article-block-time:${id}`}>
              <ClockIcon />
              <time>
                {moment(articleData.date).format('HH:mm MMM DD, YYYY')}
              </time>
            </InfoElement>
            <InfoElement data-testid={`article-block-author:${id}`}>
              <FoostepIcon />
              <address>{articleData.author}</address>
            </InfoElement>
          </InfoGroup>

          <InfoGroup>
            <Socials countsMap={articleData.socials} />
          </InfoGroup>
        </ArticleInfo>

        <ArticleContent data-testid={`article-block-content:${id}`}>
          {articleData.content}
        </ArticleContent>

        <ArticleControlPanel data-testid={`article-block-controls:${id}`}>
          <ControlPanelButton
            onClick={handleEditClick}
            data-testid={`article-button-edit:${id}`}
          >
            <i className="fa-solid fa-pencil"></i>
          </ControlPanelButton>
          <ControlPanelButton
            onClick={handleDeleteClick}
            data-testid={`article-button-delete:${id}`}
          >
            <i className="fa-solid fa-trash"></i>
          </ControlPanelButton>
        </ArticleControlPanel>
      </Box>
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
