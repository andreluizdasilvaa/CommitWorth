"use client"

import { LinkedinIcon } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react';

export function ModalShareCard({ setShowModal, nickname }: {
    setShowModal: Dispatch<SetStateAction<boolean>>
    nickname: string
}) {
    const hostUrl = `${process.env.NEXT_PUBLIC_HOST_URL}`;
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${hostUrl}/dashboard/${nickname}`)}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)}></div>

            <div className="relative mx-4 bg-primaryblue w-full max-w-xl rounded-xl shadow-lg p-6 z-50">
                <h1 className="text-primarybege text-center font-inter text-4xl font-bold">Compatilher seu card no <span className="bg-gradient-to-r from-secondarypurple to-secondarygreen bg-clip-text text-transparent">Linkedin!</span></h1>
                <p className='text-center text-primarylightblue mt-2'>Mostre as pessoas o quanto você já agregou com suas contribuições</p>

                <a 
                    className='w-fit mx-auto rounded-full flex items-center gap-2 bg-[#0E76A8] text-white font-bold text-2xl px-6 py-3 mt-10 pulse-scale'
                    href={shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LinkedinIcon size={40} color='#fff' />
                    Compatilhar
                </a>
            </div>
        </div>
    )
}
