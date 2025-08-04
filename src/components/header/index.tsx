"use client"

import React from 'react'
import Link from 'next/link'
import { Logo } from '../logo'
import { toast } from 'sonner'

export function Header({ isDashboard }: { isDashboard?: boolean }) {
    const [isVisible, setIsVisible] = React.useState(false)

    return (
        <>
            <header className='w-full flex items-center py-10 bg-transparent'>
                <div className='w-full flex items-center justify-between max-w-7xl mx-auto px-4'>
                    <Logo />

                    {!isDashboard && (
                        <>
                            <nav className='hidden sm:flex'>
                                <ul className='flex items-center text-secondarygray font-bold gap-6'>
                                    <li>
                                        <Link onClick={() => toast.message("Ainda em desenvolvimento 😅")} className='hover:text-primarybege transition-all duration-75' href="#">
                                            Ranking
                                        </Link>
                                    </li>
                                    <li>
                                        <a className='hover:text-primarybege transition-all duration-75' target='_blank' href="https://www.linkedin.com/in/andr%C3%A9-luiz-da-silva/">
                                            Linkedin
                                        </a>
                                    </li>
                                    <li>
                                        <a className='hover:text-primarybege transition-all duration-75' target='_blank' href="https://github.com/andreluizdasilvaa/CommitWorth">
                                            Github
                                        </a>
                                    </li>
                                </ul>
                            </nav>

                        
                            <label className='sm:hidden'>
                                <div
                                    className="w-9 h-10 cursor-pointer flex flex-col items-center justify-center"
                                >
                                    <input 
                                        type="checkbox"
                                        onClick={() => setIsVisible(value => !value)}
                                        className='sm:hidden hidden peer'
                                    />
                                    <div
                                        className="w-[50%] h-[2px] bg-white rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]"
                                    ></div>
                                    <div
                                        className="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-center peer-checked:hidden"
                                    ></div>
                                    <div
                                        className="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]"
                                    ></div>
                                </div>
                            </label>
                        </>
                    )}
                </div>
            </header>

            {!isDashboard && (
                <div hidden={!isVisible} className='sm:hidden absolute w-full'>
                    <div className='bg-transparent border-primarybege mx-3 backdrop-blur-lg p-6 rounded-lg'>
                        <ul className='flex items-center text-secondarygray font-bold gap-6'>
                            <li>
                                <a onClick={() => toast.message("Ainda em desenvolvimento 😅")} className='hover:text-primarybege transition-all duration-75'>
                                    Ranking
                                </a>
                            </li>
                            <li>
                                <a className='hover:text-primarybege transition-all duration-75' target='_blank' href="https://www.linkedin.com/in/andr%C3%A9-luiz-da-silva/">
                                    Linkedin
                                </a>
                            </li>
                            <li>
                                <a className='hover:text-primarybege transition-all duration-75' target='_blank' href="https://github.com/andreluizdasilvaa/CommitWorth">
                                    Github
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
           
        </>
    )
}
