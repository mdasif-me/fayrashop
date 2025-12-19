import { sampleProducts } from '../shop/store'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Star, ShoppingCart, Heart, Truck, ShieldCheck, RefreshCw, Minus, Plus } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function ProductDetailPage({ searchParams }: PageProps) {
  const id = searchParams.id

  if (!id || Array.isArray(id)) {
    // If no ID provided, maybe redirect to shop or show error
    // For now, let's treat it as not found or handle gracefully
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

  const product = sampleProducts.find((p) => p.id === Number(id))

  if (!product) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb / Back Navigation */}
      <div className="mb-6">
        <Link href="/shop" className="flex items-center gap-1 text-sm">
          ← Back to Shop
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {/* Product Image Section */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl border">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover object-center"
              priority
            />
            {product.isNew && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white hover:bg-red-600">
                New Arrival
              </Badge>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col">
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl">{product.title}</h1>

          <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">{product.rating} (124 reviews)</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-sm font-medium text-green-600">{product.orders} orders</span>
            <span className="text-gray-300">|</span>
            <span
              className={`text-sm font-medium ${product.deliveryDays <= 2 ? 'text-green-600' : 'text-gray-600'}`}
            >
              {product.deliveryDays === 0
                ? 'Same Day Delivery'
                : `Delivers in ${product.deliveryDays} days`}
            </span>
          </div>

          <div className="mb-6 flex items-end gap-3">
            <span className="text-4xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <div className="mb-1 flex flex-col">
                <span className="text-lg text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </div>
            )}
            {product.discount && (
              <Badge variant="destructive" className="mb-2 h-6">
                Save {product.discount}%
              </Badge>
            )}
          </div>

          <Separator className="mb-6" />

          <div className="mb-6 grid gap-4">
            <div className="flex items-center justify-between rounded-lg border p-3 transition-colors">
              <div className="flex items-center gap-3">
                <div className="rounded-full p-2 text-blue-600">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Free Delivery</p>
                  <p className="text-xs">Orders over $200</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3 transition-colors">
              <div className="flex items-center gap-3">
                <div className="rounded-full p-2 text-green-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">2 Year Warranty</p>
                  <p className="text-xs">Full coverage included</p>
                </div>
              </div>
            </div>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-medium">Available Colors</h3>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`h-8 w-8 rounded-full border-2 ring-blue-500 ring-offset-2 focus:ring-2 ${
                      // Mapping simple color names to tailwind classes roughly,
                      // referencing how store.ts does it but store has separate list.
                      // We'll just use inline styles for generic colors if specific class mapping isn't easy here,
                      // or rely on classnames if they match standard colors.
                      color === 'white'
                        ? 'border-gray-300 bg-white'
                        : color === 'black'
                          ? 'border-transparent bg-black'
                          : `bg-${color}-500 border-transparent`
                    }`}
                    title={color}
                    style={{
                      backgroundColor: color !== 'white' && color !== 'black' ? color : undefined,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="flex-1 text-base">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" intent="outline" className="flex-1 px-6 sm:flex-none">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-4 text-center text-xs text-gray-500">
            Sold by{' '}
            <span className="cursor-pointer font-medium text-blue-600 hover:underline">
              {product.seller}
            </span>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Product Description / Tabs */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Product Description</h2>
        <div className="prose max-w-none">
          <p>
            Experience the next level of technology with the {product.title}. Designed for
            performance and style, this device features top-tier specifications suitable for both
            professionals and enthusiasts.
          </p>
          <p>
            With its sleek design and durable build, it fits perfectly into your lifestyle. Enjoy
            crystal clear visuals, rapid processing speeds, and long-lasting battery life. Whether
            you are working, gaming, or streaming, the {product.title} delivers an exceptional
            experience.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>High-resolution display for immersive viewing</li>
            <li>Advanced processor for multitasking efficiency</li>
            <li>Premium materials for durability and elegance</li>
            <li>Comprehensive warranty and support from {product.brand}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
