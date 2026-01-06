'use client'

import React from 'react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, ShoppingBag, Heart, Clock } from 'lucide-react'
import Link from 'next/link'
import { Avatar } from '@/components/ui/avatar'

export default function DashboardPage() {
<<<<<<< HEAD
  const user = {
    name: 'Demo User',
    email: 'demo@fayrashop.com',
    phone: '+8801000000000',
    image: '',
  }

  const billingAddress = {
    id: 'demo-address',
    first_name: 'Demo',
    last_name: 'Customer',
    company_name: null,
    address: '123 Demo Street',
    country: 'Bangladesh',
    state: 'Dhaka',
    city: 'Dhaka',
    zip_code: '1207',
    email: 'demo@fayrashop.com',
    phone_number: '+8801000000000',
    type: 'billing',
=======
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
>>>>>>> 2517b1d8aab55f474eff4e4195ee771e9277985f
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hello, {user?.name || 'User'}</h1>
        <p className="text-muted-foreground max-w-lg text-sm">
          Welcome back, {user?.name || 'User'}! From your account dashboard. you can easily check &
          view your <span className="text-primary font-semibold">Recent Orders</span>, manage your{' '}
          <span className="text-primary font-semibold">Shipping and Billing Addresses</span> and
          edit your <span className="text-primary font-semibold">Password and Account Details</span>
          .
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
            <CardTitle className="text-xs font-bold tracking-tight uppercase">
              Account Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6 text-sm">
            <div className="flex items-center gap-4">
              <div className="ring-primary/10 h-16 w-16 shrink-0 overflow-hidden rounded-full ring-1">
                <Avatar
                  src={(user as any)?.image || ''}
                  alt={user?.name || 'User'}
                  className="size-full object-cover *:size-full"
                />
              </div>
              <div>
                <h4 className="text-base leading-tight font-bold">{user?.name}</h4>
                <p className="text-muted-foreground text-xs font-medium">
                  {billingAddress
                    ? `${billingAddress.city}${billingAddress.zip_code ? ` - ${billingAddress.zip_code}` : ''}, ${billingAddress.country || 'Bangladesh'}`
                    : 'Set your location in profile'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-muted-foreground min-w-[70px]">Email:</span>
                <span className="truncate font-medium">{user?.email}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground min-w-[70px]">Phone:</span>
                <span className="font-medium">{user?.phone || 'Not provided'}</span>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              className="text-primary hover:bg-primary border-primary/20 h-10 px-6 font-bold uppercase transition-colors hover:text-white"
            >
              <Link href="/user/profile">Edit Account</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Billing Address Card */}
        <Card className="shadow-sm">
          <CardHeader className="border-b px-6 py-4">
            <CardTitle className="text-xs font-bold tracking-tight uppercase">
              Billing Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6 text-sm">
            <>
              <div className="space-y-1">
                <h4 className="text-base leading-tight font-bold">
                  {billingAddress.first_name} {billingAddress.last_name}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {billingAddress.address}, {billingAddress.state}, {billingAddress.city} -{' '}
                  {billingAddress.zip_code}, {billingAddress.country}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="text-muted-foreground min-w-[100px]">Phone Number:</span>
                  <span className="font-medium">{billingAddress.phone_number}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-muted-foreground min-w-[100px]">Email:</span>
                  <span className="truncate font-medium">{billingAddress.email || user.email}</span>
                </div>
              </div>
            </>

            <Button
              asChild
              variant="outline"
              className="text-primary hover:bg-primary border-primary/20 h-10 px-6 font-bold uppercase transition-colors hover:text-white"
            >
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
                  <p className="cursor-pointer text-sm font-medium hover:underline">{order.item}</p>
                  <p className="text-muted-foreground text-xs">
                    {order.id} • {order.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{order.price}</p>
                  <p
                    className={`text-xs font-semibold ${order.status === 'Processing' ? 'text-primary' : 'text-green-600'}`}
                  >
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
