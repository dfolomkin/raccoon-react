import React from 'react'

import sprite from 'images/sprite.url.svg'

interface IconProps {
  className?: string
}

const getIconComponent = (name: string) =>
  function IconComponent({ className }: IconProps) {
    return (
      <svg
        viewBox="0 0 32 32"
        className={className}
        data-testid={`icon-svg-${name}`}
      >
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
  Facebook: getIconComponent('facebook'),
  Gplus: getIconComponent('gplus'),
  Twitter: getIconComponent('twitter'),
  Vk: getIconComponent('vk'),
  Yandex: getIconComponent('yaru'),
}
