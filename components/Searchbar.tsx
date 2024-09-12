"use client";

import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import { useSearchContext } from '@/feature/recipes'

const Searchbar: React.FC = () => {

    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter()
    const { setSearchQuery } = useSearchContext()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const query = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
        setSearchQuery(query);
        router.push(`/recipes/search?query=${encodeURIComponent(query)}`);
        console.log(query)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = e.currentTarget.value;
            setSearchQuery(query);
            router.push(`/recipes/search?query=${encodeURIComponent(query)}`);
        }
    }

    return (
        <label htmlFor="search" className="relative w-full">
            <form onSubmit={handleSubmit} >
                <input
                    type="text"
                    name="search"
                    placeholder="材料、道具、料理名で検索"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={handleKeyPress}
                />
                <BiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl ${isFocused ? 'text-blue-500' : ''}`} />
                {
                    isFocused && (
                        <div className="left-0 top-0 w-full h-full bg-white" >
                            <h1>絞り込み</h1>
                            <div>
                                <h2>材料</h2>
                                <div>
                                    <input type="text" placeholder="材料を入力" />
                                </div>
                            </div>
                        </div>
                    )
                }
            </form>
        </label>
    )
}

export default Searchbar