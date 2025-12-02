import { useState } from 'react'
import PropTypes from 'prop-types'

export default function Navbar({ links = [{ label: 'Get Early Access', href: '#waitlist' }] }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 flex items-center justify-between">
        <button aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(v => !v)} className="sm:hidden px-3 py-2 rounded bg-white/10">
          <span className="block w-5 h-0.5 bg-white mb-1" />
          <span className="block w-5 h-0.5 bg-white mb-1" />
          <span className="block w-5 h-0.5 bg-white" />
        </button>
        <div className="flex items-center gap-2">
          <span className="inline-block w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded bg-gradient-to-tr from-brand.gold via-purple-500 to-cyan-400" />
          <span className="font-semibold">fetcha.ai</span>
        </div>
        <nav className="hidden sm:flex items-center gap-3 sm:gap-4">
          {links.map(l => (
            <a key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      {open && (
        <div className="sm:hidden px-4 pb-3 space-y-2">
          {links.map(l => (
            <a key={l.href} href={l.href} className="block w-full px-4 py-3 rounded bg-white/10">{l.label}</a>
          ))}
        </div>
      )}
    </header>
  )
}

Navbar.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string.isRequired, href: PropTypes.string.isRequired }))
}
