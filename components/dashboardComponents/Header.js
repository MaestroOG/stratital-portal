'use client';
import { Bell, ClipboardCheck, FolderCog, House, Menu, Search, Settings, Shield, Video, X } from 'lucide-react'
import Image from 'next/image'
import React, { useActionState, useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'
import { signOutUser } from '@/action/user';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();

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

    const links = [
        {
            icon: <House />,
            title: "Dashboard",
            href: "/",
        },
        {
            icon: <FolderCog />,
            title: "Project",
            href: "/projects",
        },
        {
            icon: <ClipboardCheck />,
            title: "Website Audit",
            href: "/audits",
        },
        {
            icon: <Video />,
            title: "How-To Videos",
            href: "/how-to",
        },
        ...(user?.role === "superadmin"
            ? [
                {
                    icon: <Shield />,
                    title: "Admin Panel",
                    href: "/admin",
                },
            ]
            : []),
    ]
    return (
        <header className='bg-dark-blue w-full px-8 py-9 flex items-center justify-between gap-4 sticky top-0 z-50'>
            {/* <div className='text-white items-center gap-2.5 hidden lg:flex'>
                <House className='hidden lg:flex' />
                <span className='text-xl font-medium'>Welcome To Stratital</span>
            </div> */}
            <Drawer direction="left" >
                <DrawerTrigger className='md:hidden'><Menu className='text-white' size={23}></Menu></DrawerTrigger>
                <DrawerContent className={'bg-dark-blue'}>
                    <DrawerHeader>
                        <DrawerClose>
                            <X className='text-white' />
                        </DrawerClose>
                        <div className='mt-8'>
                            <DrawerClose asChild>
                                <Link href={'/projects/new-project'} className={`bg-white flex items-center gap-2.5 p-2 rounded-full cursor-pointer`}>
                                    <Image src={'/addIcon.png'} width={34} height={34} alt="Add_Icon" />
                                    <p className="font-medium text-sm">Create new project</p>
                                </Link>
                            </DrawerClose>

                            <div className="sidebar-menu">
                                {links.map((link, i) => (
                                    <DrawerClose asChild key={i}>
                                        <Link href={link.href} className={`${pathname === link.href && 'bg-red'} sidebar-link`}>
                                            <div className="flex items-center gap-2 text-white">
                                                {link.icon}
                                                <span className="text-white text-lg font-bold">{link.title}</span>
                                            </div>
                                        </Link>
                                    </DrawerClose>
                                ))}
                            </div>
                        </div>
                    </DrawerHeader>
                    <DrawerFooter className={'w-full'}>
                        <button className="max-sm:w-full max-w-3xs p-4 rounded-sm flex items-center gap-2 justify-center bg-red text-white fixed bottom-5 cursor-pointer">
                            <Settings size={"32px"} />
                            <span className="text-white text-lg font-semibold">Profile Setting</span>
                        </button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <div className='max-w-[645px] w-full bg-white hidden md:flex items-center rounded-sm'>
                <input type="text" placeholder='Search...' className='w-full border-none outline-none rounded-sm placeholder:text-sm placeholder:text-placeholder bg-white py-3 px-5' />
                <button className='w-14 h-full bg-red text-white flex items-center justify-center py-3 cursor-pointer rounded-tr-sm rounded-br-sm'>
                    <Search />
                </button>
            </div>
            <Link href={'/'} className='md:hidden'><Image src='/logo.png' alt="stratital logo" width={135} height={37} priority /></Link>
            <div className='flex items-center gap-4'>
                <Image src={'/australia.svg'} width={32} height={32} alt='country_flag' className='cursor-pointer hidden md:block' />
                <Bell className='text-white cursor-pointer hidden md:block' />
                <Popover>
                    <PopoverTrigger>
                        {user && <Image src={user?.avatar || 'placeholder-avatar.svg'} width={40} height={40} className='rounded-full cursor-pointer' alt='avatar' />}
                    </PopoverTrigger>
                    <PopoverContent>
                        <form action={formAction}>
                            <Button disabled={isPending} type="submit" className={'w-full'}>Sign Out</Button>
                        </form>
                        {state && <span>{state}</span>}
                    </PopoverContent>
                </Popover>

            </div>
        </header >
    )
}

export default Header