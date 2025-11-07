import React from 'react'
import styled from 'styled-components'

const TagWrapper = styled.div`
  display: inline-block;
  position: relative;
  height: 1.2em;
  padding-left: 0.67em;
  padding-right: 1em;
  margin-right: 0.8em;
  margin-bottom: 0.27em;
  background-color: ${({ theme }) => theme.colorTextHeader};
  color: ${({ theme }) => theme.colorGrayscale9};
  line-height: 1em;

  &::before {
    position: absolute;
    left: 100%;
    top: 0;
    border-left: 0.6em solid ${({ theme }) => theme.colorTextHeader};
    border-top: 0.6em solid transparent;
    border-bottom: 0.6em solid transparent;
    border-right: 0;
    content: '';
  }

  &::after {
    position: absolute;
    left: calc(100% - 0.27em);
    top: 0.4em;
    width: 0.4em;
    height: 0.4em;
    border-radius: 0.2em;
    background-color: ${({ theme }) => theme.colorGrayscale9};
    content: '';
  }

  &:hover {
    background-color: color-mix(
      in srgb,
      ${({ theme }) => theme.colorTextHeader},
      white 20%
    );
    cursor: pointer;

    &::before {
      border-left: 0.6em solid
        color-mix(in srgb, ${({ theme }) => theme.colorTextHeader}, white 20%);
    }
  }
`

interface TagProps {
  caption: string
}

export const Tag: React.FC<TagProps> = ({ caption }) => (
  <TagWrapper>{caption}</TagWrapper>
)
