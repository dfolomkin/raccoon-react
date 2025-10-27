import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useNavigate, useParams } from 'react-router-dom'

import { FormButton } from 'components'
import { getArticle, postArticle, putArticle } from 'services'
import { ROUTES, UPLOADS_BASE_URL } from 'shared/constants'
import {
  ApiResponse,
  ApiResponseError,
  ArticleForm,
  IArticle,
} from 'shared/types'

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

export const ArticleEdit: React.FC = () => {
  const navigate = useNavigate()

  const [articleData, setArticleData] = useState<ArticleForm | null>({
    author: '',
    title: '',
    content: '',
    tags: [],
    imageFileName: '',
  })
  const [articleError, setArticleError] = useState<ApiResponseError | null>(
    null
  )
  const [isChanged, setIsChanged] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await getArticle(id)

      setArticleData(response.data)
      setArticleError(response.error)
    }

    if (id !== undefined) {
      void fetchArticle()
    }
  }, [id])

  const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    if (event.target.id === FORM_FIELDS.imageFile) {
      const files: File[] = event.target.files
      const file = files[0]

      if (file) {
        const value: string = event.target.value
        const fileNameValue = value
        const fileName = value.substring(fileNameValue.lastIndexOf('\\') + 1)

        const reader = new FileReader()

        reader.onload = (e) => {
          setArticleData(({ author, title, content, tags }) => ({
            author,
            title,
            content,
            tags,
            imageFileName: fileName,
            imageFile: {
              base64: e.target.result as string,
              blob: new Blob([file], { type: file.type }),
            },
          }))
          setIsChanged(true)
        }

        reader.readAsDataURL(file)
      }
    } else {
      const form: HTMLFormElement & { elements: FormFields } = event.target.form
      const {
        elements: { author, title, content, tags },
      } = form

      setArticleData(({ imageFileName }) => ({
        author: author.value,
        title: title.value,
        content: content.value,
        tags: tags.value.split(', '),
        imageFileName,
      }))
      setIsChanged(true)
    }
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()
    const { author, title, content, tags, imageFileName, imageFile } =
      articleData

    formData.set('author', author)
    formData.set('title', title)
    formData.set('content', content)
    formData.set('tags', tags.join(', '))
    formData.set('imageFileName', imageFileName)
    if (imageFile) {
      formData.set('imageFile', imageFile.blob, imageFileName)
    }

    let response: ApiResponse<IArticle>

    if (id !== undefined) {
      response = await putArticle(Number(id), formData)
    } else {
      response = await postArticle(formData)
    }

    if (!response.error) {
      await navigate(ROUTES.articles)
    }
  }

  const handleCancelClick = async () => {
    await navigate(ROUTES.articles)
  }

  if (articleError) {
    return <div>{articleError.message}</div>
  }

  const fileScr = articleData.imageFile
    ? articleData.imageFile.base64
    : `${UPLOADS_BASE_URL}/${articleData.imageFileName}`

  return (
    <form
      className={styles.sectionElem}
      onSubmit={handleFormSubmit}
      onChange={handleFormChange}
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
        <label htmlFor={FORM_FIELDS.author} className={styles.formGroup__label}>
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
        <label htmlFor={FORM_FIELDS.title} className={styles.formGroup__label}>
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
        <FormButton type="submit" disabled={!isChanged}>
          <i className="fa-solid fa-check"></i>&ensp;Save
        </FormButton>
        <FormButton type="button" onClick={handleCancelClick}>
          <i className="fa-solid fa-cancel"></i>&ensp;Cancel
        </FormButton>
      </div>
    </form>
  )
}
