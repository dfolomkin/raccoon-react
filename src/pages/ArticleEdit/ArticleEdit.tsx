import React, { useEffect, useState } from 'react'
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
    if (id !== undefined) {
      const fetchArticle = async () => {
        const response = await getArticle(id)

        setArticleData(response.data)
        setArticleError(response.error)
      }

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
