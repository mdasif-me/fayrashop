'use client'
import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart, Eye, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Timer from '@/components/ui/timer'

const products = [
  {
    id: 1,
    title: 'Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear',
    price: '$2,300',
    status: 'SOLD OUT',
    image: 'https://placehold.co/500x368.png',
  },
  {
    id: 2,
    title: 'Simple Mobile 4G LTE Prepaid Smartphone',
    price: '$220',
    image: 'https://placehold.co/500x368.png',
  },
  {
    id: 3,
    title: '4K UHD LED Smart TV with Chromecast Built-in',
    price: '$1,50',
    oldPrice: '$865',
    discount: '19% OFF',
    image: 'https://placehold.co/500x368.png',
  },
  {
    id: 4,
    title: 'Sony DSCHX8 High Zoom Point & Shoot Camera',
    price: '$1,200',
    image: 'https://placehold.co/500x368.png',
  },
  {
    id: 5,
    title: 'Dell Optiplex 7000x7480 All-in-One Computer Monitor',
    price: '$299',
    image: 'https://placehold.co/500x368.png',
  },
  {
    id: 6,
    title: 'Portable Wshing Machine, 11lbs capacity Model 18NMF1AM',
    price: '$70',
    oldPrice: '$865.99',
    image: 'https://placehold.co/500x368.png',
  },
  {
    id: 7,
    title: '2-Barrel Carburetor Carb 2100 Engine Increase Horsepower',
    price: '$160',
    tag: 'HOT',
    image: 'https://placehold.co/500x368.png',
  },
  {
    id: 8,
    title: 'JBL FLIP 4 - Waterproof Portable Bluetooth Speaker - Black',
    price: '$250',
    oldPrice: '$360',
    discount: '32% OFF',
    image: 'https://placehold.co/500x368.png',
  },
]

export default function Products() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="flex justify-between pb-6">
          <article className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">Best Deals</h1>
            <p className="ml-3">Deals ends in</p>
            <Timer />
          </article>
          <Button className="flex items-center gap-2">
            Browse All Product{' '}
            <span>
              <ArrowRight></ArrowRight>
            </span>
          </Button>
        </div>
        <div className="grid gap-0 lg:grid-cols-5">
          <Card className="relative rounded-none border p-0 shadow-none">
            <CardContent className="relative h-full p-5">
              <div className="flex gap-2">
                <Badge className="bg-yellow-400 text-xs font-semibold text-black">32% OFF</Badge>
                <Badge className="bg-danger text-xs font-semibold text-white">HOT</Badge>
              </div>

              <div className="mt-4 flex items-center justify-center">
                <Image
                  src="https://placehold.co/380x400.png"
                  alt="Xbox Series S"
                  width={300}
                  height={300}
                  className="max-w-48 object-contain lg:max-w-sm"
                />
              </div>

              <div className="mt-2 flex items-center gap-1 text-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-1 text-sm">(52,677)</span>
              </div>

              <h3 className="mt-1.5 text-base font-normal">
                Xbox Series S - 512GB SSD Console with Wireless Controller - EU Version
              </h3>

              <div className="mt-3">
                <span className="text-base font-normal text-gray-400">$865.99</span>
                <span className="ml-2 text-lg font-normal text-blue-600">$442.12</span>
              </div>

              <p className="mt-3 text-sm leading-snug font-normal">
                Games built using the Xbox Series X|S development kit showcase unparalleled load
                times and visuals.
              </p>

              <div className="mt-5 flex items-center gap-2">
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

          <div className="grid grid-cols-1 gap-0 md:col-span-2 md:grid-cols-2 lg:col-span-4 lg:grid-cols-4">
            {products.map((item) => (
              <Card
                key={item.id}
                className="group flex flex-col justify-between rounded-none border p-0 shadow-none"
              >
                <CardContent className="flex flex-grow flex-col p-3">
                  <div className="relative flex h-52 w-full items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />

                    {item.status && (
                      <Badge className="absolute top-2 left-2 bg-gray-700 text-white">
                        {item.status}
                      </Badge>
                    )}
                    {item.discount && (
                      <Badge className="absolute top-2 left-2 bg-yellow-400 text-black">
                        {item.discount}
                      </Badge>
                    )}
                    {item.tag && (
                      <Badge className="absolute top-2 left-2 bg-red-600 text-white">
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

                  <p className="mt-3 line-clamp-2 text-sm">{item.title}</p>

                  <div className="mt-auto py-2">
                    <span className="font-semibold">{item.price}</span>
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
    </section>
  )
}
