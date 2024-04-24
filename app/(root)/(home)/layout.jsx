import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const HomeLayout = ({children}) => {
  return (
    <main className='relative'>
        <Navbar></Navbar>

        <div className='flex'>
            <Sidebar></Sidebar>
            <section className='flex flex-col flex-1 min-h-screen px-6 pb-6 pt-24 max-md:pb-14 sm:px-14'>
                <div className='w-full'>
                    {children}
                </div>
            </section>

        </div>

    </main>
  )
}

export default HomeLayout
