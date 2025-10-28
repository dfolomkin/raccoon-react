import React from 'react'
import styled from 'styled-components'

import { ITag } from 'shared/types'

import { Tag } from './Tag'

const TagsBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
`

interface TagsProps {
  tagsList: ITag[]
}

export const Tags: React.FC<TagsProps> = ({ tagsList }) => (
  <TagsBlock>
    {tagsList.map((item) => (
      <Tag key={item.id} caption={item.name} />
    ))}
  </TagsBlock>
)
