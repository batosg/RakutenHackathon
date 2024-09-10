import Image from 'next/image'
import React from 'react'
import { LogoImage } from '@/public/'
import Link from 'next/link'

const Register = () => {
    return (
        <div className='flex flex-col items-center h-screen'>
            <Image className='mt-24' src={LogoImage} alt="logo" width={100} height={100} />
            <div className='mt-24 px-10'>
                <h1 className='text-xl font-bold text-center'>会員登録</h1>
                <div className='mt-10'>
                    <div className='mb-6'>
                        <label className='text-gray-700 text-sm font-bold mb-2' htmlFor="username">ユーザー名</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="username" type="text" placeholder="ユーザー名" />
                    </div>
                    <div className='mb-6'>
                        <label className='text-gray-700 text-sm font-bold mb-2' htmlFor="email">メールアドレス</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="email" type="email" placeholder="メールアドレス" />
                    </div>
                    <div className='mb-6'>
                        <label className='text-gray-700 text-sm font-bold mb-2' htmlFor="password">パスワード</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' id="password" type="password" placeholder="パスワード" />
                    </div>
                    <div className='mb-6'>
                        <label className='text-gray-700 text-sm font-bold mb-2' htmlFor="confirmPassword">パスワード（確認）</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' id="confirmPassword" type="password" placeholder="パスワード（確認）" />
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <button className='w-full bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="button">会員登録</button>
                    <Link href="/auth/login" className='text-center text-accent'>アカウントをお持ちの場合はこちら</Link>
                </div>
            </div>
        </div>
    )
}

export default Register