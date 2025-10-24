'use client'

import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'

function TrustedShop() {
  return (
    <section className="bg-background">
      <div className="py-16">
        <div className="relative grid items-center gap-10">
          {/* RIGHT - Image with overlay text */}
          <div className="relative order-1 h-64 w-full overflow-hidden rounded-xl shadow-md md:order-2 md:h-96">
            <div className="relative h-64 w-full md:h-80 lg:h-96">
              <Image
                src="https://placehold.co/2000x400.png"
                alt="Trusted shop"
                fill
                className="max-w-max object-cover lg:max-w-full"
                sizes="100vw"
              />
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-10 lg:left-80 lg:px-0">
              <h2 className="max-w-72 text-2xl leading-tight font-semibold md:text-3xl">
                Your trusted and reliable retail shop
              </h2>
              <p className="mt-4 max-w-md text-sm md:text-base">
                Praesent sed semper metus. Nunc aliquet dolor mauris, et fringilla elit gravida
                eget. Nunc consequat auctor urna a placerat.
              </p>

              <div className="mt-6">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 h-14 w-14 rounded-full shadow-lg"
                  aria-label="Play video"
                >
                  <Play />
                </Button>
              </div>
            </div>
          </div>

          {/* LEFT - Empty space or optional text */}
          <div className="order-2 hidden md:block" />
        </div>
      </div>
    </section>
  )
}

export default TrustedShop
