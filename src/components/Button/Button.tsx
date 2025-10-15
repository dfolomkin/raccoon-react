import React from 'react'

export function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={className} type="button" {...props}>
      {children}
    </button>
  )
}
