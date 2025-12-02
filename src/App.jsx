import { HelmetProvider, Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar.jsx'
import HeroGlow from './components/HeroGlow.jsx'
import BenefitCard from './components/BenefitCard.jsx'
import WaitlistForm from './components/WaitlistForm.jsx'
import SocialProof from './components/SocialProof.jsx'
import Footer from './components/Footer.jsx'
import PricingSection from './components/PricingSection.jsx'
import Countdown from './components/Countdown.jsx'

export default function App() {
  const benefits = [
    { title: 'Cinematic quality', description: 'AI transforms product photos into compelling video stories.' },
    { title: 'Built for African SMEs', description: 'Optimized for bandwidth and device performance across markets.' },
    { title: 'Fast and simple', description: 'Upload photos, get ready-to-share videos in minutes.' },
    { title: 'Brand-ready output', description: 'On-brand colors, captions, and aspect ratios.' }
  ]

  return (
    <HelmetProvider>
      <Helmet>
        <title>fetcha.ai — Turn product photos into cinematic AI videos</title>
        <meta name="description" content="Join the fetcha.ai waitlist. Transform product photos into cinematic AI videos, built for African SMEs." />
        <meta property="og:title" content="fetcha.ai — Cinematic AI videos from product photos" />
        <meta property="og:description" content="Join the waitlist for early access." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og.svg" />
        <link rel="canonical" href="https://fetcha.ai/" />
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <main className="relative">
          <HeroGlow />
          <div className="lg:mx-[calc(50%-50vw)] lg:w-[100vw]">
            <section className="container mx-auto w-full px-4 sm:px-6 md:px-6 lg:px-8 pt-16 sm:pt-20 pb-10 text-center min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] flex flex-col justify-start overflow-hidden">
            <h1 className="font-semibold tracking-tight text-[clamp(1.75rem,4vw,3.5rem)]">
              Turn your product photos into cinematic AI videos
            </h1>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-[clamp(0.95rem,2vw,1.125rem)]">
              Fetcha.ai generates high-quality, on-brand video from simple product photos. Built for African SMEs.
            </p>
            <div className="mt-6 flex justify-center">
              <Countdown targetDate={'2026-01-15T00:00:00Z'} />
            </div>
            <div className="mt-8 mx-auto glass rounded-2xl shadow-card overflow-hidden w-full">
              <div className="w-full aspect-[16/9] md:aspect-[21/9]">
                <img src="/demo.svg" alt="Demo" loading="lazy" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="glass rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-semibold">Market gaps we solve</h3>
                <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-brand.gold" /> Costly video production for small teams</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-purple-500" /> Inconsistent branding across social content</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-cyan-400" /> Limited time and skills for editing</li>
                </ul>
              </div>
              <div className="glass rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-semibold">Value propositions</h3>
                <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-brand.gold" /> Cinematic videos from simple photos</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-purple-500" /> On-brand templates and captions</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-cyan-400" /> Fast, mobile-friendly workflow</li>
                </ul>
              </div>
            </div>
            </section>
          </div>

          <div className="lg:mx-[calc(50%-50vw)] lg:w-[100vw]">
            <section className="container mx-auto w-full px-4 sm:px-6 md:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch pb-16">
              {benefits.map((b, i) => (
                <BenefitCard key={i} title={b.title} description={b.description} />
              ))}
            </section>
          </div>

          <div className="lg:mx-[calc(50%-50vw)] lg:w-[100vw]">
            <section className="container mx-auto w-full px-4 sm:px-6 md:px-6 lg:px-8 pb-6">
              <PricingSection />
            </section>
          </div>

          <section id="waitlist" className="container mx-auto px-6 pb-24">
            <WaitlistForm />
          </section>

          <section className="container mx-auto px-6 pb-16">
            <SocialProof />
          </section>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  )
}
