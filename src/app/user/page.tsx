'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Package, ShoppingBag, Heart, Clock, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/providers/auth-provider'
import { fetchClient } from '@/lib/api-config'
import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const [billingAddress, setBillingAddress] = useState<any>(null)
  const [loadingAddress, setLoadingAddress] = useState(false)

  useEffect(() => {
    const fetchAddress = async () => {
      setLoadingAddress(true)
      try {
        const response = await fetchClient('/v1/addresses')
        const addresses = response?.data || []
        if (addresses.length > 0) {
          setBillingAddress(addresses[0])
        }
      } catch (error) {
        console.error('Failed to fetch dashboard addresses', error)
      } finally {
        setLoadingAddress(false)
      }
    }
    if (user) fetchAddress()
  }, [user])

  if (authLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hello, {user?.name || 'User'}</h1>
        <p className="text-muted-foreground text-sm max-w-lg">
          Welcome back, {user?.name || 'User'}! From your account dashboard. you can easily check & view your <span className="font-semibold text-primary">Recent Orders</span>, manage your <span className="font-semibold text-primary">Shipping and Billing Addresses</span> and edit your <span className="font-semibold text-primary">Password and Account Details</span>.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Total Orders', val: '12', sub: '+2 from last month', icon: ShoppingBag },
          { title: 'Processing', val: '03', sub: 'Arriving soon', icon: Package },
          { title: 'Wishlist', val: '24', sub: 'Items saved', icon: Heart },
          { title: 'Pending Reviews', val: '05', sub: 'Share your thoughts', icon: Clock },
        ].map((item, id) => (
          <Card key={id} className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.val}</div>
              <p className="text-muted-foreground text-xs">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Account Info Card */}
        <Card className="shadow-sm">
          <CardHeader className="border-b px-6 py-4">
            <CardTitle className="text-xs font-bold uppercase tracking-tight">Account Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6 text-sm">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full ring-1 ring-primary/10">
                <Avatar src={user?.image || ''} alt={user?.name || 'User'} className="size-full *:size-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-base leading-tight">{user?.name}</h4>
                <p className="text-muted-foreground text-xs font-medium">
                  {billingAddress ? (
                    `${billingAddress.region}${billingAddress.zip_code ? ` - ${billingAddress.zip_code}` : ''}, ${billingAddress.country || 'Bangladesh'}`
                  ) : (
                    'Set your location in profile'
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-muted-foreground min-w-[70px]">Email:</span>
                <span className="font-medium truncate">{user?.email}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground min-w-[70px]">Phone:</span>
                <span className="font-medium">{user?.phone || 'Not provided'}</span>
              </div>
            </div>

            <Button asChild variant="outline" className="text-primary hover:text-white hover:bg-primary border-primary/20 h-10 px-6 font-bold uppercase transition-colors">
              <Link href="/user/profile">Edit Account</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Billing Address Card */}
        <Card className="shadow-sm">
          <CardHeader className="border-b px-6 py-4">
            <CardTitle className="text-xs font-bold uppercase tracking-tight">Billing Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6 text-sm">
            {loadingAddress ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : billingAddress ? (
              <>
                <div className="space-y-1">
                  <h4 className="font-bold text-base leading-tight">
                    {billingAddress.first_name} {billingAddress.last_name}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {billingAddress.address}, {billingAddress.state}, {billingAddress.region} - {billingAddress.zip_code}, {billingAddress.country}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground min-w-[100px]">Phone Number:</span>
                    <span className="font-medium">{billingAddress.phone}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground min-w-[100px]">Email:</span>
                    <span className="font-medium truncate">{billingAddress.email || user?.email}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-6 text-center text-muted-foreground">
                No billing address found.
              </div>
            )}

            <Button asChild variant="outline" className="text-primary hover:text-white hover:bg-primary border-primary/20 h-10 px-6 font-bold uppercase transition-colors">
              <Link href="/user/profile">Edit Address</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Section */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>You made 2 orders this month.</CardDescription>
          </div>
          <Link href="/orders" className="text-primary text-sm font-semibold hover:underline">
            View all orders
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: '#ORD-7352', item: 'Wireless Headphones', date: 'Dec 15, 2025', status: 'Delivered', price: '$120.00' },
              { id: '#ORD-7353', item: 'Smart Watch Series 7', date: 'Dec 12, 2025', status: 'Processing', price: '$350.00' },
              { id: '#ORD-7354', item: 'Gaming Mouse', date: 'Nov 28, 2025', status: 'Delivered', price: '$45.00' },
            ].map((order, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="grid gap-1">
                  <p className="cursor-pointer text-sm font-medium hover:underline">{order.item}</p>
                  <p className="text-muted-foreground text-xs">{order.id} • {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{order.price}</p>
                  <p className={`text-xs font-semibold ${order.status === 'Processing' ? 'text-primary' : 'text-green-600'}`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
