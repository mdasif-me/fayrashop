import {
  Accessories,
  FuturesProduct,
  Hero,
  LargeProduct,
  Overall,
  Products,
  PromotionCard,
  Service,
} from '@/container'
import Category from '../container/category'
import { EmailVerificationBanner } from '@/components/email-verification-banner'

const Home = () => {
  return (
    <div>
      <EmailVerificationBanner />
      <Hero />
      <Service />
      <Products />
      <Category />
      <FuturesProduct />
      <PromotionCard />
      <Accessories />
      <LargeProduct />
      <Overall />
    </div>
  )
}

export default Home
