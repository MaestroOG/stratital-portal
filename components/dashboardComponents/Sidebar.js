"use client";
import { ClipboardCheck, FolderCog, House, Settings, User, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddProjectButton from "../add-project-btn";

const Sidebar = () => {

    const pathname = usePathname();

    const links = [
        {
            icon: <House />,
            title: "Dashboard",
            href: '/'
        },
        {
            icon: <FolderCog />,
            title: "Project",
            href: '/projects'
        },
        {
            icon: <ClipboardCheck />,
            title: "Free Audit",
            href: '/audits'
        },
    ]
    return (
        <aside className="max-w-3xs w-3xs h-screen bg-dark-blue fixed top-0 left-0 flex flex-col items-center p-5">
            <Link href={'/'} className="relative w-60 h-32 mb-8">
                <Image
                    src="/logo.png"
                    alt="Stratital"
                    fill
                    className="object-contain"
                />
            </Link>

            <AddProjectButton href={'/projects/new-project'} className={'w-full'} />

            <div className="sidebar-menu">
                {links.map((link, i) => (
                    <Link key={i} href={link.href} className={`${pathname === link.href && 'bg-red'} sidebar-link`}>
                        <div className="flex items-center gap-2 text-white">
                            {link.icon}
                            <span className="text-white text-lg font-bold">{link.title}</span>
                        </div>
                    </Link>
                ))}
            </div>

            <button className="max-w-3xs p-4 rounded-sm flex items-center gap-2 justify-center bg-red text-white fixed bottom-5 cursor-pointer">
                <Settings size={"32px"} />
                <span className="text-white text-lg font-semibold">Profile Setting</span>
            </button>
        </aside>
    );
};

export default Sidebar;
