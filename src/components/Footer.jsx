export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="container mx-auto px-6 py-8 text-sm text-gray-400">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} fetcha.ai</p>
          <div className="flex items-center gap-4">
            <a href="#waitlist" className="hover:text-white">Get Early Access</a>
            <a href="#" className="hover:text-white">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

