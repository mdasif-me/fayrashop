import React from 'react'
const topics = [
  [
    'How do I return my item?',
    "What is Clicon's Returns Policy?",
    'How long is the refund process?',
  ],
  [
    "What are the 'Delivery Timelines'?",
    "What is 'Discover Your Daraz Campaign 2022'?",
    'What is the Voucher & Gift Offer in this Campaign?',
  ],
  [
    'How to cancel Clicon Order.',
    'Ask the Digital and Device Community',
    'How to change my shop name?',
  ],
]
function PopularTopics() {
  return (
    <section>
      <div className="container mx-auto px-6 py-16">
        <h2 className="mb-8 text-center text-xl font-semibold">Popular Topics</h2>
        <div className="mx-auto grid max-w-7xl grid-cols-1 justify-center gap-6 md:grid-cols-3">
          {topics.map((column, colIndex) => (
            <ul key={colIndex} className="space-y-2 text-sm">
              {column.map((item, idx) => (
                <li
                  key={idx}
                  className="hover:text-primary cursor-pointer list-inside list-disc transition-all hover:underline"
                >
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularTopics
