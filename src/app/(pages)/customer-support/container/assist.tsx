import React from 'react'
import { Card, CardContent } from '../../../../components/ui/card'
import {
  Calendar,
  CreditCard,
  KeyRound,
  Layers,
  ShoppingCart,
  Store,
  Truck,
  User,
} from 'lucide-react'
const services = [
  { icon: Truck, label: 'Track Order' },
  { icon: KeyRound, label: 'Reset Password' },
  { icon: CreditCard, label: 'Payment Option' },
  { icon: User, label: 'User & Account' },
  { icon: Layers, label: 'Wishlist & Compare' },
  { icon: Calendar, label: 'Shipping & Billing' },
  { icon: ShoppingCart, label: 'Shopping Cart & Wallet' },
  { icon: Store, label: 'Sell on Clicon' },
]
function Assist() {
  return (
    <section>
      <div className="container mx-auto border-b px-6 py-16 text-center">
        <h2 className="mb-10 text-2xl font-semibold">What can we assist you with today?</h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {services.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className="border-primary/50 hover:border-primary border transition-all"
              >
                <CardContent className="flex items-center justify-start gap-3 pl-6">
                  <div className="border-primary bg-primary rounded border p-2 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-medium">{item.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Assist
