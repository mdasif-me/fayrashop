'use client'
import { sampleProducts, useProductStore } from '../shop/store'
import Link from 'next/link'
import { notFound, useSearchParams } from 'next/navigation'
import ProductVariant_05 from '../../../components/commerce-ui/product-variants-05'

export default function ProductDetailPage() {
  const searchParams = useSearchParams()
  const selectedProductId = useProductStore((s) => s.selectedProductId)
  const products = useProductStore((s) => s.products)

  const idParam = searchParams.get('id')
  const resolvedId = idParam ? Number(idParam) : selectedProductId

  if (!resolvedId || Number.isNaN(resolvedId)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Product not found</h1>
          <Link href="/shop" className="hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const product =
    products.find((p) => p.id === resolvedId) ?? sampleProducts.find((p) => p.id === resolvedId)

  if (!product) {
    return notFound()
  }

  // Prepare images for the product variant component
  const productImages = [
    { url: product.image, title: product.title },
    { url: product.image, title: `${product.title} - View 2` },
    { url: product.image, title: `${product.title} - View 3` },
    { url: product.image, title: `${product.title} - View 4` },
  ]

  // Prepare accessories (optional add-ons)
  const accessories = [
    {
      id: 'warranty-extended',
      label: 'Extended Warranty (+1 Year)',
      value: 'warranty-extended',
      price: 49.99,
      isInStock: true,
    },
    {
      id: 'protection-plan',
      label: 'Protection Plan',
      value: 'protection-plan',
      price: 29.99,
      isInStock: true,
    },
    {
      id: 'gift-wrap',
      label: 'Gift Wrapping',
      value: 'gift-wrap',
      price: 9.99,
      isInStock: true,
    },
  ]

  // Prepare services
  const services = [
    {
      id: 'installation',
      label: 'Professional Installation',
      value: 'installation',
      price: 79.99,
    },
    {
      id: 'setup',
      label: 'Setup & Configuration',
      value: 'setup',
      price: 49.99,
    },
  ]

  return (
    <div className="min-h-screen bg-linear-to-b">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/shop" className="group flex items-center gap-2 text-sm transition-colors">
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Back to Shop</span>
          </Link>
        </div>

        <ProductVariant_05
          title={product.title}
          description={`${product.title} - High quality product from ${product.brand}. Perfect for your needs with excellent performance and durability.`}
          price={product.price}
          badge={
            product.isNew ? 'New Arrival' : product.discount ? `${product.discount}% OFF` : null
          }
          rating={product.rating}
          reviewCount={124}
          warranty="2 Year"
          images={productImages}
          accessoryVariants={accessories}
          serviceVariants={services}
          onAddToCart={(payload: any) => {
            console.log('Add to cart:', payload)
            // Handle add to cart logic
          }}
          onBuyNow={(payload: any) => {
            console.log('Buy now:', payload)
            // Handle buy now logic
          }}
          featuredReview={{
            avatarUrl:
              'https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/user-04.jpg',
            rating: 5,
            reviewDate: 'Dec 15, 2024',
            reviewerName: 'John Doe',
            reviewerTitle: 'Verified Buyer',
            reviewText: `Absolutely love this ${product.title}! The quality is outstanding and it exceeded my expectations. Highly recommend to anyone looking for a reliable product.`,
          }}
          benefits={[
            {
              title: 'Free Shipping',
              description: 'Free delivery on orders over $200',
            },
            {
              title: 'Quality Guarantee',
              description: '100% authentic products',
            },
            {
              title: 'Easy Returns',
              description: '30-day return policy',
            },
          ]}
        />
      </div>
    </div>
  )
}
