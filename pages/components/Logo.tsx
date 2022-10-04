import Link from 'next/link'
import React from 'react'

export default function Logo() {
    return (
        <Link href={{
            pathname: '/',
        }}>
            <div className="w-full flex items-center justify-center md:block lg:block hover:cursor-pointer">
                <img src="/logo.png" alt="Evolve Training Logo" className="h-20 ml-2 mt-2" />
            </div>
        </Link>
    )
}
