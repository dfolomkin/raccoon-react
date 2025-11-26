import React from 'react'

import { Loader, Tags } from 'components'
import { useGetTagsQueryCustom } from 'store/api'

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
  const { data, error, isFetching, isSuccess, isError } =
    useGetTagsQueryCustom()

  return (
    <>
      <Note
        variant="about"
        isOpen={isAboutOpen}
        data-testid="aside-block-note:about"
      >
        <NoteHeader variant="about">
          <NoteTitle variant="about" data-testid="aside-block-notetitle:about">
            About
          </NoteTitle>
          <NoteIconButton
            onClick={() => onAboutToggle()}
            data-testid="aside-block-button:about"
          >
            <ArrowIcon />
          </NoteIconButton>
        </NoteHeader>
        <NoteBody variant="about" data-testid="aside-block-notebody:about">
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

      <Note
        variant="info"
        isOpen={isInfoOpen}
        data-testid="aside-block-note:info"
      >
        <NoteHeader variant="info">
          <NoteTitle variant="info" data-testid="aside-block-notetitle:info">
            Some information
          </NoteTitle>
          <NoteIconButton
            onClick={() => onInfoToggle()}
            data-testid="aside-block-button:info"
          >
            <ArrowIcon />
          </NoteIconButton>
        </NoteHeader>
        <NoteBody variant="info" data-testid="aside-block-notebody:info">
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

      <Note
        variant="tags"
        isOpen={isTagsOpen}
        data-testid="aside-block-note:tags"
      >
        <NoteHeader variant="tags">
          <NoteTitle variant="tags" data-testid="aside-block-notetitle:tags">
            Tags
          </NoteTitle>
          <NoteIconButton
            onClick={() => onTagsToggle()}
            data-testid="aside-block-button:tags"
          >
            <ArrowIcon />
          </NoteIconButton>
        </NoteHeader>
        <NoteBody variant="tags" data-testid="aside-block-notebody:tags">
          {isFetching && <Loader />}
          {isError && <div>{error.message}</div>}
          {isSuccess && <Tags tagsList={data} />}
        </NoteBody>
      </Note>
    </>
  )
}
