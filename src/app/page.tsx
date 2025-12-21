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

const Home = () => {
  return (
    <div>
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
