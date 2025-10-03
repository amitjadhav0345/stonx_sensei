import React from 'react'
import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";

const Header = () => {
    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                    <Image src="/assets/icons/logo.svg" alt="Stonx_Sensei Logo" width={240} height={190} className="h-12 w-auto cursor-pointer" />
                    </Link>
                <nav className="hidden sm:block">
                   <NavItems />
                </nav>
                <UserDropdown />
            </div>
        </header>
    )
}
export default Header
