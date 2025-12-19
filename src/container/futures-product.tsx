'use client'
import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart, Eye, ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const products = [
  {
    id: 1,
    title: 'TOZO T6 True Wireless Earbuds Bluetooth Headphone',
    price: '$70',
    ratingCount: 738,
    image: 'https://placehold.co/408x368.png',
    tag: 'HOT',
  },
  {
    id: 2,
    title: 'Samsung Galaxy S21 5G',
    price: '$2,300',
    ratingCount: 536,
    image: 'https://placehold.co/408x368.png',
  },
  {
    id: 3,
    title: 'Amazon Basics High-Speed HDMI Cable (18 Gbps)',
    price: '$360',
    ratingCount: 423,
    image: 'https://placehold.co/408x368.png',
    status: 'BEST DEALS',
  },
  {
    id: 4,
    title: 'Portable Washing Machine 11lbs capacity',
    price: '$80',
    ratingCount: 816,
    image: 'https://placehold.co/408x368.png',
  },
  {
    id: 5,
    title: 'World Over-Ear Gaming Headphones with USB',
    price: '$1,500',
    ratingCount: 647,
    image: 'https://placehold.co/408x368.png',
  },
  {
    id: 6,
    title: 'Polaroid 57-Inch Photo/Video Tripod',
    price: '$1,200',
    oldPrice: '$1,600',
    ratingCount: 877,
    image: 'https://placehold.co/408x368.png',
    discount: '25% OFF',
  },
  {
    id: 7,
    title: 'Dell Optiplex 7000x7480 All-in-One Monitor',
    price: '$250',
    ratingCount: 426,
    image: 'https://placehold.co/408x368.png',
  },
  {
    id: 8,
    title: '4K UHD LED Smart TV with Chromecast Built-in',
    price: '$220',
    ratingCount: 583,
    image: 'https://placehold.co/408x368.png',
    tag: 'SALE',
  },
]

export default function FuturesProduct() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="col-span-1 lg:col-span-3">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded shadow">
              <div className="bg-amber-200 p-6 text-center text-black">
                <div className="text-sm font-medium uppercase">Computer & Accessories</div>
                <h3 className="mt-2 text-4xl font-semibold">32% Discount</h3>
                <p className="mt-3 text-sm">For all electronics products</p>

                <div className="mt-4 flex items-center justify-center gap-3">
                  <div className="text-sm">Offers ends in:</div>
                  <p className="items-center gap-1 bg-white p-1.5 text-sm font-semibold">
                    ENDS OF CHRISTMAS
                  </p>
                </div>

                <button className="bg-primary mx-auto mt-8 flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold text-white">
                  SHOP NOW
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="relative flex w-full items-center justify-center">
                <Image
                  src="https://placehold.co/428x627.png"
                  alt="promo banner"
                  width={428}
                  height={627}
                  className="w-full object-contain"
                />
              </div>
            </div>
          </aside>

          <div className="col-span-1 flex flex-col gap-6 lg:col-span-9">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Featured Products</h2>
                <p className="mt-1 text-sm text-gray-500">All the best deals and featured items</p>
              </div>

              <div className="flex items-center gap-4">
                <nav className="hidden items-center gap-3 text-sm md:flex">
                  <button className="text-primary rounded-full px-3 py-1 text-sm font-medium">
                    All Product
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600">Smart Phone</button>
                  <button className="px-3 py-1 text-sm text-gray-600">Laptop</button>
                  <button className="px-3 py-1 text-sm text-gray-600">Headphone</button>
                  <button className="px-3 py-1 text-sm text-gray-600">TV</button>
                </nav>

                <button className="flex items-center gap-2 text-sm">
                  Browse All Product
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((item) => (
                <Card
                  key={item.id}
                  className="group flex flex-col justify-between border p-4 hover:shadow-lg"
                >
                  <CardContent className="flex flex-grow flex-col px-0">
                    <div className="relative flex h-52 w-full items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                      />

                      {item.status && (
                        <Badge className="absolute top-0 left-0 bg-gray-700 text-white">
                          {item.status}
                        </Badge>
                      )}
                      {item.discount && (
                        <Badge className="absolute top-0 left-0 bg-yellow-400 text-black">
                          {item.discount}
                        </Badge>
                      )}
                      {item.tag && (
                        <Badge className="absolute top-0 left-0 bg-red-600 text-white">
                          {item.tag}
                        </Badge>
                      )}

                      <div className="absolute inset-0 hidden items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:flex">
                        <Button className="bg-primary rounded-full p-2 text-white shadow">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button className="bg-primary rounded-full p-2 text-white shadow">
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                        <Button className="bg-primary rounded-full p-2 text-white shadow">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ))}
                      <span className="ml-1 text-xs text-gray-500">({item.ratingCount})</span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm">{item.title}</p>

                    <div className="mt-auto py-2">
                      <span className="font-semibold text-blue-600">{item.price}</span>
                      {item.oldPrice && (
                        <span className="ml-2 text-xs text-gray-400 line-through">
                          {item.oldPrice}
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex items-center gap-2 lg:hidden">
                      <Button className="rounded-xs border p-3">
                        <Heart className="h-5 w-5" />
                      </Button>
                      <button className="bg-primary flex flex-1 items-center justify-center gap-2 rounded-xs py-3 text-sm font-normal text-white">
                        <ShoppingCart className="h-5 w-5" />
                        ADD TO CART
                      </button>
                      <Button className="rounded-xs border p-3">
                        <Eye className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
