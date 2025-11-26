import { UniqueFeedVm } from '../../../viewmodel/feeds-vm/unique.feed.vm.js'
import Comments from './Comments.jsx'
import ShowMoreText from 'react-show-more-text'

const Feed = ( {date, title, description, illustration, owner, postId, feedOf} ) => {
    const {
        editor,
        Follow,
        Unfollow,
        followState,
        org,
        commentSectionShown,
        setCommentSectionShown
    } = UniqueFeedVm(owner, feedOf)

  return (
    <div className='w-full h-auto px-3 flex flex-col rounded-sm feed bg-white card_feed-shadow py-2 mb-3c text-justify' >
        
        
        <div  className='h-16 flex justify-between items-center border-b border-b-gray-800/8'>
            
                <div className='flex gap-2'>
                    <div className='h-12 w-12 rounded-full bg-gray-600 overflow-hidden flex justify-center items-center'>
                        <img src={editor.photo_profil} alt="img" className='w-12 h-12' id={editor.id_profil}  />
                    </div>
                    <div className='flexflex-col'>
                        <div className='font-bold text-slate-600' >{ editor.nom_organisation || editor.nom_personne } { (editor.prenom_personne) && editor.prenom_personne }<b className='text-[12px] text-green-400' >[ {editor.nom_profil} ]</b> </div>
                        <div className='text-[12px] text-gray-500' >{date}</div>
                    </div>
                </div>
            
            <div>
                
                {  
                    (feedOf === "organisation") && (org) && (followState === "followed") &&  
                    <button 
                        id={owner} 
                        onClick={ async(e) => { await Unfollow({ org_id : e.currentTarget.id }) }} 
                        className='rounded-sm bg-slate-950 text-white p-2 text-[14px] font-bold flex items-center gap-2' >
                            <div className='font-bold icon_btn'>&#xE0D4;</div> 
                            <div>ne plus suivre</div> 
                    </button>
                }
                
                { 
                    (feedOf === "organisation ") && (org) && (followState === "unfollowed") &&  
                    <button 
                        id={owner} 
                        onClick={ async(e) => { await Follow({ org_id : e.currentTarget.id }) }} 
                        className='rounded-sm bg-green-700 text-white p-2 text-[14px] font-bold flex items-center gap-2' > 
                        <div className='font-bold icon_btn'>&#xE5EA;</div>
                        <div>suivre</div> 
                    </button> 
                }
                
                { 
                    (feedOf === "organisation ") && (org) && (followState === "error") &&  
                    <button className='rounded-lg bg-red-800 text-white p-2 text-[14px] font-bold' > erreur </button> 
                }

            </div>
        </div>


        <div className='border-b border-b-gray-800/8 py-3' >
            
            <div className='font-bold text-lg'>{title}</div>
            
            <div className='font-light text-[14px]' >
                <ShowMoreText
                    lines={3}
                    more="voir plus"
                    less="voir moins"
                    anchorClass="!font-bold !text-[14px] text-gray-500 cursor-pointer underline-none"
                    expanded={false}>
                    {description}
                </ShowMoreText>
            </div>

            <div className='h-120 bg-slate-700/25 flex justify-around overflow-hidden rounded-lg' >
                    <img src={illustration} className='h-full w-auto' alt="image" />
            </div>
        </div>

        
        <div className='w-full flex justify-end pt-2' >
            <button
                className='px-2 py-1 bg-gray-200 text-gray-600 rounded-2xl border  border-gray-500/10 flex items-center gap-1'
                onClick={() => { setCommentSectionShown(true) } } >
                <div className='icon_btn text-lg '>&#xE168;</div>
                <div>commenter</div>
            </button>
        </div>
        { commentSectionShown && <Comments open={setCommentSectionShown} postId={postId} /> }

    </div>
  )
}

export default Feed