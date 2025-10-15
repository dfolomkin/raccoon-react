import React from 'react'

import { EmptyObject } from 'shared/types'

import { FormButton } from '../FormButton'

import styles from './Modal.module.less'

interface ModalProps {
  onCancel: () => void
  onAccept?: () => void
}

export class Modal extends React.Component<
  React.PropsWithChildren<ModalProps>,
  EmptyObject
> {
  constructor(props: React.PropsWithChildren<ModalProps>) {
    super(props)

    this.handleAcceptClick = this.handleAcceptClick.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
  }

  handleAcceptClick() {
    if (this.props.onAccept) {
      this.props.onAccept()
    }
  }

  handleCancelClick() {
    this.props.onCancel()
  }

  render() {
    return (
      <div className={styles.modal__backgroundFade}>
        <div className={styles.modal__container}>
          <div className={styles.formGroup}>{this.props.children}</div>
          <div className={styles.formGroup__control}>
            <FormButton onClick={() => this.handleAcceptClick()}>
              <i className="fa-solid fa-check"></i>&ensp;Accept
            </FormButton>
            <FormButton onClick={() => this.handleCancelClick()}>
              <i className="fa-solid fa-times"></i>&ensp;Cancel
            </FormButton>
          </div>
        </div>
      </div>
    )
  }
}
