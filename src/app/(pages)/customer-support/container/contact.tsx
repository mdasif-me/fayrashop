import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, MessageCircle, ArrowRight } from 'lucide-react'

function Contact() {
  return (
    <section className="mx-auto w-full max-w-6xl py-16">
      <div className="container mx-auto flex flex-col items-center gap-6 text-center">
        <Button className="rounded-full px-6 text-sm tracking-wide uppercase">Contact Us</Button>
        <h2 className="text-2xl font-semibold">
          Don’t find your answer.
          <br />
          Contact with us
        </h2>

        <div className="mt-8 grid w-full gap-6 md:grid-cols-2">
          {/* Call card */}
          <Card className="rounded-lg p-8 shadow-sm">
            <CardContent className="flex items-start gap-4 p-0">
              <div className="flex h-14 w-14 items-center justify-center rounded bg-blue-100">
                <Phone className="text-primary h-7 w-7" />
              </div>
              <div className="text-left">
                <h3 className="mb-1 text-lg font-semibold">Call us now</h3>
                <p className="mb-2 text-sm">
                  We are available online from 9:00 AM to 5:00 PM (GMT+6). Talk with us now
                </p>
                <p className="mb-4 text-2xl">+1-202-555-0126</p>
                <Button className="flex rounded px-6 text-sm">
                  Call Now
                  <p>
                    <ArrowRight />
                  </p>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Chat card */}
          <Card className="rounded-lg p-8 shadow-sm">
            <CardContent className="flex items-start gap-4 p-0">
              <div className="flex h-14 w-14 items-center justify-center rounded bg-green-100">
                <MessageCircle className="h-7 w-7 text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="mb-1 text-lg font-semibold">Chat with us</h3>
                <p className="mb-2 text-sm">
                  We are available online from 9:00 AM to 5:00 PM (GMT+6). Talk with us now
                </p>
                <p className="mb-4 text-2xl">Support@clicon.com</p>
                <Button className="flex rounded bg-green-500 px-6 text-sm hover:bg-green-600">
                  Contact Us
                  <p>
                    <ArrowRight />
                  </p>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Contact
