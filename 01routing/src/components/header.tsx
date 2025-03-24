import React from "react";
import Link from "next/link";
const NavbarPage = () => {
    return(
        <div className="absolute z-10 text-white w-full">
    <nav className="container flex item-center justify-between mx-auto h-18">
    <Link href="/"><h1 className="font-bold text-xl">Home</h1></Link>
    <div className="flex gap-2">
    <Link href="/perfomance">Performance</Link>
    <Link href="/reliability">Reliability</Link>
    </div>
    </nav>
        </div>

    )
}
export default NavbarPage;