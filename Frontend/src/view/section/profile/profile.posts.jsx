
import React from 'react'
import Feed from '../feed/feed.jsx'
import EmptyFeeds from '../feed/empty.feed.jsx'

const ProfilePosts = ({data, isEmpty, ownership}) => {
  return (
    <div className='md:px-2 pt-3'>
        {
                    isEmpty ?
                    <EmptyFeeds/> :
                    data.map(
                        (data,index) => (
                            <div key={index} className="mb-3" >
                                <Feed
                                    date={data.date_pub}
                                    title={data.titre_pub}
                                    description={data.description_pub}
                                    illustration={data.photo_pub}
                                    owner={ data.id_profil_org || data.id_profil_pers }
                                    postId={data.id_pub}
                                    ownership={ownership}
                                    feedOf={ (data.id_profil_org === null ) ? "person" : "organisation" }
                                />
                            </div>
                        )
                    )
                }
    </div>
  )
}

export default ProfilePosts