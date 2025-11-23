
import React from 'react'
import Feed from '../feed/Feed'

const PostTab = ({feeds}) => {
  return (
    <div className='my-2'>
        {
            feeds ?
            feeds.map(
                feed => (
                    <div key={feed.id_pub}>
                        <Feed
                            date={feed.date_pub}
                            title={feed.titre_pub}
                            description={feed.description_pub}
                            illustration={feed.photo_pub}
                            owner={ feed.id_profil_org || feed.id_profil_pers }
                            postId={feed.id_pub}
                            feedOf={(feed.id_profil_org) ? "organisation" : "person"}
                        />
                    </div>
                )
            ) : <div>No Posts</div>
        }
    </div>
  )
}

export default PostTab