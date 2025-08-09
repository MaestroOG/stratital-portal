import { Bell, House, Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <header className='bg-dark-blue w-full px-8 py-9 flex items-center justify-between'>
            <div className='text-white flex items-center gap-2.5'>
                <House />
                <span className='text-xl font-medium'>Welcome To Stratital</span>
            </div>
            <div className='w-[645px] bg-white flex items-center rounded-sm'>
                <input type="text" placeholder='Search...' className='w-full border-none outline-none rounded-sm placeholder:text-sm placeholder:text-placeholder bg-white py-3 px-5' />
                <button className='w-14 h-full bg-red text-white flex items-center justify-center py-3 cursor-pointer rounded-tr-sm rounded-br-sm'>
                    <Search />
                </button>
            </div>
            <div className='flex items-center gap-4'>
                <Image src={'/usa.png'} width={32} height={32} alt='country_flag' className='cursor-pointer' />
                <Bell className='text-white cursor-pointer' />
                <Image src={'/avatar.png'} width={40} height={40} className='rounded-full cursor-pointer' alt='avatar' />
            </div>
        </header>
    )
}

export default Header