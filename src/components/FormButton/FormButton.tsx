import React from 'react'
import clsx from 'clsx'

import { Button } from '../Button'

import styles from './FormButton.module.less'

export const FormButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, disabled, ...props }) => (
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
