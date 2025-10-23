import React, { Component } from 'react'
import clsx from 'clsx'
import { connect, ConnectedProps } from 'react-redux'
import { compose } from 'redux'

import { FormButton } from 'components'
import { ROUTES, UPLOADS_BASE_URL } from 'shared/constants'
import { RouterProps, withRouter } from 'shared/hocs'
import { ArticleForm, EmptyObject, IArticle } from 'shared/types'
import { isEqual } from 'shared/utils'
import { RootState } from 'store'
import { createArticleThunk, updateArticleThunk } from 'store/actions/articles'

import styles from './ArticleEdit.module.less'

const FORM_FIELDS = {
  author: 'author',
  title: 'title',
  content: 'content',
  tags: 'tags',
  imageFileName: 'imageFileName',
  imageFile: 'imageFile',
} as const

interface FormFields {
  [FORM_FIELDS.author]: HTMLInputElement
  [FORM_FIELDS.title]: HTMLInputElement
  [FORM_FIELDS.content]: HTMLTextAreaElement
  [FORM_FIELDS.tags]: HTMLInputElement
  [FORM_FIELDS.imageFileName]: HTMLInputElement
  [FORM_FIELDS.imageFile]: HTMLInputElement
}

const connector = connect(
  (state: RootState) => ({ lastArticle: state.lastArticle }),
  {
    updateArticleThunk,
    createArticleThunk,
  }
)
const enhance = compose<React.ComponentType<EmptyObject>>(withRouter, connector)

type ReduxProps = ConnectedProps<typeof connector>
type ArticleEditProps = RouterProps & ReduxProps

interface ArticleEditState {
  articleData: ArticleForm | null
  isChanged: boolean
}

class ArticleEditBase extends Component<ArticleEditProps, ArticleEditState> {
  routerState: IArticle | null = this.props.router.location.state

  constructor(props: ArticleEditProps) {
    super(props)
    this.state = {
      articleData: this.routerState
        ? {
            author: this.routerState.author,
            title: this.routerState.title,
            content: this.routerState.content,
            tags: this.routerState.tags,
            imageFileName: this.routerState.imageFileName,
          }
        : {
            author: '',
            title: '',
            content: '',
            tags: [],
            imageFileName: '',
          },
      isChanged: false,
    }
    // TODO: 2nd variant - don't throw all article object through the routerState but fetch data with getArticle()

    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
  }

  async componentDidUpdate(prevProps: Readonly<ArticleEditProps>) {
    if (!isEqual(this.props.lastArticle, prevProps.lastArticle))
      if (this.props.lastArticle.data) {
        await this.props.router.navigate(ROUTES.articles)
      }
  }

  handleFormChange(event: React.ChangeEvent<HTMLFormElement>) {
    if (event.target.id === FORM_FIELDS.imageFile) {
      const files: File[] = event.target.files
      const file = files[0]

      if (file) {
        const value: string = event.target.value
        const fileNameValue = value
        const fileName = value.substring(fileNameValue.lastIndexOf('\\') + 1)

        const reader = new FileReader()
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this

        reader.onload = function (e) {
          that.setState(
            ({ articleData: { author, title, content, tags } }) => ({
              articleData: {
                author,
                title,
                content,
                tags,
                imageFileName: fileName,
                imageFile: {
                  base64: e.target.result as string,
                  blob: new Blob([file], { type: file.type }),
                },
              },
              isChanged: true,
            })
          )
        }

        reader.readAsDataURL(file)
      }
    } else {
      const form: HTMLFormElement & { elements: FormFields } = event.target.form
      const {
        elements: { author, title, content, tags },
      } = form

      this.setState(({ articleData: { imageFileName } }) => ({
        articleData: {
          author: author.value,
          title: title.value,
          content: content.value,
          tags: tags.value.split(', '),
          imageFileName,
        },
        isChanged: true,
      }))
    }
  }

  async handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData()
    const { author, title, content, tags, imageFileName, imageFile } =
      this.state.articleData

    formData.set('author', author)
    formData.set('title', title)
    formData.set('content', content)
    formData.set('tags', tags.join(', '))
    formData.set('imageFileName', imageFileName)
    if (imageFile) {
      formData.set('imageFile', imageFile.blob, imageFileName)
    }

    if (this.routerState) {
      await this.props.updateArticleThunk(this.routerState.id, formData)
    } else {
      await this.props.createArticleThunk(formData)
    }
  }

  async handleCancelClick() {
    await this.props.router.navigate(ROUTES.articles)
  }

  render() {
    const { articleData } = this.state

    if (!articleData) {
      return null
    }
    const fileScr = articleData.imageFile
      ? articleData.imageFile.base64
      : `${UPLOADS_BASE_URL}/${articleData.imageFileName}`

    return (
      <form
        className={styles.sectionElem}
        onSubmit={this.handleFormSubmit}
        onChange={this.handleFormChange}
      >
        {articleData.imageFileName && (
          <div className={styles.formGroup}>
            <img
              className={styles.formGroup__preview}
              src={fileScr}
              alt={articleData.imageFileName}
            />
          </div>
        )}
        <div className={styles.formGroup}>
          <label
            htmlFor={FORM_FIELDS.imageFile}
            className={styles.formGroup__label}
          >
            Select image
          </label>
          <input
            id={FORM_FIELDS.imageFile}
            name={FORM_FIELDS.imageFile}
            className={styles.formGroup__input}
            type="file"
            accept="image/png, image/jpeg"
            defaultValue=""
          />
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor={FORM_FIELDS.author}
            className={styles.formGroup__label}
          >
            Author
          </label>
          <input
            id={FORM_FIELDS.author}
            name={FORM_FIELDS.author}
            className={styles.formGroup__input}
            type="text"
            defaultValue={articleData.author}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor={FORM_FIELDS.title}
            className={styles.formGroup__label}
          >
            Title
          </label>
          <input
            id={FORM_FIELDS.title}
            name={FORM_FIELDS.title}
            className={styles.formGroup__input}
            type="text"
            defaultValue={articleData.title}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor={FORM_FIELDS.content}
            className={styles.formGroup__label}
          >
            Content
          </label>
          <textarea
            id={FORM_FIELDS.content}
            name={FORM_FIELDS.content}
            className={styles.formGroup__text}
            rows={4}
            maxLength={100}
            defaultValue={articleData.content}
            required
          />
          <div className={styles.formGroup__textCounter}>
            {articleData.content.length} / 100
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor={FORM_FIELDS.tags} className={styles.formGroup__label}>
            Tags
          </label>
          <input
            id={FORM_FIELDS.tags}
            name={FORM_FIELDS.tags}
            className={styles.formGroup__input}
            type="text"
            defaultValue={articleData.tags.join(', ')}
          />
        </div>
        <div className={clsx(styles.formGroup, styles.formGroup__control)}>
          <FormButton type="submit" disabled={!this.state.isChanged}>
            <i className="fa-solid fa-check"></i>&ensp;Save
          </FormButton>
          <FormButton type="button" onClick={this.handleCancelClick}>
            <i className="fa-solid fa-cancel"></i>&ensp;Cancel
          </FormButton>
        </div>
      </form>
    )
  }
}

export const ArticleEdit = enhance(ArticleEditBase)
