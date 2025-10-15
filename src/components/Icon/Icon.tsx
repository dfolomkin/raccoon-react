import React from 'react'

import sprite from 'images/sprite.url.svg'

interface IconProps {
  className?: string
}

export const getIconComponent = (name: string) =>
  function IconComponent({ className }: IconProps) {
    return (
      <svg viewBox="0 0 32 32" className={className}>
        <use href={`${sprite}#icon-${name}`} />
      </svg>
    )
  }

export const Icon = {
  RaccoonNegative: getIconComponent('racoon-negative'),
  RaccoonPositive: getIconComponent('racoon-positive'),
  Menu: getIconComponent('menu'),
  Arrow: getIconComponent('arrow'),
  Clock: getIconComponent('clock'),
  Footstep: getIconComponent('footstep'),
  Tag: getIconComponent('tag'),
  Gplus: getIconComponent('gplus'),
  Twitter: getIconComponent('twitter'),
  Facebook: getIconComponent('facebook'),
  Vk: getIconComponent('vk'),
  Yandex: getIconComponent('yaru'),
}
