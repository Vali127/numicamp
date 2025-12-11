import React, { useState } from 'react'
import globe from "../../../assets/images/globe.png"
import ShowMoreText from 'react-show-more-text'
import { DateShortFormat } from '../../../utils/display.format'

const UniqueRessource = ({illustration, title, description, date, favicon, link, domainName, source}) => {
  const [faviconError, setFaviconError] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <div className='relative bg-white p-4 rounded-lg flex flex-col gap-3 mb-1 mx-3 text-left bg-gradient-to-b from-gray-50 to-white shadow-lg border border-gray-200'>
      {/* Favicon en haut à gauche */}
      <div className='w-6 h-6 rounded-full flex items-center justify-center overflow-hidden absolute top-2 left-2 bg-white border border-neutral-200'>
        <img 
          src={!faviconError && favicon ? favicon : globe} 
          className='w-6 h-6' 
          alt="fav"
          onError={() => setFaviconError(true)}
        />
      </div>

      {/* Contenu principal */}
      <div className='flex gap-4 pl-8'>
        <div className='flex-1 flex flex-col gap-2'>
          {/* Titre */}
          <div className='font-bold text-xl leading-tight'>{title}</div>
          
          {/* Date */}
          <div className='flex items-center gap-1 text-gray-400 text-sm'>
            <label className='icon_btn'>&#xE19A;</label>
            <label>{DateShortFormat(date)}</label>
          </div>
        </div>

        {/* Image avec gradient */}
        <div className='relative bg-neutral-300 h-32 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0'>
          {(!imageError && illustration) && 
            <img 
              src={illustration} 
              className='h-full w-full object-cover' 
              alt="illustration"
              onError={() => setImageError(true)}
            />
          }
          <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent'></div>
        </div>
      </div>

      {/* Description en dessous */}
      <div className='text-justify font-light text-sm leading-relaxed px-2'>
        <ShowMoreText
          lines={3}
          more="voir plus"
          less="voir moins"
          anchorClass="!font-bold !text-[14px] text-gray-500 cursor-pointer underline-none"
          expanded={false}>
          {description}
        </ShowMoreText>
      </div>

      {/* Footer avec source et bouton */}
      <div className='flex items-center justify-between pt-2 border-t border-neutral-200'>
        <div className='flex flex-col gap-1 text-sm'>
          <div className='font-semibold text-gray-700'>{source}</div>
          <a 
            href={domainName}
            target="_blank"
            rel="noopener noreferrer"
            className='flex items-center gap-1 transition-colors'>
            <label className='icon_btn font-normal text-xs'>&#xE2E6;</label>
            <span className='hover:underline'>{domainName}</span>
          </a>
        </div>

        {/* Bouton */}
        <a 
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className='bg-slate-600/0 !text-slate-600 px-2 py-1 rounded-2xl flex items-center gap-2 transition-colors duration-200 text-sm font-medium'>
          <label className='icon_btn text-violet-600'>&#xE0A8;</label>
          <span className='text-violet-600'>Visiter l'article</span>
        </a>
      </div>
    </div>
  )
}

export default UniqueRessource