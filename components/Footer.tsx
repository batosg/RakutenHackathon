import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LogoImage } from '@/public'

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/">
              <Image src={LogoImage} alt="Lifeline Recipe Logo" width={100} height={100} />
            </Link>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 mx-3 my-2">
              About Us
            </Link>
            <Link href="/recipes" className="text-gray-600 hover:text-gray-900 mx-3 my-2">
              Recipes
            </Link>
            <Link href="/tips" className="text-gray-600 hover:text-gray-900 mx-3 my-2">
              Tips
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 mx-3 my-2">
              Contact
            </Link>
          </nav>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Lifeline Recipe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer