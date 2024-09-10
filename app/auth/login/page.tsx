import React from 'react'
import { LogoImage } from '@/public/'
import Image from 'next/image'

const page = () => {
    return (
        <div className='flex flex-col items-center h-screen'>
            <Image className='mt-48' src={LogoImage} alt="logo" width={100} height={100} />
            <h1 className='text-2xl font-bold'>ログイン</h1>
        </div>
    )
}

export default page