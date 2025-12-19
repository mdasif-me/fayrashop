'use client'
import * as React from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel'

/**
 * Hero is a hero section for the home.
 * It contains a carousel of sales, a section for the top product of the summer, and a section for recommended products.
 * @returns {React.ReactElement} A hero section with a carousel and a couple of cards.
 */
export default function Hero(): React.ReactElement {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const slides = [
    {
      title: 'Xbox Consoles',
      subtitle: 'THE BEST PLACE TO PLAY',
      description: 'Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.',
      price: '$299',
      button: 'SHOP NOW →',
      image: 'https://placehold.co/408x368.png',
    },
    {
      title: 'PlayStation 5',
      subtitle: 'NEXT-GEN EXPERIENCE',
      description: 'Enjoy blazing-fast load times and stunning graphics with PS5 exclusives.',
      price: '$499',
      button: 'SHOP NOW →',
      image: 'https://placehold.co/408x368.png',
    },
    {
      title: 'PlayStation 5',
      subtitle: 'NEXT-GEN EXPERIENCE',
      description: 'Enjoy blazing-fast load times and stunning graphics with PS5 exclusives.',
      price: '$499',
      button: 'SHOP NOW →',
      image: 'https://placehold.co/408x368.png',
    },
  ]

  return (
    <section className="w-full py-6">
      <div className="container mx-auto grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="md:col-span-2">
          <Carousel
            plugins={[plugin.current]}
            setApi={setApi}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={index}>
                  <Card className="gap-0 overflow-hidden rounded-lg border px-5 shadow-sm lg:px-10 lg:py-0 lg:pt-10">
                    <CardContent className="relative flex flex-col-reverse items-center justify-between p-0 md:flex-row">
                      <div className="flex-1 space-y-3 text-center md:text-left">
                        <p className="hidden text-xs tracking-widest text-sky-500 lg:block">
                          {slide.subtitle}
                        </p>
                        <h2 className="text-4xl font-semibold lg:text-5xl">{slide.title}</h2>
                        <p className="max-w-xs text-sm lg:max-w-sm lg:text-base">
                          {slide.description}
                        </p>
                        <Button className="bg-primary mt-4 rounded px-6 py-6">
                          {slide.button}
                        </Button>
                      </div>

                      <div className="relative flex flex-1 items-center justify-end">
                        <div className="absolute top-0 right-0 rounded-full border-4 bg-sky-500 px-2 py-3.5 text-lg font-semibold text-white lg:px-5 lg:py-6">
                          {slide.price}
                        </div>
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          width={400}
                          height={400}
                          className="max-w-52 object-contain lg:max-w-sm"
                        />
                      </div>
                    </CardContent>

                    <div className="my-6 flex justify-center space-x-2 lg:my-5.5 lg:justify-start lg:pt-0">
                      {Array.from({ length: count }).map((_, index) => (
                        <Button
                          key={index}
                          onClick={() => api?.scrollTo(index)}
                          className={`h-2! w-2! rounded-full transition-all ${
                            current === index ? 'bg-primary' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="relative overflow-hidden rounded-lg bg-black/90 py-0 shadow-sm">
            <CardContent className="flex items-center justify-between px-0 pt-6">
              <div className="ps-4 md:ps-10">
                <p className="text-xs font-semibold text-yellow-400">SUMMER SALES</p>
                <h3 className="mt-1 text-lg font-semibold text-white md:text-2xl">
                  New Google Pixel 6 Pro
                </h3>
                <Button className="bg-primary mt-4 rounded px-4 py-5">SHOP NOW →</Button>
              </div>
              <div className="relative">
                <span className="absolute -top-2 right-10 rounded bg-yellow-400 px-2 py-1 text-sm font-semibold text-black">
                  29% OFF
                </span>
                <Image
                  src="https://placehold.co/408x368.png"
                  alt="Pixel 6 Pro"
                  width={200}
                  height={200}
                  className="w-40 max-w-50 object-contain lg:w-full"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="relative rounded-lg border p-0 shadow-sm">
            <CardContent className="flex items-center justify-center gap-5 px-0 pt-6 md:px-6">
              <Image
                src="https://placehold.co/408x368.png"
                alt="FlipBuds Pro"
                width={200}
                height={200}
                className="w-40 max-w-50 object-contain lg:w-full"
              />
              <div>
                <h3 className="text-lg font-semibold md:text-2xl">Xiaomi FlipBuds Pro</h3>
                <p className="mt-1 text-sm font-semibold text-sky-500">$299 USD</p>
                <Button className="bg-primary mt-4 rounded px-4 py-5">SHOP NOW →</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
