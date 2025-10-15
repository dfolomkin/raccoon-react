import React from 'react'
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

interface AsideState {
  tags: ApiResponse<ITag[]>
}

export class Aside extends React.Component<AsideProps, AsideState> {
  constructor(props: AsideProps) {
    super(props)
    this.state = {
      tags: { data: null, error: null },
    }
  }

  async componentDidMount(): Promise<void> {
    const response = await getTags()

    this.setState({ tags: response })
  }

  render() {
    const { data, error } = this.state.tags
    const isLoading = !data && !error
    const { isAboutOpen, isInfoOpen, isTagsOpen } = this.props

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
              onClick={() => this.props.onAboutToggle()}
            >
              <Icon.Arrow className={styles.note__icon} />
            </Button>
          </div>
          <div className={styles.note__body}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id
            tempor libero. Etiam condimentum maximus neque ut interdum. Donec
            bibendum commodo lectus at fermentum. Integer lectus justo,
            dignissim in tempus quis, interdum sed dolor. Maecenas tristique
            scelerisque dolor quis tincidunt. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Praesent id tempor libero. Etiam
            condimentum maximus neque ut interdum. Donec bibendum commodo lectus
            at fermentum. Integer lectus justo, dignissim in tempus quis,
            interdum sed dolor.
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
              onClick={() => this.props.onInfoToggle()}
            >
              <Icon.Arrow className={styles.note__icon} />
            </Button>
          </div>
          <div className={styles.note__body}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id
            tempor libero. Etiam condimentum maximus neque ut interdum. Donec
            bibendum commodo lectus at fermentum. Integer lectus justo,
            dignissim in tempus quis, interdum sed dolor. Maecenas tristique
            scelerisque dolor quis tincidunt. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Praesent id tempor libero. Etiam
            condimentum maximus neque ut interdum. Donec bibendum commodo lectus
            at fermentum. Integer lectus justo, dignissim in tempus quis,
            interdum sed dolor.
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
              onClick={() => this.props.onTagsToggle()}
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
}
