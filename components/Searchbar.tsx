import React from 'react'
import { BiSearch } from 'react-icons/bi'

const Searchbar = () => {
    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder="材料、道具、料理名で検索"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>
    )
}

export default Searchbar