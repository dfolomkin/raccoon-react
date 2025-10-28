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
} from './Artiicle.styled'

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
      <Box position="relative">
        <ArticleImage
          src={`${UPLOADS_BASE_URL}/${articleData.imageFileName}`}
          alt={articleData.imageFileName}
        />

        <ArticleTitle>{articleData.title}</ArticleTitle>

        <ArticleInfo>
          <InfoGroup>
            <InfoElement>
              <ClockIcon />
              <time>
                {moment(articleData.date).format('HH:mm MMM DD, YYYY')}
              </time>
            </InfoElement>
            <InfoElement>
              <FoostepIcon />
              <address>{articleData.author}</address>
            </InfoElement>
          </InfoGroup>

          <InfoGroup>
            <Socials countsMap={articleData.socials} />
          </InfoGroup>
        </ArticleInfo>

        <ArticleContent>{articleData.content}</ArticleContent>

        <ArticleControlPanel>
          <ControlPanelButton onClick={handleEditClick}>
            <i className="fa-solid fa-pencil"></i>
          </ControlPanelButton>
          <ControlPanelButton onClick={handleDeleteClick}>
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
