import ServiceBanner from './components/ServiceBanner'
import ServiceQuoteSection from './components/ServiceQuoteSection'
import ServiceCaseStudyCard from './components/ServiceCaseStudyCard'
import ServiceGrid from './components/ServiceGrid'
import WhoWeAre from './components/WhoWeAre'
import Testimonials from '../home/components/Testimonials'

const Services = () => {
  return (
    <>
      <ServiceBanner />
      <ServiceQuoteSection />
      <ServiceCaseStudyCard />
      <ServiceGrid />
      <WhoWeAre />
      <Testimonials className='py-16 xl:py-20 2xl:py-24' />
    </>
  )
}

export default Services
