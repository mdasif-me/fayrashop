import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'

export default function LargeProduct() {
  return (
    <section className="py-10">
      <div className="flex h-auto w-full flex-col items-center justify-around gap-5 rounded-xl bg-orange-300 shadow-sm lg:flex-row lg:gap-0">
        <div className="max-w-sm flex-1 pt-5 text-center text-black lg:pt-0 lg:text-left">
          <span className="inline-block rounded bg-blue-400 px-2 py-1 text-sm font-semibold text-white uppercase">
            SAVE UP TO $200.00
          </span>
          <h2 className="mt-3 text-5xl font-semibold">Macbook Pro</h2>
          <p className="mt-5 text-2xl">Apple M1 Max Chip. 32GB Unified Memory, 1TB SSD Storage</p>
          <Button className="mt-5 px-8 py-3 text-base font-bold">SHOP NOW →</Button>
        </div>

        <div className="relative inline-block">
          <Image
            src="https://placehold.co/536x424.png"
            alt="Macbook Pro"
            width={536}
            height={424}
            className="w-full object-contain"
          />

          <div className="absolute top-0 left-0 rounded-full border-4 border-white bg-sky-500 px-3 py-4.5 text-lg font-semibold text-white lg:top-10 lg:-left-10 lg:px-4 lg:py-5.5">
            5200
          </div>
        </div>
      </div>
    </section>
  )
}
