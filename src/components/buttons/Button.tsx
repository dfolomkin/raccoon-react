import React from 'react'

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...props }) => (
  <button type="button" className={className} {...props}>
    {children}
  </button>
)
