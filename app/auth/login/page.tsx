import React, { useState } from 'react'
import { LogoImage } from '@/public/'
import Image from 'next/image'

const page = () => {


    return (
        <div className='flex flex-col items-center h-screen'>
            <Image className='mt-24' src={LogoImage} alt="logo" width={100} height={100} />
            <div className='mt-24 px-10'>
                <h1 className='text-xl font-bold text-center'>ログイン</h1>
                <div className='mt-10'>
                    <div className='mb-6'>
                        <label className='text-gray-700 text-sm font-bold mb-2' htmlFor="username">ユーザーIDまたはメールアドレスを入力</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline' id="userid" type="text" placeholder="ユーザIDまたはメールアドレス" />
                    </div>
                    <div className='mb-6'>
                        <label className='text-gray-700 text-sm font-bold mb-2' htmlFor="password">パスワード</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-light focus:outline-none focus:shadow-outline' id="password" type="password" placeholder="パスワード" />
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <button className='w-full bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="button">ログイン</button>
                    <button className='w-full bg-white border border-accent text-accent font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="button">パスワードを忘れた</button>
                </div>
            </div>
        </div>
    )
}

export default page