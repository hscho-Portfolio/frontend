import { authHeaders } from './core.js'

const backendUrl = () => window.BACKEND_URL || 'http://localhost:8080'

export const requestJson = async (path, options = {}) => {
  const res = await fetch(`${backendUrl()}${path}`, {
    headers: {
      Accept: 'application/json',
      ...authHeaders(),
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
    ...options,
  })

  let data = null
  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) data = await res.json()

  if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`)
  return data
}
