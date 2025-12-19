'use client'
import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

function AboutBanner() {
  return (
    <section className="py-16">
      <div className="container mx-auto flex flex-col items-center justify-around gap-10 border-b pb-20 md:flex-row">
        {/* Left Side */}
        <div className="max-w-lg">
          <Button className="bg-primary mb-4 px-4 py-1 text-sm font-semibold text-white">
            WHO WE ARE
          </Button>

          <h2 className="mb-4 text-3xl font-semibold md:text-4xl dark:text-white">
            Kinbo - largest electronics retail shop in the world.
          </h2>

          <p className="mb-6 dark:text-gray-300">
            Pellentesque ultrices, dui vel hendrerit iaculis, ipsum velit vestibulum risus, ac
            tincidunt diam lectus id magna. Praesent maximus lobortis neque sit amet rhoncus. Nullam
            tempus lectus a dui aliquet, non ultricies nibh elementum. Nulla ac nulla dolor.
          </p>

          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <ul className="space-y-3">
                <li className="flex items-center gap-2 dark:text-gray-300">
                  <Check className="text-green-500" /> Great 24/7 customer services.
                </li>
                <li className="flex items-center gap-2 dark:text-gray-300">
                  <Check className="text-green-500" /> 600+ Dedicated employee.
                </li>
                <li className="flex items-center gap-2 dark:text-gray-300">
                  <Check className="text-green-500" /> 50+ Branches all over the world.
                </li>
                <li className="flex items-center gap-2 dark:text-gray-300">
                  <Check className="text-green-500" /> Over 1 Million Electronics Products
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Side Image */}
        <div className="flex justify-center">
          <Image
            src="https://placehold.co/600x500.png"
            alt="about us image"
            width={500}
            height={500}
            className="rounded object-contain"
          />
        </div>
      </div>
    </section>
  )
}

export default AboutBanner
