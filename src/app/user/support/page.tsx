'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  LifeBuoy,
  MessageCircle,
  Mail,
  FileQuestion,
  Search,
  Book,
  CreditCard,
  Truck,
} from 'lucide-react'
import { Input } from '@/components/ui/field'

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold">How can we help you?</h1>
          <p className="mb-8 text-xl opacity-90">Search our help center or contact us directly.</p>
          <div className="relative mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full rounded-full py-4 pr-4 pl-12 text-gray-900 shadow-lg outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Links */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Truck, title: 'Order Tracking', description: 'Track your package status' },
            { icon: CreditCard, title: 'Payments', description: 'Manage billing & refunds' },
            { icon: Book, title: 'Product Guides', description: 'Learn how to use products' },
            { icon: FileQuestion, title: 'Returns', description: 'Return or exchange items' },
          ].map((item, i) => (
            <Card key={i} className="cursor-pointer transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                  <item.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* FAQ Section */}
          <div className="space-y-6 lg:col-span-2">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'How do I return an item?',
                  a: 'You can return items within 30 days of delivery. Visit your orders page to start a return.',
                },
                {
                  q: 'Where is my order?',
                  a: 'Check your order status in the Orders section within your dashboard.',
                },
                {
                  q: 'Do you ship internationally?',
                  a: 'Yes, we ship to over 100 countries. Shipping costs vary by location.',
                },
                {
                  q: 'How can I change my password?',
                  a: 'Go to Dashboard > Security to update your password.',
                },
              ].map((faq, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.q}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Options */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Contact Support</h2>
            <Card>
              <CardContent className="space-y-6 p-6">
                <div className="flex items-start gap-4">
                  <MessageCircle className="mt-1 h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Live Chat</h3>
                    <p className="text-muted-foreground mb-2 text-sm">
                      Chat with our support team in real-time.
                    </p>
                    <Button size="sm">Start Chat</Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-6 w-6 text-purple-600" />
                  <div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p className="text-muted-foreground mb-2 text-sm">
                      Get response within 24 hours.
                    </p>
                    <Button variant="outline" size="sm">
                      Send Email
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-4">
                  <LifeBuoy className="mt-1 h-6 w-6 text-orange-600" />
                  <div>
                    <h3 className="font-semibold">Help Center</h3>
                    <p className="text-muted-foreground mb-2 text-sm">
                      Browse extensive documentation.
                    </p>
                    <Button variant="outline" size="sm">
                      Visit Center
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function Separator() {
  return <div className="bg-border my-2 h-px w-full"></div>
}
