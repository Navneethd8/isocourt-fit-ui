import { useEffect } from 'react'

const suffix = 'IsoCourt UI kits'

export function DocumentTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = `${title} · ${suffix}`
  }, [title])
  return null
}
