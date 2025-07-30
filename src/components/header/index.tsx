import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Logo } from '../logo'

export function Header() {
    return (
        <header className='w-full flex items-center py-10 bg-transparent'>
            <div className='w-full flex items-center justify-between max-w-7xl mx-auto px-4'>
                <Logo />

                <nav className='hidden sm:flex'>
                    <ul className='flex items-center text-secondarygray font-bold gap-6'>
                        <li>
                            <Link className='hover:text-primarybege transition-all duration-75' href="/">
                                Ranking
                            </Link>
                        </li>
                        <li>
                            <Link className='hover:text-primarybege transition-all duration-75'  href="/">
                                Linkedin
                            </Link>
                        </li>
                        <li>
                            <Link className='hover:text-primarybege transition-all duration-75'  href="/">
                                Github
                            </Link>
                        </li>
                    </ul>
                </nav>

                <button className='flex sm:hidden'>
                    <Menu size={30} color='#fff' />
                </button>
            </div>
        </header>
    )
}