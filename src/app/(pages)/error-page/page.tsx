import React from 'react'
import Image from 'next/image'
import { ArrowLeft, House } from 'lucide-react'

function ErrorPage() {
  return (
    <section>
      <div className="container mx-auto flex flex-col items-center justify-center px-4 text-center">
        <Image
          src="https://placehold.co/500x500.png"
          alt="error page illustration"
          width={500}
          height={500}
          className="max-w-52 object-contain lg:max-w-sm"
        />
        <h1 className="mb-4 text-4xl font-semibold">404, Page not founds</h1>
        <p className="mb-8 max-w-md text-base">
          Something went wrong. It’s look that your requested could not be found. It’s look like the
          link is broken or the page is removed.
        </p>
        <div className="flex gap-4">
          <a
            href="/"
            className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded px-6 py-3 text-white uppercase"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </a>

          <a
            href="/"
            className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded px-6 py-3 text-white uppercase"
          >
            <House className="h-5 w-5" />
            Go To Home
          </a>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
