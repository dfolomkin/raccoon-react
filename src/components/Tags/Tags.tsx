import React from 'react'

import { ITag } from 'shared/types'

import { Tag } from './Tag'

import styles from './Tags.module.less'

interface TagsProps {
  tagsList: ITag[]
}

export const Tags: React.FC<TagsProps> = ({ tagsList }) => (
  <div className={styles.tagsBlock}>
    {tagsList.map((item) => (
      <Tag key={item.id} caption={item.name} />
    ))}
  </div>
)
