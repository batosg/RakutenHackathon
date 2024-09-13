'use client'

import Image from 'next/image'
import React from 'react'
import { LogoImage } from '@/public'
import { Searchbar } from '@/components'
import { useRouter } from 'next/navigation'

const Header: React.FC = () => {
    const router = useRouter();
    return (
        <div className="flex justify-center items-center mx-4 gap-4 my-4">
            <div className="flex relative w-20 aspect-square" onClick={() => router.push('/')}>
                <Image src={LogoImage} alt="Logo" layout="fill" objectFit='contain' />
            </div>
            <Searchbar />
        </div>
    )
}

export default Header