export async function submitWaitlist({ fullName, email, businessType }) {
  try {
    const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, businessType })
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok && data && data.success) return { success: true }
    const error = data && data.error ? data.error : 'Request failed'
    return { success: false, error }
  } catch {
    return { success: false, error: 'Network error' }
  }
}

