import PropTypes from 'prop-types'

export default function BenefitCard({ title, description }) {
  return (
    <div className="glass rounded-2xl p-5 sm:p-6 shadow-card h-full">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-tr from-brand.gold via-purple-500 to-cyan-400 mb-4" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-300">{description}</p>
    </div>
  )
}

BenefitCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}
