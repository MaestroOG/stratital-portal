'use client';
import { Bell, House, Search } from 'lucide-react'
import Image from 'next/image'
import React, { useActionState, useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'
import { signOutUser } from '@/action/user';

const Header = () => {
    const [state, formAction, isPending] = useActionState(signOutUser, "")
    const [user, setUser] = useState(null);
    useEffect(() => {
        // Get "user" cookie value
        const cookieValue = document.cookie
            .split("; ")
            .find(row => row.startsWith("user="))
            ?.split("=")[1];

        if (cookieValue) {
            try {
                setUser(JSON.parse(decodeURIComponent(cookieValue)));
                console.log(JSON.parse(decodeURIComponent(cookieValue)))
            } catch (err) {
                console.error("Invalid user cookie", err);
            }
        }
    }, []);
    return (
        <header className='bg-dark-blue w-full px-8 py-9 flex items-center justify-between gap-4'>
            {/* <div className='text-white items-center gap-2.5 hidden lg:flex'>
                <House className='hidden lg:flex' />
                <span className='text-xl font-medium'>Welcome To Stratital</span>
            </div> */}
            <div className='max-w-[645px] w-full bg-white hidden md:flex items-center rounded-sm'>
                <input type="text" placeholder='Search...' className='w-full border-none outline-none rounded-sm placeholder:text-sm placeholder:text-placeholder bg-white py-3 px-5' />
                <button className='w-14 h-full bg-red text-white flex items-center justify-center py-3 cursor-pointer rounded-tr-sm rounded-br-sm'>
                    <Search />
                </button>
            </div>
            <div className='flex items-center gap-4'>
                <Image src={'/usa.png'} width={32} height={32} alt='country_flag' className='cursor-pointer' />
                <Bell className='text-white cursor-pointer' />
                <Popover>
                    <PopoverTrigger>
                        {user && <Image src={user?.avatar} width={40} height={40} className='rounded-full cursor-pointer' alt='avatar' />}
                    </PopoverTrigger>
                    <PopoverContent>
                        <form action={formAction}>
                            <Button disabled={isPending} type="submit" className={'w-full'}>Sign Out</Button>
                        </form>
                        {state && <span>{state}</span>}
                    </PopoverContent>
                </Popover>

            </div>
        </header>
    )
}

export default Header