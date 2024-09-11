"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { LogoImage } from '@/public/'
import Link from 'next/link'
import { InputField, useRegister } from '@/feature/auth'

const Register = () => {

    const { username, setUsername, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, handleRegister, isLoading, error } = useRegister();

    return (
        <div className='flex flex-col items-center h-screen'>
            <Image className='mt-24' src={LogoImage} alt="logo" width={100} height={100} />
            <div className='mt-24 px-10'>
                <h1 className='text-xl font-bold text-center'>会員登録</h1>
                <form onSubmit={handleRegister}>
                    <div className='mt-10'>
                        <div className='mb-6'>
                            <InputField
                                label="ユーザー名"
                                placeholder="ユーザー名"
                                id="name"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='mb-6'>
                            <InputField
                                label="メールアドレス"
                                placeholder="メールアドレス"
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mb-6'>
                            <InputField
                                label="パスワード"
                                placeholder="パスワード"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='mb-6'>
                            <InputField
                                label="パスワード（確認）"
                                placeholder="パスワード（確認）"
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <button className='w-full bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit">{isLoading ? '登録中...' : '会員登録'}</button>
                        <Link href="/auth/login" className='text-center text-accent'>アカウントをお持ちの場合はこちら</Link>
                        {error && <p className='text-red-500'>{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register