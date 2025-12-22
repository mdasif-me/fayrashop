'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Package, ShoppingBag, Heart, Clock } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/providers/auth-provider'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || 'User'}! Here's an overview of your account.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-muted-foreground text-xs">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Package className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-muted-foreground text-xs">Arriving soon</p>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wishlist</CardTitle>
            <Heart className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-muted-foreground text-xs">Items saved</p>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-md">
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
        <Card className="col-span-4 shadow-sm">
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
        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Your registered details.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/20 rounded-lg border p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Package className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Personal Info</h4>
                  <p className="text-muted-foreground text-xs">Managed in profile settings</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{user?.name || 'Not provided'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="ml-2 truncate font-medium">{user?.email || 'Not provided'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{user?.phone || 'Not provided'}</span>
                </div>
              </div>
            </div>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link href="/user/profile">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
