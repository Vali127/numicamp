import React, { useState } from 'react'
import globe from "../../../assets/images/globe.png"
import photo from "../../../assets/images/news.jpg"
import ShowMoreText from '../../../lib/show-more-text.jsx'
import { DateShortFormat } from '../../../utils/display.format'

const UniqueResource = ({illustration, title, description, date, favicon, link, domainName, source}) => {
    const [faviconError, setFaviconError] = useState(false)
    const [imageError, setImageError] = useState(false)

    const imageToDisplay = (!imageError && illustration) ? illustration : photo

    return (
        <div className='relative bg-white p-3 rounded-lg flex flex-col gap-2 mb-1 text-left bg-gradient-to-b from-gray-50/60 to-white shadow-lg border border-gray-200'>
            {/* Favicon en haut à gauche */}
            <div className='w-5 h-5 rounded-full flex items-center justify-center overflow-hidden absolute top-2 left-2 bg-white border border-neutral-200 z-5'>
                <img
                    src={!faviconError && favicon ? favicon : globe}
                    className='w-5 h-5 object-cover'
                    alt="fav"
                    onError={() => setFaviconError(true)}
                />
            </div>

            {/* Contenu principal */}
            <div className='flex flex-col gap-3 pl-7'>
                <div className='flex-1 flex flex-col gap-2'>
                    {/* Titre */}
                    <div className='font-bold text-base md:text-xl leading-tight break-words'>{title}</div>

                    {/* Date */}
                    <div className='flex items-center gap-1 text-gray-400 text-xs'>
                        <label className='icon_btn'>&#xE19A;</label>
                        <label>{DateShortFormat(date)}</label>
                    </div>
                </div>

                {/* Image avec gradient */}
                <div className='relative bg-neutral-300 w-full aspect-video rounded-md overflow-hidden flex-shrink-0'>
                    <img
                        src={imageToDisplay}
                        className='w-full h-full object-cover'
                        alt="illustration"
                        onError={() => setImageError(true)}
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent'></div>
                </div>
            </div>

            {/* Description en dessous */}
            <div className='text-justify font-light text-xs leading-relaxed px-1'>
                <ShowMoreText
                    lines={3}
                    textForMore="voir plus"
                    textForLess="voir moins"
                    anchorStyle="!font-bold !text-[12px] text-gray-500 cursor-pointer underline-none"
                    expanded={false}>
                    {description}
                </ShowMoreText>
            </div>

            {/* Footer avec source et bouton */}
            <div className='flex flex-col items-start justify-between gap-3 pt-2 border-t border-neutral-200'>
                <div className='flex flex-col gap-1 text-xs min-w-0 flex-1'>
                    <div className='font-semibold text-gray-700 break-words'>{source}</div>
                    <a
                        href={domainName}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='flex items-center gap-1 transition-colors break-all'>
                        <label className='icon_btn font-normal text-xs flex-shrink-0'>&#xE2E6;</label>
                        <span className='hover:underline truncate'>{domainName}</span>
                    </a>
                </div>

                {/* Bouton */}
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='bg-slate-600/0 !text-slate-600 px-2 py-1 rounded-2xl flex items-center gap-1 transition-colors duration-200 text-xs font-medium whitespace-nowrap flex-shrink-0'>
                    <label className='icon_btn text-violet-600'>&#xE0A8;</label>
                    <span className='text-violet-600'>Visiter l'article</span>
                </a>
            </div>
        </div>
    )
}

export default UniqueResource