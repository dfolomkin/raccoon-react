import React from 'react'

import { FormButton } from '../FormButton'

import styles from './Modal.module.less'

interface ModalProps extends React.PropsWithChildren {
  onCancel: () => void
  onAccept?: () => void
}

export const Modal: React.FC<ModalProps> = ({
  children,
  onCancel,
  onAccept,
}) => (
  <div className={styles.modal__backgroundFade}>
    <div className={styles.modal__container}>
      <div className={styles.formGroup}>{children}</div>
      <div className={styles.formGroup__control}>
        <FormButton
          onClick={() => {
            if (onAccept) {
              onAccept()
            }
          }}
        >
          <i className="fa-solid fa-check"></i>&ensp;Accept
        </FormButton>
        <FormButton onClick={() => onCancel()}>
          <i className="fa-solid fa-times"></i>&ensp;Cancel
        </FormButton>
      </div>
    </div>
  </div>
)
