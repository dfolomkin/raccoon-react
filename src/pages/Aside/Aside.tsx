import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

import { Button, Icon, Loader, Tags } from 'components'
import { getTags } from 'services'
import { ApiResponse, ITag } from 'shared/types'

import styles from './Aside.module.less'

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
      <div
        className={clsx(
          styles.note,
          styles.note__about,
          isAboutOpen && styles.note__down
        )}
      >
        <div className={styles.note__header}>
          <h3 className={styles.note__title}>About</h3>
          <Button
            className={styles.note__iconButton}
            onClick={() => onAboutToggle()}
          >
            <Icon.Arrow className={styles.note__icon} />
          </Button>
        </div>
        <div className={styles.note__body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id
          tempor libero. Etiam condimentum maximus neque ut interdum. Donec
          bibendum commodo lectus at fermentum. Integer lectus justo, dignissim
          in tempus quis, interdum sed dolor. Maecenas tristique scelerisque
          dolor quis tincidunt. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Praesent id tempor libero. Etiam condimentum maximus
          neque ut interdum. Donec bibendum commodo lectus at fermentum. Integer
          lectus justo, dignissim in tempus quis, interdum sed dolor.
        </div>
      </div>

      <div
        className={clsx(
          styles.note,
          styles.note__info,
          isInfoOpen && styles.note__down
        )}
      >
        <div className={styles.note__header}>
          <h3 className={styles.note__title}>Some information</h3>
          <Button
            className={styles.note__iconButton}
            onClick={() => onInfoToggle()}
          >
            <Icon.Arrow className={styles.note__icon} />
          </Button>
        </div>
        <div className={styles.note__body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id
          tempor libero. Etiam condimentum maximus neque ut interdum. Donec
          bibendum commodo lectus at fermentum. Integer lectus justo, dignissim
          in tempus quis, interdum sed dolor. Maecenas tristique scelerisque
          dolor quis tincidunt. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Praesent id tempor libero. Etiam condimentum maximus
          neque ut interdum. Donec bibendum commodo lectus at fermentum. Integer
          lectus justo, dignissim in tempus quis, interdum sed dolor.
        </div>
      </div>

      <div
        className={clsx(
          styles.note,
          styles.note__tags,
          isTagsOpen && styles.note__down
        )}
      >
        <div className={styles.note__header}>
          <h3 className={styles.note__title}>Tags</h3>
          <Button
            className={styles.note__iconButton}
            onClick={() => onTagsToggle()}
          >
            <Icon.Arrow className={styles.note__icon} />
          </Button>
        </div>
        <div className={styles.note__body}>
          {isLoading && <Loader />}
          {error && <div>{error.message}</div>}
          {data && <Tags tagsList={data} />}
        </div>
      </div>
    </>
  )
}
