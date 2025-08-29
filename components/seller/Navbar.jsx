import React from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b'>
      <h1
        onClick={() => router.push("/")}
        className="text-2xl font-semibold cursor-pointer hover:text-orange-500 duration-300"
      >
        <span className="text-orange-600 font-bold">N</span>EXUS
      </h1>      <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar