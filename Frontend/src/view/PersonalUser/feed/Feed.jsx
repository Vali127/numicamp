

import { FeedsViewModel } from '../../../viewmodel/main/FeedsViewModel'
import { FeedVM } from '../../../viewmodel/main/FeedVM'
import Comments from './Comments'

const Feed = ( {date, title, description, illustration, owner, postId, feedOf} ) => {
    const {
        editor,
        Follow,
        Unfollow,
        followState,
        org,
        commentSectionShown,
        setCommentSectionShown
    } = FeedVM(owner, feedOf)

    console.log("is organisation : ", org)

  return (
    <div className='w-full h-auto px-3 flex flex-col rounded-2xl bg-white card_feed-shadow py-2 mb-3c text-justify' >
        
        
        <div  className='h-16 flex justify-between items-center border-b border-b-gray-800/8'>
            
                <div className='flex gap-2'>
                    <div className='h-12 w-12 rounded-full bg-gray-600 overflow-hidden flex justify-center items-center'>
                        <img src={editor.photo_profil} alt="img" className='w-12 h-12' id={editor.id_profil}  />
                    </div>
                    <div className='flexflex-col'>
                        <div className='font-bold text-slate-600' id={owner} >{ editor.nom_organisation || editor.nom_personne } { (editor.prenom_personne) && editor.prenom_personne }<b className='text-[12px] text-green-400' >[ {editor.nom_profil} ]</b> </div>
                        <div className='text-[12px] text-gray-500' >{date}</div>
                    </div>
                </div>
            
            <div>
                {  (org) && (followState === "followed") &&  <button id={owner} onClick={(e) => { Unfollow({ org_id : e.target.id }) }} className='rounded-lg bg-slate-800 text-white p-2 text-[14px] font-bold' > ne plus suivre </button> }
                { (org) && (followState === "unfollowed") &&  <button id={owner} onClick={(e) => { Follow({ org_id : e.target.id }) }} className='rounded-lg bg-green-700 text-white p-2 text-[14px] font-bold' > suivre </button> }
                { (org) && (followState === "error") &&  <button className='rounded-lg bg-red-800 text-white p-2 text-[14px] font-bold' > erreur </button> }
            </div>
        </div>


        <div className='border-b border-b-gray-800/8 py-3' >
            
            <div className='font-bold text-lg'>{title}</div>
            
            <div className='font-light text-[14px]' >
                {description}
            </div>

            <div className='h-120 bg-slate-700/25 flex justify-around overflow-hidden rounded-lg' >
                    <img src={illustration} className='h-full w-auto' alt="image" />
            </div>
        </div>

        
        <div className='w-full flex justify-end pt-2' >
            <button className='px-2 py-1 rounded-lg border border-gray-600' onClick={() => { setCommentSectionShown(true) } } > commenter </button>
        </div>
        { commentSectionShown && <Comments open={setCommentSectionShown} postId={postId} /> }

    </div>
  )
}

export default Feed