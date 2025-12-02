import { useState } from 'react'
import { submitWaitlist } from '../lib/api.js'

export default function WaitlistForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    const trimmedName = fullName.trim()
    const trimmedEmail = email.trim()
    if (!trimmedName || !trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setMessage({ type: 'error', text: 'Please enter a valid name and email.' })
      return
    }
    setLoading(true)
    setMessage(null)
    const res = await submitWaitlist({ fullName: trimmedName, email: trimmedEmail, businessType: businessType || null })
    if (res.success) {
      setMessage({ type: 'success', text: 'You are on the list. Watch your inbox!' })
      setFullName('')
      setEmail('')
      setBusinessType('')
    } else {
      setMessage({ type: 'error', text: res.error || 'Something went wrong.' })
    }
    setLoading(false)
  }

  return (
    <div className="glass rounded-2xl p-5 sm:p-6 shadow-card max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold">Join the waitlist</h2>
      <p className="mt-1 text-gray-300">Get early access when we launch.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-3 sm:space-y-4">
        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand.gold text-white" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand.gold text-white" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Business Type</label>
          <div className="relative">
            <select value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="w-full min-h-[44px] px-4 py-3 pr-10 rounded-xl bg-white text-black border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand.gold appearance-none select-black">
              <option value="">Select (optional)</option>
              <option value="retail">Retail</option>
              <option value="food-and-beverage">Food & Beverage</option>
              <option value="fashion">Fashion</option>
              <option value="services">Services</option>
              <option value="other">Other</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-black/70">▼</span>
          </div>
        </div>
        <button type="submit" disabled={loading} className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white text-black font-semibold disabled:opacity-60 hover:bg-white/90 min-h-[44px]">
          {loading ? 'Joining…' : 'Join Waitlist'}
        </button>
        {message && (
          <div className={message.type === 'success' ? 'mt-3 px-3 py-2 rounded-lg bg-green-500/20 text-green-300' : 'mt-3 px-3 py-2 rounded-lg bg-red-500/20 text-red-300'}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  )
}
