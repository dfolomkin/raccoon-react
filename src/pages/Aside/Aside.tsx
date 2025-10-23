import React from 'react'
import clsx from 'clsx'
import { connect, ConnectedProps } from 'react-redux'
import { compose } from 'redux'

import { Button, Icon, Loader, Tags } from 'components'
import { EmptyObject } from 'shared/types'
import { RootState } from 'store'
import { readTagsThunk } from 'store/actions/tags'

import styles from './Aside.module.less'

const connector = connect((state: RootState) => ({ tags: state.tags }), {
  readTagsThunk,
})

interface AsideOwnProps {
  isAboutOpen: boolean
  isInfoOpen: boolean
  isTagsOpen: boolean
  onAboutToggle: () => void
  onInfoToggle: () => void
  onTagsToggle: () => void
}

const enhance = compose<React.ComponentType<AsideOwnProps>>(connector)

type ReduxProps = ConnectedProps<typeof connector>
type AsideProps = ReduxProps & AsideOwnProps

class AsideBase extends React.Component<AsideProps, EmptyObject> {
  async componentDidMount() {
    await this.props.readTagsThunk()
  }

  render() {
    const { isAboutOpen, isInfoOpen, isTagsOpen, tags } = this.props
    const { data, error, isLoading } = tags

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

export const Aside = enhance(AsideBase)
