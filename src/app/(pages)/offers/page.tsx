'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tag, Clock, TrendingUp, Zap, Gift, Star } from 'lucide-react'
import Image from 'next/image'
import Timer from '@/components/ui/timer'

const flashDeals = [
  {
    id: 1,
    title: 'Xbox Series S - 512GB SSD Console',
    image: 'https://placehold.co/500x368.png',
    originalPrice: 865.99,
    salePrice: 442.12,
    discount: 49,
    stock: 15,
    sold: 85,
  },
  {
    id: 2,
    title: 'Sony PlayStation 5 Console',
    image: 'https://placehold.co/500x368.png',
    originalPrice: 599.99,
    salePrice: 499.99,
    discount: 17,
    stock: 8,
    sold: 92,
  },
  {
    id: 3,
    title: 'Apple AirPods Pro 2nd Gen',
    image: 'https://placehold.co/500x368.png',
    originalPrice: 249.99,
    salePrice: 199.99,
    discount: 20,
    stock: 25,
    sold: 75,
  },
  {
    id: 4,
    title: 'Samsung Galaxy Watch 5',
    image: 'https://placehold.co/500x368.png',
    originalPrice: 399.99,
    salePrice: 279.99,
    discount: 30,
    stock: 12,
    sold: 88,
  },
]

const weeklyDeals = [
  {
    id: 1,
    title: 'Up to 50% OFF on Electronics',
    description: 'Get amazing discounts on laptops, phones, and accessories',
    image: 'https://placehold.co/600x400.png',
    badge: 'MEGA SALE',
    color: 'bg-gradient-to-r from-purple-600 to-blue-600',
  },
  {
    id: 2,
    title: 'Fashion Bonanza',
    description: 'Trendy clothes and accessories at unbeatable prices',
    image: 'https://placehold.co/600x400.png',
    badge: 'LIMITED TIME',
    color: 'bg-gradient-to-r from-pink-600 to-red-600',
  },
  {
    id: 3,
    title: 'Home & Kitchen Essentials',
    description: 'Transform your home with our exclusive deals',
    image: 'https://placehold.co/600x400.png',
    badge: 'HOT DEAL',
    color: 'bg-gradient-to-r from-orange-600 to-yellow-600',
  },
]

const couponCodes = [
  { code: 'SAVE20', discount: '20% OFF', minPurchase: 100, icon: Tag },
  { code: 'FREESHIP', discount: 'Free Shipping', minPurchase: 50, icon: Gift },
  { code: 'FLASH50', discount: '$50 OFF', minPurchase: 200, icon: Zap },
  { code: 'NEWUSER', discount: '30% OFF', minPurchase: 75, icon: Star },
]

export default function OffersPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold">Special Offers & Deals</h1>
          <p className="mb-6 text-xl">Save big on your favorite products!</p>
          <div className="flex items-center justify-center gap-3">
            <Clock className="h-6 w-6" />
            <span className="text-lg">Deals end in:</span>
            <Timer />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <Zap className="h-8 w-8 text-yellow-500" />
            <h2 className="text-3xl font-bold">Flash Deals</h2>
            <Badge className="animate-pulse bg-red-500 text-white">LIMITED TIME</Badge>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {flashDeals.map((deal) => {
              const stockPercentage = (deal.stock / (deal.stock + deal.sold)) * 100
              return (
                <Card key={deal.id} className="group transition-all duration-300 hover:shadow-xl">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <Badge className="absolute top-2 left-2 z-10 bg-red-500 text-white">
                        -{deal.discount}%
                      </Badge>
                      <div className="relative h-48 w-full overflow-hidden rounded-lg">
                        <Image
                          src={deal.image}
                          alt={deal.title}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    </div>

                    <h3 className="mb-3 line-clamp-2 min-h-[3rem] font-semibold">{deal.title}</h3>

                    <div className="mb-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-blue-600">${deal.salePrice}</span>
                        <span className="text-sm text-gray-400 line-through">
                          ${deal.originalPrice}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-gray-600">Available: {deal.stock}</span>
                        <span className="text-gray-600">Sold: {deal.sold}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 transition-all"
                          style={{ width: `${100 - stockPercentage}%` }}
                        />
                      </div>
                    </div>

                    <Button className="w-full">Add to Cart</Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Weekly Deals */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-green-500" />
            <h2 className="text-3xl font-bold">Weekly Deals</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {weeklyDeals.map((deal) => (
              <Card key={deal.id} className="group overflow-hidden transition-all hover:shadow-xl">
                <div className={`${deal.color} relative p-6 text-white`}>
                  <Badge className="mb-4 bg-white text-gray-900">{deal.badge}</Badge>
                  <h3 className="mb-2 text-2xl font-bold">{deal.title}</h3>
                  <p className="mb-4 text-white/90">{deal.description}</p>
                  <Button intent="outline" className="bg-white text-gray-900 hover:bg-gray-100">
                    Shop Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Coupon Codes */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <Gift className="h-8 w-8 text-purple-500" />
            <h2 className="text-3xl font-bold">Coupon Codes</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {couponCodes.map((coupon, index) => {
              const Icon = coupon.icon
              return (
                <Card
                  key={index}
                  className="cursor-pointer border-2 border-dashed border-purple-300 transition-all hover:border-purple-500"
                >
                  <CardContent className="p-6 text-center">
                    <Icon className="mx-auto mb-4 h-12 w-12 text-purple-500" />
                    <div className="mb-3 rounded-lg bg-gray-100 px-4 py-2 font-mono text-lg font-bold">
                      {coupon.code}
                    </div>
                    <p className="mb-2 text-xl font-bold text-purple-600">{coupon.discount}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Min. purchase: ${coupon.minPurchase}
                    </p>
                    <Button intent="outline" size="sm" className="mt-4 w-full">
                      Copy Code
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
