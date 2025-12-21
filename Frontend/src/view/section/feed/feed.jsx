import { UniqueFeedVm } from '../../../viewmodel/feeds-vm/unique.feed.vm.js'
import Comments from './comments.jsx'
import ShowMoreText from 'react-show-more-text'
import { useGlobalUiContext } from '../../../context/ui.context.jsx'
import { useState } from 'react'
import { EllipsisVertical, Trash2 } from 'lucide-react'
import {FeedDeletionModal} from "./FeedDeletionModal.jsx";

const Feed = ( {date, title, description, illustration, owner, ownership, postId, feedOf} ) => {
    const {
        editor,
        Follow,
        Unfollow,
        followState,
        org,
        commentSectionShown,
        setCommentSectionShown,
        deletionModalVisibility,
        setDeletionModalVisibility,
    } = UniqueFeedVm(owner, feedOf)

    const {GoToProfile} = useGlobalUiContext()
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className='relative bg-white shadow-lg border border-gray-200 p-4 rounded-lg flex flex-col gap-3 mx-3 mb-3 text-left'>

            {/* Photo de profil en haut à gauche */}
            <div className='h-13 w-13 rounded-full bg-gray-600 overflow-hidden flex justify-center items-center absolute top-3 left-3 border-2 border-white shadow-md'>
                <img src={editor.photo_profil} alt="profil" className='w-full h-full object-cover' id={editor.id_profil} />
            </div>

            {/* Header avec nom et date */}
            <div className='flex items-center justify-between pl-15'>
                <div className='flex flex-col'>
                    <div className='font-bold text-slate-700 text-base'>
                        {editor.nom_organisation || editor.nom_personne} {editor.prenom_personne && editor.prenom_personne}
                        <span onClick={() => { GoToProfile(editor.id_profil) }} className='text-xs text-violet-600 font-semibold ml-2 cursor-pointer'>[{editor.nom_profil}]</span>
                    </div>
                    <div className='flex items-center gap-1 text-gray-400 text-sm'>
                        <label className='icon_btn'>&#xE19A;</label>
                        <label>{date}</label>
                    </div>
                </div>

                {/* Bouton Follow/Unfollow et Menu */}
                <div className='flex items-center gap-2'>
                    {(feedOf === "organisation") && (org) && (followState === "followed") && (
                        <button
                            id={owner}
                            onClick={async(e) => { await Unfollow({ org_id : e.currentTarget.id }) }}
                            className='bg-indigo-500 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors'>
                            <span className='icon_btn text-base'>&#xE0D4;</span>
                            <span>Ne plus suivre</span>
                        </button>
                    )}

                    {(feedOf === "organisation") && (org) && (followState === "unfollowed") && (
                        <button
                            id={owner}
                            onClick={async(e) => { await Follow({ org_id : e.currentTarget.id }) }}
                            className='bg-indigo-500 hover:bg-idigo-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors'>
                            <span className='icon_btn text-base'>&#xE5EA;</span>
                            <span>Suivre</span>
                        </button>
                    )}

                    {(feedOf === "organisation") && (org) && (followState === "error") && (
                        <button className='bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium'>
                            Erreur
                        </button>
                    )}

                    {/* Menu trois points */}
                    {
                        (ownership) &&
                        <div className='relative'>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                            <EllipsisVertical className='w-5 h-5 text-gray-600'/>
                        </button>

                        {menuOpen && (
                            <div
                                className='absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[150px] z-10'>
                                <button
                                    onClick={() => { setDeletionModalVisibility(true) }}
                                    className='w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors'>
                                    <Trash2 className='w-4 h-4'/>
                                    <span>Supprimer</span>
                                </button>
                            </div>
                        )}
                    </div>}
                </div>
            </div>

            {/* Titre */}
            <div className='font-bold text-xl leading-tight px-0'>{title}</div>

            {/* Description */}
            <div className='text-justify font-light text-sm leading-relaxed px-0'>
                <ShowMoreText
                    lines={3}
                    more="voir plus"
                    less="voir moins"
                    anchorClass="!font-bold !text-[14px] text-gray-500 cursor-pointer underline-none"
                    expanded={false}>
                    {description}
                </ShowMoreText>
            </div>

            {/* Image avec gradient en grand format */}
            <div className='relative bg-neutral-300 h-80 w-full rounded-md flex items-center justify-center overflow-hidden'>
                <img src={illustration} className='h-full w-full object-cover' alt="illustration" />
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent'></div>
            </div>

            {/* Footer avec bouton commenter */}
            <div className='flex justify-end pt-2 border-t border-neutral-200'>
                <button
                    className='bg-neutral-200 hover:bg-neutral-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium'
                    onClick={() => { setCommentSectionShown(true) }}>
                    <span className='icon_btn text-lg'>&#xE168;</span>
                    <span>Commenter</span>
                </button>
            </div>

            {/* Section commentaires */}
            {commentSectionShown && <Comments open={setCommentSectionShown} GoToProfile={GoToProfile} postId={postId} />}
            { deletionModalVisibility && <FeedDeletionModal postId={postId} setModalVisibility={setDeletionModalVisibility} /> }
        </div>
    )
}

export default Feed