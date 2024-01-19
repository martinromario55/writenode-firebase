import { useEffect } from 'react'

export const useTitle = title => {
  useEffect(() => {
    document.title = `WriteNode | ${title}`
  }, [title])

  return null
}
