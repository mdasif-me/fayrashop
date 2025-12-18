'use client'

import React from 'react'
import Link from 'next/link'
import { IconCart } from '@intentui/icons'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/shop' },
      { name: 'Best Deals', href: '/offers' },
      { name: 'New Arrivals', href: '/shop' },
      { name: 'Featured Products', href: '/shop' },
    ],
    account: [
      { name: 'My Account', href: '/auth' },
      { name: 'Order History', href: '/orders' },
      { name: 'Shopping Cart', href: '/cart' },
      { name: 'Wishlist', href: '#' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Customer Support', href: '/customer-support' },
      { name: 'FAQs', href: '/customer-support' },
      { name: 'Shipping Info', href: '/customer-support' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms & Conditions', href: '/terms-condition' },
      { name: 'Return Policy', href: '/customer-support' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ]

  return (
    <footer className="mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <IconCart className="size-6 text-blue-500" />
              <span className="text-xl font-bold text-white">FayraShop</span>
            </Link>
            <p className="mb-4 text-sm">
              Your one-stop destination for quality products at amazing prices. Shop with
              confidence!
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-500" />
                <span>support@fayrashop.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href as any}
                    className="text-sm transition-colors hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">My Account</h4>
            <ul className="space-y-2">
              {footerLinks.account.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href as any}
                    className="text-sm transition-colors hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Customer Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href as any}
                    className="text-sm transition-colors hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href as any}
                    className="text-sm transition-colors hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm md:text-left">
              © {currentYear} FayraShop. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">We Accept:</span>
              <div className="flex gap-2">
                <div className="rounded px-2 py-1 text-xs font-bold">VISA</div>
                <div className="rounded px-2 py-1 text-xs font-bold">MC</div>
                <div className="rounded px-2 py-1 text-xs font-bold">AMEX</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
