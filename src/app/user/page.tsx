'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Package, ShoppingBag, Heart, Clock } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, Kurt Cobain! Here's an overview of your account.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-muted-foreground text-xs">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Package className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-muted-foreground text-xs">Arriving soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wishlist</CardTitle>
            <Heart className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-muted-foreground text-xs">Items saved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-muted-foreground text-xs">Share your thoughts</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>You made 2 orders this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: '#ORD-7352',
                  item: 'Wireless Headphones',
                  date: 'Dec 15, 2025',
                  status: 'Delivered',
                  price: '$120.00',
                },
                {
                  id: '#ORD-7353',
                  item: 'Smart Watch Series 7',
                  date: 'Dec 12, 2025',
                  status: 'Processing',
                  price: '$350.00',
                },
                {
                  id: '#ORD-7354',
                  item: 'Gaming Mouse',
                  date: 'Nov 28, 2025',
                  status: 'Delivered',
                  price: '$45.00',
                },
              ].map((order, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="grid gap-1">
                    <p className="cursor-pointer text-sm font-medium hover:underline">
                      {order.item}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {order.id} • {order.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{order.price}</p>
                    <p
                      className={`text-xs ${order.status === 'Processing' ? 'text-blue-500' : 'text-green-500'}`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/orders"
              className={buttonVariants({
                variant: 'outline',
                className: 'mt-4 w-full justify-center',
              })}
            >
              View all orders
            </Link>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>My Address</CardTitle>
            <CardDescription>Your default shipping address.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-start justify-between">
                <h4 className="font-semibold">Home</h4>
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                  Default
                </span>
              </div>
              <p className="text-muted-foreground mb-1 text-sm">Kurt Cobain</p>
              <p className="text-muted-foreground mb-1 text-sm">123 Nirvana Street</p>
              <p className="text-muted-foreground mb-1 text-sm">Seattle, WA 98101</p>
              <p className="text-muted-foreground text-sm">United States</p>
              <p className="text-muted-foreground mt-2 text-sm">+1 (555) 000-0000</p>
            </div>
            <Button variant="outline" className="mt-4 w-full">
              Manage Addresses
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
