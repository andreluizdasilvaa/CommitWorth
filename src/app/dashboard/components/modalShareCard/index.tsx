"use client"

import { LinkedinIcon, TwitterIcon, FacebookIcon, } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react';

export function ModalShareCard({ setShowModal, nickname }: {
    setShowModal: Dispatch<SetStateAction<boolean>>
    nickname: string
}) {
    const hostUrl = `${process.env.NEXT_PUBLIC_HOST_URL}`;
    const profileUrl = `${hostUrl}/dashboard/${nickname}`;

    const encodedUrl = encodeURIComponent(profileUrl);
    const text = encodeURIComponent(`Veja ${nickname} na CommitWorth`);

    const shareLinks = {
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        whatsapp: `https://api.whatsapp.com/send?text=${text}%20${encodedUrl}`,
        telegram: `https://t.me/share/url?url=${encodedUrl}&text=${text}`
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)}></div>

            <div className="relative mx-4 bg-primaryblue w-fit max-w-2xl rounded-xl shadow-lg p-6 z-50">
                <h1 className="text-primarybege text-center font-inter text-4xl font-bold">
                    Compartilhe seu <span className="bg-gradient-to-r from-secondarypurple to-secondarygreen bg-clip-text text-transparent font-bold">card</span> em suas redes sociais!
                </h1>
                <p className='text-center text-primarylightblue mt-2'>Mostre para as pessoas o quanto você já agregou com suas contribuições</p>

                <div className="flex flex-wrap justify-center gap-4 mt-10">
                    <a 
                        className='rounded-full flex items-center gap-2 bg-[#0E76A8] text-white font-bold text-2xl p-5'
                        href={shareLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Compartilhar no LinkedIn"
                    >
                        <LinkedinIcon size={24} color='#fff' />
                    </a>

                    <a
                        className='rounded-full flex items-center gap-2 bg-[#1DA1F2] text-white font-bold text-2xl p-5'
                        href={shareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Compartilhar no Twitter"
                    >
                        <TwitterIcon size={24} color='#fff' />
                    </a>

                    <a
                        className='rounded-full flex items-center gap-2 bg-[#1877F2] text-white font-bold text-2xl p-5'
                        href={shareLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Compartilhar no Facebook"
                    >
                        <FacebookIcon size={24} color='#fff' />
                    </a>

                    <a
                        className='rounded-full flex items-center gap-2 bg-[#25D366] text-white font-bold text-2xl p-5'
                        href={shareLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Compartilhar no WhatsApp"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"/></svg>
                    </a>

                    <a
                        className='rounded-full flex items-center gap-2 bg-[#0088cc] text-white font-bold text-2xl p-5'
                        href={shareLinks.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Compartilhar no Telegram"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M19.777 4.43a1.5 1.5 0 0 1 2.062 1.626l-2.268 13.757c-.22 1.327-1.676 2.088-2.893 1.427c-1.018-.553-2.53-1.405-3.89-2.294c-.68-.445-2.763-1.87-2.507-2.884c.22-.867 3.72-4.125 5.72-6.062c.785-.761.427-1.2-.5-.5c-2.302 1.738-5.998 4.381-7.22 5.125c-1.078.656-1.64.768-2.312.656c-1.226-.204-2.363-.52-3.291-.905c-1.254-.52-1.193-2.244-.001-2.746z"/></g></svg>
                    </a>
                </div>
            </div>
        </div>
    )
}
