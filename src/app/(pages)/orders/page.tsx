'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Package, Truck, CheckCircle, XCircle, Eye, Download } from 'lucide-react'
import Image from 'next/image'

interface Order {
  id: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: {
    id: number
    name: string
    image: string
    quantity: number
    price: number
  }[]
}

const orders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-12-15',
    status: 'delivered',
    total: 599.98,
    items: [
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        quantity: 1,
        price: 299.99,
      },
      {
        id: 2,
        name: 'Smart Watch Series 7',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
        quantity: 1,
        price: 299.99,
      },
    ],
  },
  {
    id: 'ORD-2024-002',
    date: '2024-12-10',
    status: 'shipped',
    total: 1299.99,
    items: [
      {
        id: 3,
        name: '4K UHD LED Smart TV',
        image: 'https://placehold.co/300x300.png',
        quantity: 1,
        price: 1299.99,
      },
    ],
  },
  {
    id: 'ORD-2024-003',
    date: '2024-12-05',
    status: 'processing',
    total: 449.99,
    items: [
      {
        id: 4,
        name: 'Wireless Gaming Mouse',
        image: 'https://placehold.co/300x300.png',
        quantity: 2,
        price: 224.99,
      },
    ],
  },
]

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-gray-500', icon: Package },
  processing: { label: 'Processing', color: 'bg-blue-500', icon: Package },
  shipped: { label: 'Shipped', color: 'bg-purple-500', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-500', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-danger', icon: XCircle },
}

export default function OrdersPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')

  const filteredOrders =
    selectedFilter === 'all' ? orders : orders.filter((order) => order.status === selectedFilter)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">My Orders</h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((filter) => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter(filter)}
            className="whitespace-nowrap capitalize"
          >
            {filter === 'all'
              ? 'All Orders'
              : statusConfig[filter as keyof typeof statusConfig]?.label}
          </Button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <Card className="p-12 text-center">
            <Package className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-xl font-semibold">No orders found</h3>
            <p className="mb-6 text-gray-600">You haven't placed any orders yet.</p>
            <Button className="bg-primary">Start Shopping</Button>
          </Card>
        ) : (
          filteredOrders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon
            return (
              <Card key={order.id} className="overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4">
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <p className="text-sm">Order ID</p>
                      <p className="font-semibold">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm">Date</p>
                      <p className="font-semibold">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">Total</p>
                      <p className="text-primary font-semibold">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  <Badge
                    className={`${statusConfig[order.status].color} flex items-center gap-1 text-white`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {statusConfig[order.status].label}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <div className="mb-6 space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download Invoice
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="default" size="sm">
                        Buy Again
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
