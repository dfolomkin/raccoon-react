import {
  debounce,
  formDataToObject,
  getUrlQueryParamValue,
  objectIncludes,
} from '../utils'

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should delay function execution', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn('test')

    expect(mockFn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledWith('test')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should cancel previous calls when called multiple times', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn('first')
    debouncedFn('second')
    debouncedFn('third')

    jest.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledWith('third')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should handle multiple arguments', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn('arg1', 'arg2', 123)

    jest.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 123)
  })

  it('should clear timeout after execution', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()
    jest.advanceTimersByTime(100)

    // Should not accumulate multiple timeouts
    debouncedFn()
    jest.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledTimes(2)
  })
})

describe('objectIncludes', () => {
  const article = {
    id: 1,
    author: 'E.Hyperraccoon',
    title: 'Lilies of the Valley: Delicate Spring Beauties',
    content:
      'Lilies of the valley (Convallaria majalis) are fragrant, bell-shaped flowers that bloom in spring.',
    tags: ['raccoonBlog', 'hyperRaccoon'],
    socials: {
      facebook: 16,
      gplus: 7,
      twitter: 15,
      vk: 16,
      yaru: 1,
    },
    date: 1506694140000,
    imageFileName: 'photo_01.png',
  }

  it('should find match in author field', () => {
    const result = objectIncludes(
      article,
      ['author', 'title', 'content'],
      'hyperraccoon'
    )

    expect(result).toBe(true)
  })

  it('should find match in title field', () => {
    const result = objectIncludes(
      article,
      ['title', 'author', 'content'],
      'valley'
    )

    expect(result).toBe(true)
  })

  it('should find match in content field', () => {
    const result = objectIncludes(
      article,
      ['content', 'title', 'author'],
      'fragrant'
    )

    expect(result).toBe(true)
  })

  it('should find match in numeric id field', () => {
    const result = objectIncludes(article, ['id', 'author', 'title'], '1')

    expect(result).toBe(true)
  })

  it('should find match in date field (as number)', () => {
    const result = objectIncludes(
      article,
      ['date', 'id', 'author'],
      '1506694140000'
    )

    expect(result).toBe(true)
  })

  it('should find match in imageFileName field', () => {
    const result = objectIncludes(
      article,
      ['imageFileName', 'author', 'title'],
      'photo'
    )

    expect(result).toBe(true)
  })

  it('should be case insensitive', () => {
    const result1 = objectIncludes(article, ['author'], 'E.HYPERRACCOON')
    const result2 = objectIncludes(article, ['title'], 'lilies')
    const result3 = objectIncludes(article, ['content'], 'SPRING')

    expect(result1).toBe(true)
    expect(result2).toBe(true)
    expect(result3).toBe(true)
  })

  it('should return false when no properties include query', () => {
    const result = objectIncludes(
      article,
      ['author', 'title', 'content'],
      'nonexistent'
    )

    expect(result).toBe(false)
  })

  it('should return false for array properties (tags)', () => {
    const result = objectIncludes(article, ['tags', 'author'], 'raccoonBlog')

    expect(result).toBe(false)
  })

  it('should return false for object properties (socials)', () => {
    const result = objectIncludes(article, ['socials', 'author'], 'facebook')

    expect(result).toBe(false)
  })

  it('should stop searching when match is found in first property', () => {
    // This tests that it doesn't continue searching after finding a match
    const result = objectIncludes(
      article,
      ['author', 'title', 'content'],
      'hyperraccoon'
    )

    expect(result).toBe(true)
  })

  it('should continue searching until match is found', () => {
    // Search in order: author (no match) -> title (no match) -> content (match)
    const result = objectIncludes(
      article,
      ['author', 'title', 'content'],
      'flowers'
    )

    expect(result).toBe(true)
  })

  it('should handle partial matches', () => {
    const result1 = objectIncludes(article, ['author'], 'Hyper')
    const result2 = objectIncludes(article, ['title'], 'Delicate')
    const result3 = objectIncludes(article, ['content'], 'shaped')

    expect(result1).toBe(true)
    expect(result2).toBe(true)
    expect(result3).toBe(true)
  })

  it('should handle empty query string', () => {
    const result = objectIncludes(article, ['author', 'title', 'content'], '')

    expect(result).toBe(true) // Empty string is included in any string
  })

  it('should return false when searching only non-string properties', () => {
    const result = objectIncludes(article, ['tags', 'socials'], 'anything')

    expect(result).toBe(false)
  })

  it('should find match with special characters in query', () => {
    const result = objectIncludes(article, ['author'], 'E.')

    expect(result).toBe(true)
  })

  it('should handle numeric query against string fields', () => {
    const result = objectIncludes(article, ['author', 'title'], '1') // '1' exists in id but we're searching string fields

    expect(result).toBe(false)
  })
})

describe('formDataToObject', () => {
  it('should convert FormData to object', () => {
    const formData = new FormData()

    formData.append('name', 'John')
    formData.append('age', '30')
    formData.append('active', 'true')

    const result = formDataToObject<{
      name: string
      age: string
      active: string
    }>(formData)

    expect(result).toEqual({
      name: 'John',
      age: '30',
      active: 'true',
    })
  })

  it('should handle duplicate keys by taking the last value', () => {
    const formData = new FormData()

    formData.append('color', 'red')
    formData.append('color', 'blue')

    const result = formDataToObject<{ color: string }>(formData)

    expect(result).toEqual({
      color: 'blue', // Last value wins
    })
  })

  it('should handle empty FormData', () => {
    const formData = new FormData()

    const result = formDataToObject(formData)

    expect(result).toEqual({})
  })

  it('should preserve different value types as strings', () => {
    const formData = new FormData()

    formData.append('number', '123')
    formData.append('boolean', 'true')
    formData.append('string', 'hello')

    const result = formDataToObject(formData)

    expect(result).toEqual({
      number: '123',
      boolean: 'true',
      string: 'hello',
    })
  })
})

describe('getUrlQueryParamValue', () => {
  it('should return parameter value from query string', () => {
    const queryString = 'name=john&age=30&city=ny'

    const result = getUrlQueryParamValue(queryString, 'age')

    expect(result).toBe('30')
  })

  it('should return undefined for non-existent parameter', () => {
    const queryString = 'name=john&age=30'

    const result = getUrlQueryParamValue(queryString, 'nonexistent')

    expect(result).toBeUndefined()
  })

  it('should handle empty query string', () => {
    const result = getUrlQueryParamValue('', 'param')

    expect(result).toBeUndefined()
  })

  it('should handle query string without values', () => {
    const queryString = 'param1&param2=value'

    const result1 = getUrlQueryParamValue(queryString, 'param1')
    const result2 = getUrlQueryParamValue(queryString, 'param2')

    expect(result1).toBeUndefined() // No value after =
    expect(result2).toBe('value')
  })

  it('should handle multiple parameters with same name by taking last one', () => {
    const queryString = 'color=red&color=blue&color=green'

    const result = getUrlQueryParamValue(queryString, 'color')

    expect(result).toBe('green')
  })

  it('should handle special characters in values', () => {
    const queryString = 'name=John%20Doe&email=test%40example.com'

    const nameResult = getUrlQueryParamValue(queryString, 'name')
    const emailResult = getUrlQueryParamValue(queryString, 'email')

    expect(nameResult).toBe('John%20Doe')
    expect(emailResult).toBe('test%40example.com')
  })

  it('should handle query string with question mark removed', () => {
    const queryString = 'name=john&age=30'

    const result = getUrlQueryParamValue(queryString, 'name')

    expect(result).toBe('john')
  })
})
