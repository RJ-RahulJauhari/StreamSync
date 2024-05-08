import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
  <nav className='flex-between fixed z-50 w-full bg-dark-1
  px-6 py-4 lg:px-10'>
    <Link href="/" className='flex items-center gap-1'>
      <Image src='/icons/side-text-logo.png' width={150} height={40} alt='Logo' className='max-sm:size-10'></Image>
      <p className='text-[26px] font-extrabold text-white max-sm:hidden'></p>
    </Link>
    <div className='flex-between gap-5'>
      {
        <SignedIn>
          <UserButton></UserButton>
        </SignedIn>
      }
      <MobileNav></MobileNav>
    </div>
  </nav>
  )
}

export default Navbar
