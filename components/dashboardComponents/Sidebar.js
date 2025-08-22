"use client";
import { ClipboardCheck, FolderCog, House, Settings, Shield, User, Users, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddProjectButton from "../add-project-btn";
import { useEffect, useState } from "react";

const Sidebar = () => {

    const pathname = usePathname();
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
        <aside className="hidden md:flex w-[85px] md:w-3xs min-h-screen md:h-screen bg-dark-blue fixed inset-y-0 left-0 flex-col items-center p-5">
            <Link href={'/'} className="relative w-60 h-32 mb-8 hidden md:flex">
                <Image
                    src="/logo.png"
                    alt="Stratital"
                    fill
                    className="object-contain"
                />
            </Link>

            <AddProjectButton href={'/projects/new-project'} className={'md:w-full'} />

            <div className="sidebar-menu">
                {links.map((link, i) => {
                    const isActive =
                        pathname === link.href || pathname.startsWith(link.href + "/")
                    return (
                        <Link key={i} href={link.href} className={`${isActive ? "bg-red" : ""} sidebar-link`}>
                            <div className="flex items-center gap-2 text-white">
                                {link.icon}
                                <span className="text-white text-lg font-bold hidden md:block">{link.title}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>


            <Link href={'/profile'} className="max-w-3xs p-4 rounded-sm flex items-center gap-2 justify-center bg-red text-white fixed bottom-5 cursor-pointer">
                <Settings size={"32px"} />
                <span className="text-white text-lg font-semibold hidden md:block">Profile Setting</span>
            </Link>

        </aside>
    );
};

export default Sidebar;
