import React from 'react'
import { Button } from '../../../../components/ui/button'
import { Card, CardContent } from '../../../../components/ui/card'
import Image from 'next/image'

function HelpCenter() {
  return (
    <section>
      <div className="container mx-auto flex flex-col items-center justify-around gap-10 border-b pb-2 md:flex-row">
        <div className="max-w-lg">
          <Button className="bg-primary mb-4 px-4 py-1 text-sm font-semibold text-white">
            WHO WE ARE
          </Button>

          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <h1 className="text-3xl font-semibold">How we can help you!</h1>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Image
            src="https://placehold.co/500x400.png"
            alt="about us image"
            width={400}
            height={400}
            className="rounded object-contain"
          />
        </div>
      </div>
    </section>
  )
}

export default HelpCenter
