import React from 'react'
import clsx from 'clsx'

import { Button } from '../Button'

import styles from './FormButton.module.less'

export function FormButton({
  children,
  className,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.DOMAttributes<HTMLButtonElement>) {
  return (
    <Button
      className={clsx(
        styles.formGroup__button,
        disabled && styles.formGroup__button_disabled,
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}
