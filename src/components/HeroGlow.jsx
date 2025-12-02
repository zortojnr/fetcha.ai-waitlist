export default function HeroGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[90vw] sm:w-[80vw] md:w-[70vw] h-[50vh] sm:h-[55vh] md:h-[60vh] rounded-full blur-3xl opacity-60 animate-glow" style={{
        background: 'radial-gradient(closest-side, rgba(243,201,105,0.15), transparent), radial-gradient(closest-side, rgba(99,102,241,0.15), transparent), radial-gradient(closest-side, rgba(34,197,94,0.08), transparent)'
      }} />
    </div>
  )
}
