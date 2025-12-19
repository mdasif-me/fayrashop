import React from 'react'
import HelpCenter from './container/help-center'
import Assist from './container/assist'
import PopularTopics from './container/popular-topics'
import Contact from './container/contact'

function CustomerSupport() {
  return (
    <section className="py-16">
      <HelpCenter />
      <Assist />
      <PopularTopics />
      <Contact />
    </section>
  )
}

export default CustomerSupport
