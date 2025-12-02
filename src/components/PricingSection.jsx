function Check({ on }) {
  return (
    <span className={on ? 'inline-flex w-5 h-5 items-center justify-center rounded bg-green-500/20 text-green-300' : 'inline-flex w-5 h-5 items-center justify-center rounded bg-red-500/20 text-red-300'}>
      {on ? '✓' : '✕'}
    </span>
  )
}

import PropTypes from 'prop-types'

export default function PricingSection() {
  const tiers = [
    {
      name: 'Standard',
      price: '₦15,000',
      accent: 'border-white/15',
      button: 'bg-white text-black',
      features: ['720p video exports', 'Basic captions & music', 'Single-brand profile']
    },
    {
      name: 'Pro',
      price: '₦40,000',
      accent: 'border-gradient',
      button: 'bg-white text-black',
      features: ['1080p video exports', 'Advanced branding overlays', 'Priority processing']
    },
    {
      name: 'Business',
      price: '₦100,000',
      accent: 'border-brand',
      button: 'bg-white text-black',
      features: ['1080p video exports', 'Team seats & collaboration', 'Dedicated support']
    }
  ]

  const comparison = [
    { label: 'HD quality', values: [true, true, true] },
    { label: 'Priority support', values: [false, true, true] },
    { label: 'Brand templates', values: [false, true, true] },
    { label: 'Team seats', values: ['1', '3', '10'] }
  ]

  return (
    <section className="container mx-auto w-full px-4 sm:px-6 md:px-6 lg:px-8 pb-20">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-semibold">Pricing</h2>
        <p className="mt-2 text-gray-300">Choose a plan that fits your business.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {tiers.map((t) => (
          <div key={t.name} className={
            t.accent === 'border-gradient'
              ? 'rounded-2xl p-1 bg-gradient-to-tr from-brand.gold via-purple-500 to-cyan-400'
              : 'rounded-2xl p-1 bg-white/10'
          }>
            <div className={t.accent === 'border-brand' ? 'glass rounded-2xl p-6 border border-brand.gold/40 shadow-card h-full flex flex-col' : 'glass rounded-2xl p-6 shadow-card h-full flex flex-col'}>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{t.name}</h3>
                <span className="text-2xl font-bold whitespace-nowrap">{t.price}</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-brand.gold via-purple-500 to-cyan-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-auto w-full px-4 py-3 rounded-none ${t.button} font-semibold shadow min-h-[44px]`}>Choose {t.name}</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 glass rounded-2xl p-6 shadow-card" aria-labelledby="pricing-comparison">
        <h3 id="pricing-comparison" className="sr-only">Feature Comparison</h3>
        <div className="hidden md:grid md:grid-cols-4 gap-4 items-center">
          <div className="text-sm md:text-base font-semibold text-gray-200">Feature</div>
          <div className="text-sm md:text-base font-semibold text-gray-200">Standard</div>
          <div className="text-sm md:text-base font-semibold text-gray-200">Pro</div>
          <div className="text-sm md:text-base font-semibold text-gray-200">Business</div>
          {comparison.map((row) => (
            <>
              <div key={row.label + '-label'} className="py-2 px-3 text-sm md:text-base text-gray-300 min-h-[44px] flex items-center">{row.label}</div>
              {row.values.map((v, i) => (
                <div key={row.label + '-col-' + i} className="py-2 px-3 min-h-[44px] flex items-center">
                  {typeof v === 'boolean' ? <Check on={v} /> : <span className="text-gray-200">{v}</span>}
                </div>
              ))}
            </>
          ))}
        </div>
        <div className="md:hidden space-y-4">
          {comparison.map((row) => (
            <div key={row.label} className="rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="text-sm font-semibold text-gray-200 mb-3">{row.label}</div>
              <div className="grid grid-cols-3 gap-3">
                {row.values.map((v, i) => (
                  <div key={row.label + '-m-' + i} className="flex items-center justify-center min-h-[40px] rounded-lg bg-white/5 border border-white/10">
                    {typeof v === 'boolean' ? <Check on={v} /> : <span className="text-gray-200">{v}</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

PricingSection.propTypes = {}
