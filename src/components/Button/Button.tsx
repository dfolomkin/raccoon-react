import React from 'react'

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...props }) => (
  <button className={className} type="button" {...props}>
    {children}
  </button>
)
