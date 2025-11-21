import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { FormButton } from 'components'
import {
  FETCH_STATUS,
  FETCH_TYPE,
  ROUTES,
  UPLOADS_BASE_URL,
} from 'shared/constants'
import { ArticleForm } from 'shared/types'
import { useAppDispatch, useAppSelector } from 'store'
import {
  createArticle,
  fetchArticle,
  resetArticleSlice,
  updateArticle,
} from 'store/slices/articleSlice'

import {
  Form,
  FormControl,
  FormGroup,
  FormInput,
  FormTextarea,
  FormTextareaCounter,
  Label,
  PreviewImg,
} from './ArticleEdit.styled'

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
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const { id } = useParams()

  const { fetchType, status, data, error } = useAppSelector(
    (state) => state.article
  )
  const [articleData, setArticleData] = useState<ArticleForm | null>({
    author: '',
    title: '',
    content: '',
    tags: [],
    imageFileName: '',
  })
  const [isChanged, setIsChanged] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchArticle(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (data) {
      const { author, title, content, tags, imageFileName } = data

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setArticleData({
        author,
        title,
        content,
        tags,
        imageFileName,
      })
    }
  }, [data, status])

  useEffect(() => {
    if (
      (fetchType === FETCH_TYPE.create || fetchType === FETCH_TYPE.update) &&
      status === FETCH_STATUS.succeeded
    ) {
      navigate(ROUTES.articles)
      dispatch(resetArticleSlice())
    }
  }, [dispatch, fetchType, navigate, status])

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

    if (id) {
      dispatch(updateArticle({ id, formData }))
    } else {
      dispatch(createArticle(formData))
    }
  }

  const handleCancelClick = async () => {
    await navigate(ROUTES.articles)
  }

  if (error) {
    return <div>{error.message}</div>
  }

  const fileScr = articleData.imageFile
    ? articleData.imageFile.base64
    : `${UPLOADS_BASE_URL}/${articleData.imageFileName}`

  return (
    <Form
      onSubmit={handleFormSubmit}
      onChange={handleFormChange}
      data-testid="articleedit-form-main"
    >
      {articleData.imageFileName && (
        <FormGroup>
          <PreviewImg
            alt={articleData.imageFileName}
            src={fileScr}
            data-testid="articleedit-img-image"
          />
        </FormGroup>
      )}
      <FormGroup>
        <Label htmlFor={FORM_FIELDS.imageFile}>Select image</Label>
        <FormInput
          id={FORM_FIELDS.imageFile}
          name={FORM_FIELDS.imageFile}
          type="file"
          accept="image/png, image/jpeg"
          defaultValue=""
          data-testid="articleedit-input-file"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor={FORM_FIELDS.author}>Author</Label>
        <FormInput
          id={FORM_FIELDS.author}
          name={FORM_FIELDS.author}
          type="text"
          defaultValue={articleData.author}
          required
          data-testid="articleedit-input-author"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor={FORM_FIELDS.title}>Title</Label>
        <FormInput
          id={FORM_FIELDS.title}
          name={FORM_FIELDS.title}
          type="text"
          defaultValue={articleData.title}
          required
          data-testid="articleedit-input-title"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor={FORM_FIELDS.content}>Content</Label>
        <FormTextarea
          id={FORM_FIELDS.content}
          name={FORM_FIELDS.content}
          rows={4}
          maxLength={100}
          defaultValue={articleData.content}
          required
          data-testid="articleedit-textarea-content"
        />
        <FormTextareaCounter data-testid="articleedit-block-contentlength">
          {articleData.content.length} / 100
        </FormTextareaCounter>
      </FormGroup>
      <FormGroup>
        <Label htmlFor={FORM_FIELDS.tags}>Tags</Label>
        <FormInput
          id={FORM_FIELDS.tags}
          name={FORM_FIELDS.tags}
          type="text"
          defaultValue={articleData.tags.join(', ')}
          data-testid="articleedit-input-tags"
        />
      </FormGroup>
      <FormControl>
        <FormButton
          type="submit"
          disabled={!isChanged}
          data-testid="articleedit-button-save"
        >
          <i className="fa-solid fa-check"></i>&ensp;Save
        </FormButton>
        <FormButton
          type="button"
          onClick={handleCancelClick}
          data-testid="articleedit-button-cancel"
        >
          <i className="fa-solid fa-cancel"></i>&ensp;Cancel
        </FormButton>
      </FormControl>
    </Form>
  )
}
