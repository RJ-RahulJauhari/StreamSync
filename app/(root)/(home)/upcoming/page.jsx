import CallList from '@/components/CallList'
import React from 'react'

const page = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
        Upcoming Meetings
        <CallList type="upcoming"></CallList>
      </h1>
    </section>
  )
}

export default page
