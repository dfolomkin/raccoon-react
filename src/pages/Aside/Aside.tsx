import React, { useEffect, useState } from 'react'

import { Loader, Tags } from 'components'
import { getTags } from 'services'
import { ApiResponse, ITag } from 'shared/types'

import {
  ArrowIcon,
  Note,
  NoteBody,
  NoteHeader,
  NoteIconButton,
  NoteTitle,
} from './Aside.styled'

interface AsideProps {
  isAboutOpen: boolean
  isInfoOpen: boolean
  isTagsOpen: boolean
  onAboutToggle: () => void
  onInfoToggle: () => void
  onTagsToggle: () => void
}

export const Aside: React.FC<AsideProps> = ({
  isAboutOpen,
  isInfoOpen,
  isTagsOpen,
  onAboutToggle,
  onInfoToggle,
  onTagsToggle,
}) => {
  const [tags, setTags] = useState<ApiResponse<ITag[]>>({
    data: null,
    error: null,
  })

  useEffect(() => {
    const fetchTags = async () => {
      const response = await getTags()

      setTags(response)
    }

    void fetchTags()
  }, [])

  const { data, error } = tags
  const isLoading = !data && !error

  return (
    <>
      <Note variant="about" isOpen={isAboutOpen}>
        <NoteHeader variant="about">
          <NoteTitle variant="about">About</NoteTitle>
          <NoteIconButton onClick={() => onAboutToggle()}>
            <ArrowIcon />
          </NoteIconButton>
        </NoteHeader>
        <NoteBody variant="about">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id
          tempor libero. Etiam condimentum maximus neque ut interdum. Donec
          bibendum commodo lectus at fermentum. Integer lectus justo, dignissim
          in tempus quis, interdum sed dolor. Maecenas tristique scelerisque
          dolor quis tincidunt. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Praesent id tempor libero. Etiam condimentum maximus
          neque ut interdum. Donec bibendum commodo lectus at fermentum. Integer
          lectus justo, dignissim in tempus quis, interdum sed dolor.
        </NoteBody>
      </Note>

      <Note variant="info" isOpen={isInfoOpen}>
        <NoteHeader variant="info">
          <NoteTitle variant="info">Some information</NoteTitle>
          <NoteIconButton onClick={() => onInfoToggle()}>
            <ArrowIcon />
          </NoteIconButton>
        </NoteHeader>
        <NoteBody variant="info">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id
          tempor libero. Etiam condimentum maximus neque ut interdum. Donec
          bibendum commodo lectus at fermentum. Integer lectus justo, dignissim
          in tempus quis, interdum sed dolor. Maecenas tristique scelerisque
          dolor quis tincidunt. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Praesent id tempor libero. Etiam condimentum maximus
          neque ut interdum. Donec bibendum commodo lectus at fermentum. Integer
          lectus justo, dignissim in tempus quis, interdum sed dolor.
        </NoteBody>
      </Note>

      <Note variant="tags" isOpen={isTagsOpen}>
        <NoteHeader variant="tags">
          <NoteTitle variant="tags">Tags</NoteTitle>
          <NoteIconButton onClick={() => onTagsToggle()}>
            <ArrowIcon />
          </NoteIconButton>
        </NoteHeader>
        <NoteBody variant="tags">
          {isLoading && <Loader />}
          {error && <div>{error.message}</div>}
          {data && <Tags tagsList={data} />}
        </NoteBody>
      </Note>
    </>
  )
}
