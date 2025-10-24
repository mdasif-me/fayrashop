'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

const teamMembers = [
  {
    name: 'Kevin Gilbert',
    role: 'Chief Executive Officer',
    img: '/team1.jpg',
  },
  {
    name: 'Kevin Gilbert',
    role: 'Assistant of CEO',
    img: '/team2.jpg',
  },
  {
    name: 'Kevin Gilbert',
    role: 'Head of Designer',
    img: '/team3.jpg',
  },
  {
    name: 'Kevin Gilbert',
    role: 'UX Designer',
    img: '/team4.jpg',
  },
  {
    name: 'Kevin Gilbert',
    role: 'Product Designer',
    img: '/team5.jpg',
  },
  {
    name: 'Kevin Gilbert',
    role: 'Head of Development',
    img: '/team6.jpg',
  },
  {
    name: 'Kevin Gilbert',
    role: 'Design Engineer',
    img: '/team7.jpg',
  },
  {
    name: 'Kevin Gilbert',
    role: 'UI Designer',
    img: '/team8.jpg',
  },
]

export default function TeamSection() {
  return (
    <section className="mx-auto max-w-7xl py-10">
      <div className="container mx-auto text-center">
        <h2 className="mb-12 text-2xl font-semibold">Our core team member</h2>

        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="w-[260px] border border-gray-200 py-0 text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className="h-14 w-14 overflow-hidden rounded-full">
                  <Image
                    src="https://placehold.co/64x64.png"
                    alt="member"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
