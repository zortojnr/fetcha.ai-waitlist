import { useEffect, useState } from 'react'

export default function Countdown({ targetDate }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date(targetDate).getTime()
    const tick = () => {
      const now = Date.now()
      const diff = Math.max(0, target - now)
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)
      setTime({ days, hours, minutes, seconds })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  const Block = ({ label, value }) => (
    <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 min-w-[70px] motion-safe:transition-all motion-safe:duration-300">
      <div className="text-[clamp(1.25rem,3vw,2rem)] font-semibold">{value}</div>
      <div className="text-[clamp(0.8rem,1.5vw,1rem)] text-gray-300">{label}</div>
    </div>
  )

  return (
    <div aria-live="polite" className="glass rounded-2xl p-4 sm:p-5 shadow-card inline-flex flex-wrap items-center gap-3 sm:gap-4 justify-center">
      <Block label="Days" value={time.days} />
      <Block label="Hours" value={time.hours} />
      <Block label="Minutes" value={time.minutes} />
      <Block label="Seconds" value={time.seconds} />
    </div>
  )
}

