export const debounce = <T extends unknown[], R>(
  fn: (...args: T) => R,
  ms: number
) => {
  let timer: ReturnType<typeof setTimeout>

  return (...args: T) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn(...args)
      clearTimeout(timer)
    }, ms)
  }
}

export const objectIncludes = (
  object: Record<string, unknown>,
  props: string[],
  query: string
) => {
  let result = false
  let index = 0

  while (!result && index < props.length) {
    const currentValue = object[props[index]]

    if (typeof currentValue === 'string' || typeof currentValue === 'number') {
      result = String(currentValue)
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase())
    }

    index++
  }

  return result
}

export const formDataToObject = <T>(formData: FormData): T => {
  const result: Record<string, unknown> = {}

  formData.forEach((value, key) => {
    result[key] = value
  })

  return result as T
}

export const getUrlQueryParamValue = (
  queryString: string,
  paramName: string
) => {
  const params = queryString.split('&').reduce(
    (acc, item) => {
      const [key, value] = item.split('=')

      return { ...acc, [key]: value }
    },
    {} as Record<string, string>
  )

  return params[paramName]
}
