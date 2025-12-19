'use client'

import React from 'react'
import AboutBanner from './container/about-banner'
import { Overall } from '../../../container'
import TeamMember from './container/team-member'
import TrustedShop from './container/trusted-shop'

function About() {
  return (
    <section className="">
      <AboutBanner />
      <TeamMember />
      <TrustedShop />
      <Overall />
    </section>
  )
}

export default About
